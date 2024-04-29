<?php

declare(strict_types=1);

namespace App\Dto\Response\Transformer\Cases;

use App\Dto\Response\Transformer\AbstractResponseDtoTransformer;
use App\Entity\Chat;
use App\Dto\Response\ChatResponseDto;

class ChatResponseDtoTransformer extends AbstractResponseDtoTransformer
{
    private MessageResponseDtoTransformer $messageDtoTransformer;
    private UserResponseDtoTransformer $userDtoTransformer;

    public function __construct(
        MessageResponseDtoTransformer $messageDtoTransformer,
        UserResponseDtoTransformer $userDtoTransformer
    )
    {
        $this->messageDtoTransformer = $messageDtoTransformer;
        $this->userDtoTransformer = $userDtoTransformer;
    }

    /**
     * @param Chat $chat
     * @return ChatResponseDto
     */
    public function transformFromObject($chat): ChatResponseDto
    {
        $dto = new ChatResponseDto;
        $dto->id = $chat->getId();
        $dto->messages = $this->messageDtoTransformer->transformFromObjects($chat->getMessages());
        $dto->users = $this->userDtoTransformer->transformFromObjects($chat->getUsers());
        $dto->type = $chat->getType();
        
        return $dto;
    }
}