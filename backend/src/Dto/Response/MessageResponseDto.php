<?php

declare(strict_types=1);

namespace App\Dto\Response;

use DateTimeImmutable;
use JMS\Serializer\Annotation as Serialization;

class MessageResponseDto
{
    #[Serialization\Type('int')]
    public int $id;

    #[Serialization\Type('string')]
    public string $message;

    #[Serialization\Type("DateTimeImmutable<'Y-m-d\TH:i:s'>")]
    public DateTimeImmutable $date;

    #[Serialization\Type('App\Reponse\Dto\UserResponseDto')]
    public UserResponseDto $user;
}