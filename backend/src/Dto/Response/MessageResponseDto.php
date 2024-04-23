<?php

declare(strict_types=1);

namespace App\Dto\Response;

use DateTime;
use JMS\Serializer\Annotation as Serialization;

class MessageResponseDto
{
    #[Serialization\Type('int')]
    public int $id;

    #[Serialization\Type('string')]
    public string $message;

    #[Serialization\Type("DateTime<'Y-m-d\TH:i:s'>")]
    public DateTime $date;

    #[Serialization\Type('App\Reponse\Dto\UserResponseDto')]
    public UserResponseDto $user;
}