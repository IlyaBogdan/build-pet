<?php

namespace App\Controller\Brokers;

use App\Services\Brokers\ChatBrokerService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ChatController extends AbstractController
{
    private ChatBrokerService $service;

    public function __construct(ChatBrokerService $chatBrokerService)
    {
        $this->service = $chatBrokerService;
    }

    #[Route('/api/broker/chat', name: 'app_broker_chat', methods: ['POST'])]
    public function createChat(Request $request): Response
    {
        $chat = $this->service->createChat($request);
        return new Response('Chat created');
    }

    #[Route('/api/broker/chat/{id}', name: 'app_broker_chat_info', methods: ['GET'])]
    public function getChatInfo(Request $request, int $id): Response
    {
        // return chat info
        $chat = $this->service->chatInfo($id);
        return new Response('Chat info');
    }

    #[Route('/api/broker/chat/{id}', name: 'app_broker_chat_save_message', methods: ['PUT'])]
    public function saveMessageToChat(Request $request, int $id): Response
    {
        // return chat info
        $chat = $this->service->saveMessage($request, $id);
        return new Response('Message saved');
    }

    #[Route('/api/broker/chat/{id}?message={messageId}', name: 'app_broker_chat_delete_message', methods: ['DELETE'])]
    public function deleteMessageFromChat(Request $request, int $id, int $messageId): Response
    {
        // return chat info
        $chat = $this->service->deleteMessage($request, $messageId);
        return new Response('Message deleted');
    }

    #[Route('/api/broker/chat/{id}?message={messageId}', name: 'app_broker_chat_update_message', methods: ['PATCH'])]
    public function updateMessageFromChat(Request $request, int $id, int $messageId): Response
    {
        // return chat info
        $chat = $this->service->updateMessage($request, $messageId);
        return new Response('Message updated');
    }
}
