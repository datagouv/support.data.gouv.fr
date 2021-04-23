import axios from "axios";

export const axiosClient = axios.create({
    baseURL: process.env.ZAMMAD_BASE_URL,
    headers: {
        Authorization: `Bearer ${process.env.ZAMMAD_ACCESS_TOKEN}`,
    },
});

export class ZammadClient {
    async createTicket(
        email: string,
        recipient: string,
        subject: string,
        body: string
    ): Promise<void> {
        try {
            await axiosClient.post("/users", {
                email,
                roles: ["Customer"],
            });
        } catch (error) {
            // no-op
        }
        await axiosClient.post(
            "/tickets",
            {
                title: subject,
                group: recipient,
                customer_id: `guess:${email}`,
                article: {
                    body,
                    from: email,
                    to: recipient,
                    type: "web",
                    internal: false,
                },
            },
            {
                headers: {
                    "X-On-Behalf-Of": email,
                },
            }
        );
    }
}
