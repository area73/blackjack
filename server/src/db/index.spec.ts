import { describe, expect, it, vi } from "vitest";

import { getConnection } from "./index";

vi.mock('lowdb/node', () => ({
  JSONPreset: vi.fn().mockImplementationOnce(() => { throw new Error('Error loading database') })
}))


describe("DB", () => {
  it("should throw an error on connection fail", async () => {
    // Act and Assert
    await expect(getConnection()).rejects.toThrowError();
  });
});
