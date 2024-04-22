<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class BrokerController extends AbstractController
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository) {
        $this->userRepository = $userRepository;
    }

    #[Route('/api/broker/user?token={token}', name: 'app_broker_user_info')]
    public function getUserBy(string $token): Response
    {
        $user = $this->userRepository->findByApiToken($token);

        return new JsonResponse(['user' => $user]);
    }
}
