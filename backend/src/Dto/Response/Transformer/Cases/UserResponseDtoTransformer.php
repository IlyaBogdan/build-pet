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
        $dto->first_name = $user->getFirstName();
        $dto->last_name = $user->getLastName();
        $dto->avatar = $user->getAvatar();
        $dto->created_at = $user->getCreatedAt();
        $dto->updated_at = $user->getUpdatedAt();
        
        return $dto;
    }
}