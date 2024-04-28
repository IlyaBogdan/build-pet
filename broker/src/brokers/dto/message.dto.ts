import { UserDto } from "./user.dto"

export type MessageDto = {
    id?: number,
    user: UserDto,
    message: String,
    created_at: Date,
    updated_at?: Date
}