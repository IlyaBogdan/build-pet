<?php

namespace App\Security;

use App\Repository\BrokerRepository;
use App\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Core\Exception\UserNotFoundException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;

class ApiTokenAuthenticator extends AbstractAuthenticator
{
    private UserRepository $userRepository;
    private BrokerRepository $brokerRepository;

    public function __construct(
        UserRepository $userRepository,
        BrokerRepository $brokerRepository
    ) {
        $this->userRepository = $userRepository;  
        $this->brokerRepository = $brokerRepository;  
    }

    public function supports(Request $request): ?bool
    {
        return $request->headers->has('X-Api-Token') || $request->headers->has('X-Broker-Token');
    }

    public function authenticate(Request $request): Passport
    {
        $apiToken = $request->headers->get('X-Api-Token');
        $brokerToken = $request->headers->get('X-Broker-Token');
        if ($apiToken)
        {
            return new SelfValidatingPassport(
                new UserBadge($apiToken, function($apiToken) {
                    $user = $this->userRepository->findByApiToken($apiToken);
                    if (!$user) throw new UserNotFoundException();
                    
                    return $user;
                })
            );
        }
        if ($brokerToken)
        {
            return new SelfValidatingPassport(
                new UserBadge($brokerToken, function($brokerToken) {
                    $broker = $this->brokerRepository->findOneBy(['access_token' => $brokerToken]);
                    if (!$broker) throw new UserNotFoundException();
                    
                    return $broker;
                })
            );
        }
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        return null;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        $data = [
            'message' => strtr($exception->getMessageKey(), $exception->getMessageData())
        ];

        return new JsonResponse($data, Response::HTTP_UNAUTHORIZED);
    }

    private function validateToken(Request $request, string $apiToken): bool
    {
        return true;
    }
}
