<?php

namespace App\Controller;

use App\Dto\Response\Transformer\Cases\UserResponseDtoTransformer;
use App\Entity\User;
use App\Repository\UserRepository;
use App\Services\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class UserController extends AbstractController
{
    private UserRepository $userRepository;
    private UserService $userService;
    private UserResponseDtoTransformer $userDtoTransformer;

    public function __construct(
        UserRepository $userRepository,
        UserService $userService,
        UserResponseDtoTransformer $userDtoTransformer
    )
    {
        $this->userRepository = $userRepository;
        $this->userService = $userService;
        $this->userDtoTransformer = $userDtoTransformer;
    }

    private function getAuthUser(Request $request): User
    {
        $headerToken = $request->headers->get('X-Api-Token');
        $user = $this->userRepository->findByApiToken($headerToken);

        return $user;
    }

    #[Route('/api/user', name: 'auth-user-profile', methods: ['GET'])]
    public function authUserProfile(Request $request): Response
    {
        $user = $this->getAuthUser($request);
        $dto = $this->userDtoTransformer->transformFromObject($user);

        return new JsonResponse($dto);
    }

    #[Route('/api/user/profile', name: 'update-user-profile', methods: ['POST'])]
    public function updateUserProfile(Request $request): Response
    {
        $user = $this->getAuthUser($request);
        $parameters = json_decode($request->getContent(), true);
        $result = $this->userService->updateProfile($user, $parameters);
        $dto = $this->userDtoTransformer->transformFromObject($result);

        return new JsonResponse($dto);
    }

    #[Route('/api/user/all', name: 'users', methods: ['GET'])]
    public function allUsers(): Response
    {
        return new Response('All users');
    }

    #[Route('/api/user/{id}', name: 'some_user_profile', methods: ['GET'])]
    public function someUserProfileById(int $id): Response
    {
        $user = $this->userRepository->findOneBy(['id' => $id]);
        $dto = $this->userDtoTransformer->transformFromObject($user);

        return new JsonResponse($dto);
    }
}
