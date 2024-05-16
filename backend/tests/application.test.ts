import request from 'supertest';
import dotenv from 'dotenv';

dotenv.config();

const baseURL = process.env.APP_URL as string;

describe("GET /applications", () => {
    const newApplication = {
        id: 1000000000,
        organization: 1,
        amount: 20000,
        fullname: "Org 1",
        status: "Waiting"
    };

    beforeAll(async () => {
        await request(baseURL).post("/applications").send(newApplication);
    });

    afterAll(async () => {
        await request(baseURL).delete(`/applications/${newApplication.id}`)
    })

    it("should return 200", async () => {
        const response = await request(baseURL).get("/applications");
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe(undefined);
    })

    it("should return applications", async () => {
        const response = await request(baseURL).get("/applications");
        console.log(response.body)
        expect(response?.body.length >= 1).toBe(true);
    })
});

describe("GET /applications/user/:id", () => {
    const newApplication = {
        id: 1000000000,
        organization: 1000,
        amount: 20000,
        fullname: "Org 1",
        status: "Waiting"
    };

    beforeAll(async () => {
        await request(baseURL).post("/applications").send(newApplication);
    });

    afterAll(async () => {
        await request(baseURL).delete(`/applications/${newApplication.id}`)
    })

    it("should return 200", async () => {
        const response = await request(baseURL).get(`/applications/user/${newApplication.organization}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe(undefined);
    })

    it("should return applications", async () => {
        const response = await request(baseURL).get(`/applications/user/${newApplication.organization}`);
        console.log(response.body)
        expect(response?.body.length >= 1).toBe(true);
    })
})

describe("POST /applications", () => {
    const newApplication = {
        id: 1000000000,
        organization: 1000,
        amount: 20000,
        fullname: "Org 1",
        status: "Waiting"
    };

    const newApplicationMissingFullname = {
        id: 1000000000,
        organization: 1000,
        amount: 20000,
        status: "Waiting"
    };

    afterAll(async () => {
        await request(baseURL).delete(`/applications/${newApplication.id}`)
    });

    it("should create a new application", async () => {
        const response = await request(baseURL).post("/applications").send(newApplication);
        expect(response.statusCode).toBe(201);
        expect(response.body.id).toBe(newApplication.id);
    });

    it("should return an error if payload is incomplete", async () => {
        const response = await request(baseURL).post("/applications").send(newApplicationMissingFullname);
        expect(response.statusCode).toBe(400);
    })
})

describe("PUT /applications/:id", () => {
    const newApplication = {
        id: 1000000000,
        organization: 1000,
        amount: 20000,
        fullname: "Org 1",
        status: "Waiting"
    };
    const modifiedApplication = {
        id: 1000000000,
        organization: 1000,
        amount: 20000,
        fullname: "Org 1",
        status: "Denied"
    };

    afterAll(async () => {
        await request(baseURL).delete(`/applications/${newApplication.id}`)
    });

    it("should update an application based on an id", async () => {
        const response = await request(baseURL).post("/applications").send(newApplication);
        const updateResponse = await request(baseURL).put(`/applications/${response.body.id}`).send(modifiedApplication);

        expect(updateResponse.statusCode).toBe(200);
        expect(updateResponse.body.status).toBe("Denied")
    });

    it("should return a 404 if the application does not exist", async () => {
        await request(baseURL).post("/applications").send(newApplication);
        const updateResponse = await request(baseURL).put(`/applications/${1000000001}`).send(modifiedApplication);

        expect(updateResponse.statusCode).toBe(404);
        expect(updateResponse.body.message).toBe("Application not found");
    })
})

describe("DELETE /applications/:id", () => {
    const newApplication = {
        id: 1000000000,
        organization: 1000,
        amount: 20000,
        fullname: "Org 1",
        status: "Waiting"
    };

    beforeAll(async () => {
        await request(baseURL).post("/applications").send(newApplication);
    })

    it("should delete an application based on an id", async () => {
        const response = await request(baseURL).delete(`/applications/${newApplication.id}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Application deleted");
    })

    it("should return a 404 if the application does not exist", async () => {
        const updateResponse = await request(baseURL).delete(`/applications/${1000000001}`);

        expect(updateResponse.statusCode).toBe(404);
        expect(updateResponse.body.message).toBe("Application not found");
    })
})