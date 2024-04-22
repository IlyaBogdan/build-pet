import { User } from "../../entities/User"

export type MessageDto = {
    id?: number,
    user: User,
    message: string,
    created_at: Date,
    updated_at?: Date
}