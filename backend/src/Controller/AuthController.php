<?php

namespace App\Controller;

use App\Services\AuthService;
use Exception;
use RuntimeException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends AbstractController
{
    private AuthService $authService;

    public function __construct(AuthService $authSerivce) {
        $this->authService = $authSerivce;
    }

    #[Route('/api/auth/login', methods: ['POST'])]
    public function login(Request $request)
    {
        $token = $this->authService->login($request);
        if ($token) return new JsonResponse(['authenticated' => $token->getToken()]);
        else return new JsonResponse(['errors' => ['Invalid email or password'], Response::HTTP_BAD_REQUEST]);
    }

    #[Route('/api/auth/logout', methods: ['POST'])]
    public function logout(Request $request)
    {
        $this->authService->logout($request);
        return new JsonResponse(['message' => 'success']);
    }

    #[Route('/api/auth/sign-up', methods: ['POST'])]
    public function signUp(Request $request): JsonResponse
    {
        try {
            $user = $this->authService->signUp($request);
            $token = $this->authService->authorize($request, $user);
            return new JsonResponse(['authenticated' => $token->getToken()]);
        } catch (RuntimeException $e) {
            return new JsonResponse(['errors' => json_decode($e->getMessage(), true), Response::HTTP_BAD_REQUEST]);
        }
    }
}