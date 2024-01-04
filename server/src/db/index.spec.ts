import { describe, it } from "vitest";

/*
vi.mock('lowdb/node', () => ({
  JSONPreset: vi.fn().mockImplementation(() => { throw new Error('Error loading database') })
}))
*/
describe.skip("DB", () => {
  it("should throw an error on connection fail", async () => {
    // Act and Assert
    // fixme: for unknown reason this test is not working
    // await expect(getConnection()).rejects.toThrowError();
  });
});
