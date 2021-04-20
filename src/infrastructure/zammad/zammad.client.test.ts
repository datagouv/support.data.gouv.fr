process.env.ZAMMAD_BASE_URL = "https://zammad.croute/api";
process.env.ZAMMAD_ACCESS_TOKEN = "croute";

import { axiosClient, ZammadClient } from "./zammad.client";

describe("The Zammad client", () => {
    const client = new ZammadClient();
    const firstname = "Jean";
    const lastname = "Moust";
    const email = "jean@moust.fr";
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
