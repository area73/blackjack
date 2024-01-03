import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";

import { getConnection } from "./index";

vi.mock('./index')

describe("DB", () => {

  beforeEach(() => {

  })
  it("should response with a success connection", async () => {
    (getConnection as Mock).mockImplementation(async () => {
      return await Promise.resolve('db')
    });
    const conn = await getConnection()
    expect(conn).toBeDefined();
  });
  it("should throw an error on connection fail", async () => {
    (getConnection as Mock).mockImplementation(async () => {
      return await Promise.reject(new Error('Connection failed'))
    });
    // Act and Assert
    await expect(getConnection()).rejects.toThrow('Connection failed');
  });

});
