<?php

namespace App\Repository;

use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class UserRepository extends ServiceEntityRepository
{
    private ApiTokenRepository $apiTokenRepository;

    public function __construct(ManagerRegistry $registry, ApiTokenRepository $apiTokenRepository)
    {
        parent::__construct($registry, User::class);
        $this->apiTokenRepository = $apiTokenRepository;
    }

    public function findByApiToken(string $apiToken): ?User
    {
        $entityManager = $this->getEntityManager();

        $query = $entityManager->createQuery(
            'SELECT user
             FROM App\Entity\User user
             JOIN App\Entity\ApiToken token
             WHERE token.token = :token'
        )->setParameter('token', $apiToken);

        $user = $query->getResult()[0];

        return $user;
    }
}
