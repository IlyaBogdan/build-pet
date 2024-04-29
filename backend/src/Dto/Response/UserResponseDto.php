<?php

declare(strict_types=1);

namespace App\Dto\Response;

use DateTimeImmutable;
use JMS\Serializer\Annotation as Serialization;

class UserResponseDto
{
    #[Serialization\Type('int')]
    public int $id;

    #[Serialization\Type('string')]
    public string $email;

    #[Serialization\Type('string')]
    public string $first_name;

    #[Serialization\Type('string')]
    public ?string $last_name;

    #[Serialization\Type('string')]
    public ?string $avatar;

    #[Serialization\Type("DateTimeImmutable<'Y-m-d\TH:i:s'>")]
    public DateTimeImmutable $created_at;

    #[Serialization\Type("DateTimeImmutable<'Y-m-d\TH:i:s'>")]
    public ?DateTimeImmutable $updated_at;
}