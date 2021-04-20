import axios from "axios";

export const axiosClient = axios.create({
    baseURL: process.env.ZAMMAD_BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env.ZAMMAD_ACCESS_TOKEN}`,
    },
});

export class ZammadClient {
    async createUser(
        firstname: string,
        lastname: string,
        email: string
    ): Promise<void> {
        await axiosClient.post("/users", {
            firstname,
            lastname,
            email,
            roles: ["Customer"],
        });
    }

    async createTicket(
        email: string,
        recipient: string,
        title: string,
        body: string
    ): Promise<void> {
        await axiosClient.post("/tickets", {
            title,
            group: recipient,
            customer_id: `guess:${email}`,
            article: {
                body,
                type: "web",
                from: email,
                to: recipient,
                internal: false,
            },
        });
    }
}
