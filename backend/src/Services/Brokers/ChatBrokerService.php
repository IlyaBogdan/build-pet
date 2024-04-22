<?php

namespace App\Services\Brokers;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\Persistence\ManagerRegistry;
use RuntimeException;
use Symfony\Component\HttpFoundation\Request;
use function Symfony\Component\Clock\now;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ChatBrokerService
{
    public function __construct()
    {

    }

    public function createChat(Request $request)
    {

    }

    public function chatInfo(int $id)
    {

    }

    public function saveMessage(Request $request, int $chatId)
    {

    }

    public function updateMessage(Request $request, int $messageId)
    {

    }

    public function deleteMessage(Request $request, int $messageId)
    {

    }
}