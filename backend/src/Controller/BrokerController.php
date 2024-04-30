<?php

namespace App\Controller;

use App\Dto\Response\Transformer\Cases\UserResponseDtoTransformer;
use App\Repository\UserRepository;
use App\Services\BrokerService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class BrokerController extends AbstractController
{
    private UserRepository $userRepository;
    private UserResponseDtoTransformer $userDtoTransformer;
    private BrokerService $brokerService;

    public function __construct(
        UserRepository $userRepository,
        UserResponseDtoTransformer $userDtoTransformer,
        BrokerService $brokerService
    ) {
        $this->userRepository = $userRepository;
        $this->userDtoTransformer = $userDtoTransformer;
        $this->brokerService = $brokerService;
    }

    #[Route('/api/broker', name: 'app_broker_replication', methods: ['POST'])]
    public function brokerReplication(Request $request): JsonResponse
    {
        $broker = $this->brokerService->replicate($request);

        return new JsonResponse(['access_token' => $broker->getAccessToken()]);
    }

    #[Route('/api/broker/user', name: 'app_broker_user_info', methods: ['GET'])]
    public function getUserBy(Request $request): Response
    {
        $token = $request->query->get('token');
        $user = $this->userRepository->findByApiToken($token);
        $dto = $this->userDtoTransformer->transformFromObject($user);

        return new JsonResponse($dto);
    }

    #[Route('/api/broker/user/list', name: 'app_broker_user_list', methods: ['GET'])]
    public function getUsers(): Response
    {
        $users = $this->userRepository->findAll();
        $dto = $this->userDtoTransformer->transformFromObjects($users);

        return new JsonResponse($dto);
    }
}
