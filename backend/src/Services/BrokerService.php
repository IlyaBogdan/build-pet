<?php

namespace App\Services;

use App\Entity\Broker;
use App\Repository\BrokerRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\Persistence\ManagerRegistry;
use RuntimeException;
use Symfony\Component\HttpFoundation\Request;
use function Symfony\Component\Clock\now;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class BrokerService
{
    private EntityManager $entityManager;
    private BrokerRepository $brokerRepository;
    private ValidatorInterface $validator;

    public function __construct(
        ManagerRegistry $doctrine,
        BrokerRepository $brokerRepository,
        ValidatorInterface $validator
    )
    {
        $this->entityManager = $doctrine->getManager();
        $this->brokerRepository = $brokerRepository;
        $this->validator = $validator;
    }

    public function replicate(Request $request): Broker
    {
        $token = $this->generateToken($request);
        $broker = $this->brokerRepository->findOneBy(['access_token' => $token]);
        if (!$broker)
        {
            $broker = new Broker();
            $broker->setAccessToken($token);
            $broker->setType(Broker::TYPE_CHAT);
            $this->entityManager->persist($broker);
            $this->entityManager->flush();
        }

        return $broker;
    }

    public function generateToken(Request $request): string
    {
        $salt = 'random_string123';
        $origin = $request->headers->get('Origin');

        return md5("{$salt}:{$origin}");
    }

    public function validateToken(Request $request, string $target, string $expected): bool
    {
        return true;
    }
}