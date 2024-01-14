import request from "supertest";
import app from "../server.js";

describe("GET /api/status", () => {
  it('should respond with status "Ok"', async () => {
    const response = await request(app).get("/api/status");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "Ok" });
  });
});
