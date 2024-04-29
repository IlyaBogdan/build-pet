<?php

namespace App\Services;

use App\Entity\ApiToken;
use App\Entity\User;
use App\Repository\ApiTokenRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\Persistence\ManagerRegistry;
use RuntimeException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\KernelInterface;

use function Symfony\Component\Clock\now;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class UserService
{
    private EntityManager $entityManager;
    private UserRepository $userRepository;
    private ApiTokenRepository $apiTokenRepository;
    private ValidatorInterface $validator;
    private KernelInterface $kernel;

    public function __construct(
        ManagerRegistry $doctrine,
        UserRepository $userRepository,
        ApiTokenRepository $apiTokenRepository,
        ValidatorInterface $validator,
        KernelInterface $kernel
    )
    {
        $this->entityManager = $doctrine->getManager();
        $this->userRepository = $userRepository;
        $this->apiTokenRepository = $apiTokenRepository;
        $this->validator = $validator;
        $this->kernel = $kernel;
    }
    
    public function updateProfile(User $user, array $data): User
    {
        if (isset($data['first_name'])) $user->setFirstName($data['first_name']);
        if (isset($data['last_name'])) $user->setLastName($data['last_name']);
        if (isset($data['email'])) $user->setEmail($data['email']);
        if (isset($data['avatar'])) {
            $path = $this->saveImage($data['avatar'], '/profile/' . $user->getId(), "avatar");
            $user->setAvatar($path);
        }

        $this->entityManager->persist($user);
        $this->entityManager->flush();
        return $user;
    }

    private function saveImage(string $data, string $path, string $filename): string
    {
        list($type, $data) = explode(';', $data);
        list(, $data)      = explode(',', $data);
        $data = base64_decode($data);
        $type = explode('/', $type)[1];

        $root = $this->kernel->getProjectDir();
        $absolutePath = "{$root}/public/uploads{$path}";

        if (!file_exists($absolutePath)) mkdir($absolutePath, 0777, true);
        if ($files = glob("$absolutePath/{$filename}.*")) unlink($files[0]); 
        file_put_contents($absolutePath . "/{$filename}.$type", $data);

        return "/uploads{$path}/{$filename}.$type";
    }
}