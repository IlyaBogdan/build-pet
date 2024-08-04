import { UserDto } from "../../dto/user.dto";

export const mockUserInfo: UserDto = {
    id: 1,
    email: 'someuser@gmail.com',
    first_name: 'John',
    last_name: 'Snow',
    created_at: new Date('2024-04-03')
}