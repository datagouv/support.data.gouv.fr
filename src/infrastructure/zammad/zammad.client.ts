import axios from "axios";

export class ZammadClient {
    async createUser(
        firstname: string,
        lastname: string,
        email: string
    ): Promise<void> {
        await axios.request({
            method: "post",
            url: "/users",
            data: {
                firstname,
                lastname,
                email,
                roles: ["Customer"],
            },
        });
    }
}
