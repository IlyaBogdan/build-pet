<?php

declare(strict_types=1);

namespace App\Dto\Response\Transformer\Cases;

use App\Dto\Response\Transformer\AbstractResponseDtoTransformer;
use App\Entity\Message;
use App\Dto\Response\MessageResponseDto;

class MessageResponseDtoTransformer extends AbstractResponseDtoTransformer
{
    private UserResponseDtoTransformer $userDtoTransformer;

    public function __construct(UserResponseDtoTransformer $userDtoTransformer)
    {
        $this->userDtoTransformer = $userDtoTransformer;
    }

    /**
     * @param Message $message
     * @return MessageResponseDto
     */
    public function transformFromObject($message): MessageResponseDto
    {
        $dto = new MessageResponseDto;
        $dto->id = $message->getId();
        $dto->message = $message->getMessage();
        $dto->date = $message->getCreatedAt();
        $dto->user = $this->userDtoTransformer->transformFromObject($message->getUser());
        
        return $dto;
    }
}