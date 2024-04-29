<?php

namespace App\Services\Brokers;

use App\Entity\Chat;
use App\Entity\Message;
use App\Entity\User;
use App\Repository\ChatRepository;
use App\Repository\MessageRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\Persistence\ManagerRegistry;
use RuntimeException;
use Symfony\Component\HttpFoundation\Request;
use function Symfony\Component\Clock\now;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ChatBrokerService
{
    private UserRepository $userRepository;
    private EntityManager $entityManager;
    private ValidatorInterface $validator;
    private ChatRepository $chatRepository;
    private MessageRepository $messageRepository;

    public function __construct(
        UserRepository $userRepository,
        ValidatorInterface $validator,
        ManagerRegistry $doctrine,
        ChatRepository $chatRepository,
        MessageRepository $messageRepository
    )
    {
        $this->userRepository = $userRepository;
        $this->entityManager = $doctrine->getManager();
        $this->validator = $validator;
        $this->chatRepository = $chatRepository;
        $this->messageRepository = $messageRepository;
    }

    public function createChat(Request $request)
    {
        $parameters = json_decode($request->getContent(), true);

        $type = $parameters['type'];

        $chat = new Chat();
        $chat->setType($type);
        $chat->setCreatedAt(now());
        $chat->setUpdatedAt(now());

        $this->entityManager->persist($chat);
        $this->entityManager->flush();

        foreach ($parameters['users'] as $userId) {
            $user = $this->userRepository->findOneBy(['id' => $userId]);
            $chat->addUser($user);
        }
        
        $errors = $this->validator->validate($chat);
        if (count($errors)) {
            $errorsData = [];
            foreach($errors as $error) array_push($errorsData, ucfirst($error->getPropertyPath()) . ": {$error->getMessage()}"); 
            throw new RuntimeException(json_encode($errorsData));
        }

        $this->entityManager->flush();
        return $chat;
    }

    public function saveMessage(Request $request, int $chatId)
    {
        $parameters = json_decode($request->getContent(), true);

        $chat = $this->chatRepository->findOneBy(['id' => $chatId]);

        $message = new Message();
        $message->setMessage($parameters['content']);
        $user = $this->userRepository->findOneBy(['id' => $parameters['author']['id']]);
        $message->setUser($user);
        $message->setCreatedAt(now());
        $message->setUpdatedAt(now());
        $message->setChat($chat);
        
        $errors = $this->validator->validate($message);
        if (count($errors)) {
            $errorsData = [];
            foreach($errors as $error) array_push($errorsData, ucfirst($error->getPropertyPath()) . ": {$error->getMessage()}"); 
            throw new RuntimeException(json_encode($errorsData));
        }

        $this->entityManager->persist($message);
        $this->entityManager->flush();

        return $chat;
    }

    public function updateMessage(Request $request, int $messageId)
    {
        $parameters = json_decode($request->getContent(), true);
        $message = $this->messageRepository->findOneBy(['id' => $messageId]);
        $messageData = $parameters['message'];
        $message->setMessage($messageData['message']);
        $message->setUpdatedAt(now());
        $errors = $this->validator->validate($message);
        if (count($errors)) {
            $errorsData = [];
            foreach($errors as $error) array_push($errorsData, ucfirst($error->getPropertyPath()) . ": {$error->getMessage()}"); 
            throw new RuntimeException(json_encode($errorsData));
        }

        $this->entityManager->flush();
        return $message->getChat();
    }

    public function deleteMessage(Request $request, int $messageId)
    {

        $message = $this->messageRepository->findOneBy(['id' => $messageId]);
        $chat = $message->getChat();

        $this->entityManager->remove($message);
        $this->entityManager->flush();

        return $chat;
    }
}