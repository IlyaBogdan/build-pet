import { UserDto } from "../brokers/dto/user.dto";

export class User {

    public id: number;
    public first_name: String;
    public last_name: String;
    public email: String;
    public created_at: Date;

    public active: Boolean = false;

    constructor(userInfo: UserDto) {
        this.id = userInfo.id;
        this.first_name = userInfo.first_name;
        this.last_name = userInfo.last_name;
        this.email = userInfo.email;
        this.created_at = userInfo.created_at;
    }
}