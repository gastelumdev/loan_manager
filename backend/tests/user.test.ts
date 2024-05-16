import request from 'supertest';
import dotenv from 'dotenv';

dotenv.config();

const baseURL = process.env.APP_URL as string;

describe("GET /users", () => {
    const newUser = {
        id: 1000000,
        fullname: "Organization 1"
    };

    beforeAll(async () => {
        await request(baseURL).post("/users").send(newUser);
    })

    afterAll(async () => {
        await request(baseURL).delete(`/users/${newUser.id}`)
    });

    it("should return 200", async () => {
        const response = await request(baseURL).get("/users");
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe(undefined);
    })

    it("should return users", async () => {
        const response = await request(baseURL).get("/users");
        expect(response?.body.length >= 1).toBe(true);
    })
})

describe("GET /users/:id", () => {
    const newUser = {
        id: 1000000,
        fullname: "Organization 1"
    };

    beforeAll(async () => {
        await request(baseURL).post("/users").send(newUser);
    });

    afterAll(async () => {
        await request(baseURL).delete(`/users/${newUser.id}`)
    })

    it("should return 200", async () => {
        const response = await request(baseURL).get(`/users/${newUser.id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe(undefined);
    })

    it("should return user", async () => {
        const response = await request(baseURL).get(`/users/${newUser.id}`);
        expect(response?.body.id).toBe(newUser.id);
    })
})

describe("POST /users", () => {
    const newUser = {
        id: 1000000,
        fullname: "Organization 1"
    };

    const newUserMissingFullname = {
        id: 1000000
    };

    afterAll(async () => {
        await request(baseURL).delete(`/users/${newUser.id}`)
    });

    it("should create a new user", async () => {
        const response = await request(baseURL).post("/users").send(newUser);
        expect(response.statusCode).toBe(201);
        expect(response.body.id).toBe(newUser.id);
    });

    it("should return an error if payload is incomplete", async () => {
        const response = await request(baseURL).post("/users").send(newUserMissingFullname);
        expect(response.statusCode).toBe(400);
    })
})

describe("PUT /users/:id", () => {
    const newUser = {
        id: 1000000,
        fullname: "Organization 1"
    };
    const modifiedUser = {
        id: 1000000,
        fullname: "Organization 2"
    };

    afterAll(async () => {
        await request(baseURL).delete(`/users/${newUser.id}`)
    });

    it("should update an user based on an id", async () => {
        const response = await request(baseURL).post("/users").send(newUser);
        const updateResponse = await request(baseURL).put(`/users/${response.body.id}`).send(modifiedUser);

        expect(updateResponse.statusCode).toBe(200);
        expect(updateResponse.body.fullname).toBe("Organization 2")
    });

    it("should return a 404 if the user does not exist", async () => {
        await request(baseURL).post("/users").send(newUser);
        const updateResponse = await request(baseURL).put(`/users/${1000000001}`).send(modifiedUser);

        expect(updateResponse.statusCode).toBe(404);
        expect(updateResponse.body.message).toBe("User not found");
    })
})

describe("DELETE /users/:id", () => {
    const newUser = {
        id: 1000000,
        fullname: "Organization 1"
    };

    beforeAll(async () => {
        await request(baseURL).post("/users").send(newUser);
    })

    it("should delete a user based on an id", async () => {
        const response = await request(baseURL).delete(`/users/${newUser.id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("User deleted");
    })

    it("should return a 404 if the user does not exist", async () => {
        const updateResponse = await request(baseURL).delete(`/users/${1000000001}`);

        expect(updateResponse.statusCode).toBe(404);
        expect(updateResponse.body.message).toBe("User not found");
    })
})