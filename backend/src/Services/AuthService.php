<?php

namespace App\Services;

use App\Entity\ApiToken;
use App\Entity\User;
use App\Repository\ApiTokenRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;

use function Symfony\Component\Clock\now;

class AuthService
{
    private EntityManager $entityManager;
    private UserRepository $userRepository;
    private ApiTokenRepository $apiTokenRepository;

    public function __construct(ManagerRegistry $doctrine, UserRepository $userRepository, ApiTokenRepository $apiTokenRepository)
    {
        $this->entityManager = $doctrine->getManager();
        $this->userRepository = $userRepository;
        $this->apiTokenRepository = $apiTokenRepository;
    }

    public function login(Request $request): ?ApiToken
    {
        $parameters = json_decode($request->getContent(), true);

        dd($parameters);
        $email = $parameters['email'];
        $password = $this->hashPassword($parameters['password']);
        $user = $this->userRepository->findOneBy(['email' => $email, 'password' => $password]);
        if (!$user) return null;
        
        return $this->authorize($request, $user);
    }

    public function authorize(Request $request, User $user): ApiToken
    {
        $apiToken = new ApiToken();
        $apiToken->setUser($user);
        $apiToken->setToken($this->generateToken($request, $user));
        $this->entityManager->persist($apiToken);
        $this->entityManager->flush();
        return $apiToken;
    }

    public function signUp(Request $request): User
    {
        $parameters = json_decode($request->getContent(), true);

        $email = $parameters['email'];
        $password = $parameters['password'];
        $firstName = $parameters['first_name'];
        $lastName = $parameters['last_name'];

        $user = new User();
        $user->setEmail($email);
        $user->setPassword($this->hashPassword($password));
        $user->setCreatedAt(now());
        $user->setFirstName($firstName);
        $user->setLastName($lastName);

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return $user;
    }

    public function logout(Request $request): void
    {
        $token = $request->headers->get('X-Api-Token');
        $apiToken = $this->apiTokenRepository->findOneBy(['token' => $token]);
        $this->entityManager->remove($apiToken);
        $this->entityManager->flush();
    }

    public function generateToken(Request $request, User $user): string
    {
        $salt = 'random_string123';
        $origin = $request->headers->get('Origin');
        $email = $user->getEmail();

        return md5("{$salt}:{$origin}:{$email}");
    }

    public function validateToken(Request $request, string $target, string $expected): bool
    {
        return true;
    }

    private function hashPassword(string $rawPassword): string
    {
        return hash('md5', $rawPassword);
    }
}