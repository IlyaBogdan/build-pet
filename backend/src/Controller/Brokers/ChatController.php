<?php

namespace App\Controller\Brokers;

use App\Dto\Response\Transformer\Cases\ChatResponseDtoTransformer;
use App\Repository\ChatRepository;
use App\Services\Brokers\ChatBrokerService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ChatController extends AbstractController
{
    private ChatBrokerService $service;
    private ChatRepository $chatRepository;
    private ChatResponseDtoTransformer $chatDtoTransformer;

    public function __construct(
        ChatBrokerService $chatBrokerService,
        ChatRepository $chatRepository,
        ChatResponseDtoTransformer $chatDtoTransformer
    )
    {
        $this->service = $chatBrokerService;
        $this->chatRepository = $chatRepository;
        $this->chatDtoTransformer = $chatDtoTransformer;
    }

    #[Route('/api/broker/chat', name: 'app_broker_chat', methods: ['POST'])]
    public function createChat(Request $request): Response
    {
        $parameters = json_decode($request->getContent(), true);
        if (!$chat = $this->chatRepository->findByUsers($parameters['users']))
            $chat = $this->service->createChat($request);
        $dto = $this->chatDtoTransformer->transformFromObject($chat);
        return new JsonResponse($dto);
    }

    #[Route('/api/broker/chat/list', name: 'app_broker_chat_list', methods: ['GET'])]
    public function chatList(Request $request): Response
    {
        $userId = $request->query->get('user');
        if ($userId) $chats = $this->chatRepository->findByUserId($userId);
        else $chats = $this->chatRepository->findAll();

        $dto = $this->chatDtoTransformer->transformFromObjects($chats);
        return new JsonResponse($dto);
    }

    #[Route('/api/broker/chat/{id}', name: 'app_broker_chat_info', methods: ['GET'])]
    public function getChatInfo(Request $request, int $id): Response
    {
        $chat = $this->chatRepository->findOneBy(['id' => $id]);
        $dto = $this->chatDtoTransformer->transformFromObject($chat);
        return new JsonResponse($dto);
    }

    #[Route('/api/broker/chat/{id}/save-message', name: 'app_broker_chat_save_message', methods: ['PUT'])]
    public function saveMessageToChat(Request $request, int $id): Response
    {
        $chat = $this->service->saveMessage($request, $id);
        $dto = $this->chatDtoTransformer->transformFromObject($chat);
        return new JsonResponse($dto);
    }

    #[Route('/api/broker/chat/{id}?message={messageId}', name: 'app_broker_chat_delete_message', methods: ['DELETE'])]
    public function deleteMessageFromChat(Request $request, int $id, int $messageId): Response
    {
        $chat = $this->service->deleteMessage($request, $messageId);
        $dto = $this->chatDtoTransformer->transformFromObject($chat);
        return new JsonResponse($dto);
    }

    #[Route('/api/broker/chat/{id}?message={messageId}', name: 'app_broker_chat_update_message', methods: ['PATCH'])]
    public function updateMessageFromChat(Request $request, int $id, int $messageId): Response
    {
        $chat = $this->service->updateMessage($request, $messageId);
        $dto = $this->chatDtoTransformer->transformFromObject($chat);
        return new JsonResponse($dto);
    }
}
