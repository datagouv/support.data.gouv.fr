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
            headers: {
                Authorization: `Bearer ${process.env.ZAMMAD_ACCESS_TOKEN}`,
            },
            data: {
                firstname,
                lastname,
                email,
                roles: ["Customer"],
            },
        });
    }
}
