<?php
// src/Controller/DefaultController.php
namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;

class AuthController
{
    #[Route('/api/auth/login', methods: ['POST'])]
    public function login()
    {
        return new Response("Hello");
    }

    #[Route('/api/auth/logout', methods: ['POST'])]
    public function logout()
    {
        return new Response("Hello");
    }

    #[Route('/api/auth/sign-up', methods: ['POST'])]
    public function signUp()
    {
        
        return new JsonResponse(["Hello"]);
    }
}