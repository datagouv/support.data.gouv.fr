import { ZammadClient } from "./zammad.client";
import axios from "axios";

jest.mock("axios");

describe("The Zammad client", () => {
    const client = new ZammadClient();
    const firstname = "Jean";
    const lastname = "Moust";
    const email = "jean@moust.fr";

    it("exists", () => {
        expect(client).toBeDefined();
    });

    it("uses axios under the hood", async () => {
        await client.createUser(firstname, lastname, email);
        expect(axios.post).toBeCalledWith("/users", {
            firstname,
            lastname,
            email,
            roles: ["Customer"],
        });
    });
});
