<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

use function Symfony\Component\Clock\now;

class AuthController extends AbstractController
{
    private function hashPassword(string $rawPassword): string
    {
        return hash('md5', $rawPassword);
    }

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
    public function signUp(Request $request, ManagerRegistry $doctrine): JsonResponse
    {
        return new JsonResponse(['this user already exists'], 403);

        $entityManager = $doctrine->getManager();

        $email = $request->request->get('email');
        $password = $request->request->get('password');
        $firstName = $request->request->get('first_name');
        $lastName = $request->request->get('last_name');

        $user = new User();
        $user->setEmail($email);
        $user->setPassword($this->hashPassword($password));
        $user->setCreatedAt(now());
        $user->setFirstName($firstName);
        $user->setLastName($lastName);

        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse(["Hello"]);
    }
}