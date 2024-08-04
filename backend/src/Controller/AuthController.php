<?php

namespace App\Controller;

use RuntimeException;
use App\Services\AuthService;
use OpenApi\Attributes as OA;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class AuthController extends AbstractController
{
    private AuthService $authService;

    public function __construct(AuthService $authSerivce) {
        $this->authService = $authSerivce;
    }

    #[OA\Post(
        tags: ['Auth'],
        description: 'Authorization on chat. Return JWT token',
        path: '/api/auth/login',
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['email', 'password'],
                properties: [
                    new OA\Property(
                        property: 'email',
                        type: 'string',
                        example: 'user123@gmail.com'
                    ),
                    new OA\Property(
                        property: 'password',
                        type: 'string',
                        example: 'myPass75830'
                    )
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: 'OK'),
            new OA\Response(response: 401, description: 'Unauthorized'),
        ]
    )]
    #[Route('/api/auth/login', methods: ['POST'])]
    public function login(Request $request)
    {
        $token = $this->authService->login($request);
        if ($token) return new JsonResponse(['authenticated' => $token->getToken()]);
        else return new JsonResponse(['errors' => ['Invalid email or password'], Response::HTTP_BAD_REQUEST]);
    }

    #[OA\Post(
        tags: ['Auth'],
        description: 'Logout from chat',
        path: '/api/auth/logout',
        responses: [
            new OA\Response(response: 200, description: 'OK'),
            new OA\Response(response: 401, description: 'Unauthorized'),
        ]
    )]
    #[Route('/api/auth/logout', methods: ['POST'])]
    public function logout(Request $request)
    {
        $this->authService->logout($request);
        return new JsonResponse(['message' => 'success']);
    }

    #[OA\Post(
        tags: ['Auth'],
        description: 'Registration',
        path: '/api/auth/sign-up',
        requestBody: new OA\RequestBody(
            required: true,
            content: new OA\JsonContent(
                required: ['email', 'password'],
                properties: [
                    new OA\Property(
                        property: 'email',
                        type: 'string',
                        example: 'user123@gmail.com'
                    ),
                    new OA\Property(
                        property: 'password',
                        type: 'string',
                        example: 'myPass75830'
                    ),
                    new OA\Property(
                        property: 'first_name',
                        type: 'string',
                        example: 'John'
                    ),
                    new OA\Property(
                        property: 'last_name',
                        type: 'string',
                        example: 'Snow'
                    )
                ]
            )
        ),
        responses: [
            new OA\Response(response: 200, description: 'OK'),
            new OA\Response(response: 401, description: 'Unauthorized'),
        ]
    )]
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