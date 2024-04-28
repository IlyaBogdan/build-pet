<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class UserController extends AbstractController
{
    #[Route('/api/user', name: 'auth-user-profile', methods: ['GET'])]
    public function authUserProfile(): Response
    {
        return new Response('Auth user profile');
    }

    #[Route('/api/user', name: 'auth-user-profile', methods: ['POST'])]
    public function updateUserProfile(): Response
    {
        return new Response('Auth user profile');
    }

    #[Route('/api/user/all', name: 'users', methods: ['GET'])]
    public function allUsers(): Response
    {
        return new Response('All users');
    }
}
