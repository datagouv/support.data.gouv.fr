process.env.ZAMMAD_BASE_URL = "https://zammad.croute/api";
process.env.ZAMMAD_ACCESS_TOKEN = "croute";

import { axiosClient, ZammadClient } from "./zammad.client";

describe("The Zammad client", () => {
    const client = new ZammadClient();
    const firstname = "Jean";
    const lastname = "Moust";
    const email = "jean@moust.fr";
    const recipient = "aled@led.fr";
    const subject = "aled";
    const body = "J'ai grandement besoin d'aide";

    axiosClient.post = jest.fn();

    it("uses an axios instance", () => {
        expect(axiosClient).toBeDefined();
        expect(axiosClient.defaults).toMatchObject({
            baseURL: "https://zammad.croute/api",
            headers: {
                Authorization: "Bearer croute",
            },
        });
    });

    it("exists", () => {
        expect(client).toBeDefined();
    });

    describe("when createUser is called", () => {
        it("uses axios under the hood", async () => {
            await client.createUser(firstname, lastname, email);
            expect(axiosClient.post).toBeCalledWith("/users", {
                firstname,
                lastname,
                email,
                roles: ["Customer"],
            });
        });
    });

    describe("when createTicket is called", () => {
        it("posts to the tickets endpoint", async () => {
            await client.createTicket(email, recipient, subject, body);
            expect(axiosClient.post).toBeCalledWith(
                "/tickets",
                {
                    title: subject,
                    group: recipient,
                    customer_id: `guess:${email}`,
                    article: {
                        body,
                        type: "web",
                        from: email,
                        to: recipient,
                        internal: false,
                    },
                },
                {
                    headers: {
                        "X-On-Behalf-Of": email,
                    },
                }
            );
        });
    });
});
