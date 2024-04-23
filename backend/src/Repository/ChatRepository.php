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

    /**
    * @return Chat[] Returns an array of Chat objects
    */
    public function findByUserId(int $userId): array
    {
        // return $this->createQueryBuilder('c')
        //     ->andWhere('c.exampleField = :val')
        //     ->setParameter('val', $value)
        //     ->orderBy('c.id', 'ASC')
        //     ->getQuery()
        //     ->getResult();

        return $this->findAll();            
    }
}
