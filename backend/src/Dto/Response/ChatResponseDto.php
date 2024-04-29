<?php

declare(strict_types=1);

namespace App\Dto\Response;

use JMS\Serializer\Annotation as Serialization;

class ChatResponseDto
{
    #[Serialization\Type('int')]
    public int $id;

    #[Serialization\Type('Array<App\Reponse\Dto\UserResponseDto>')]
    public array $users;

    #[Serialization\Type('Array<App\Reponse\Dto\MessageResponseDto>')]
    public array $messages;

    #[Serialization\Type('int')]
    public int $type;
}