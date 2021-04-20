import axios from "axios";

export class ZammadClient {
    async createUser(
        firstname: string,
        lastname: string,
        email: string
    ): Promise<void> {
        await axios.post("/users", {
            firstname,
            lastname,
            email,
            roles: ["Customer"],
        });
    }
}
