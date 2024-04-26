<?php

namespace App\Repository;

use App\Entity\Chat;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;


class ChatRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Chat::class);
    }

    public function findByUsers(array $userIds): ?Chat
    {
        $entityManager = $this->getEntityManager();

        $ids = implode(', ', $userIds);
        $count = count($userIds);
        $query = $entityManager->createQuery(
            'SELECT chat
             FROM App\Entity\Chat chat
             JOIN chat.users u
             WHERE u.id IN (' . $ids . ')
             GROUP BY chat.id
             HAVING COUNT(DISTINCT u.id) = :count
            '
        )->setParameter('count', $count);

        return count($query->getResult()) ? $query->getResult()[0] : null;
    }

    public function findByUserId(int $userId)
    {
        $entityManager = $this->getEntityManager();

        $query = $entityManager->createQuery(
            'SELECT chat
             FROM App\Entity\Chat chat
             JOIN chat.users u
             WHERE u.id = :userId
             GROUP BY chat.id
            '
        )->setParameter('userId', $userId);

        return $query->getResult();
    }
}
