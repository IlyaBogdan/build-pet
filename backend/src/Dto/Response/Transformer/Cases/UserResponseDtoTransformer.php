<?php

declare(strict_types=1);

namespace App\Dto\Response\Transformer\Cases;

use App\Dto\Response\Transformer\AbstractResponseDtoTransformer;
use App\Entity\User;
use App\Dto\Response\UserResponseDto;

class UserResponseDtoTransformer extends AbstractResponseDtoTransformer
{
    /**
     * @param User $user
     * @return UserResponseDto
     */
    public function transformFromObject($user): UserResponseDto
    {
        $dto = new UserResponseDto;
        $dto->id = $user->getId();
        $dto->email = $user->getEmail();
        
        return $dto;
    }
}