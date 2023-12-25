import { describe, expect, it } from "vitest";
import { generateToken } from "./token";

describe("generateToken", () => {
  it("should return unique random hash", () => {
    const hashedGroup = new Map();
    const sample = 100;
    // generating a sample of 100 hashes to demonstrate the uniqueness
    for (let i = 0; i < sample; i++) {
      hashedGroup.set(generateToken(), true);
    }

    expect(hashedGroup.size).toBe(sample);
  });
});
