import { describe, it, expect, beforeEach } from "vitest"
import id from "../src/index.js"

describe("ids", () => {
  beforeEach(() => {
    id.setAlphabet(id.DEFAULT_ALPHABET)
  })

  it("encodes as expected", () => {
    expect(id.encode(12389125)).toBe("7rYTs_")
  })

  it("decodes as expected", () => {
    expect(id.decode("7rYTs_")).toBe(12389125)
  })

  it("round-trips for various values", () => {
    const values = [0, 1, 42, 1000, 999999, 12389125, MAX_INT32 - 1]
    for (const v of values) {
      expect(id.decode(id.encode(v))).toBe(v)
    }
  })

  it("throws on numbers exceeding MAX_INT32", () => {
    expect(() => id.encode(MAX_INT32 + 1)).toThrow()
  })

  it("changing the alphabet is effective", () => {
    id.setAlphabet("GZwBHpfWybgQ5d_2mM-jh84K69tqYknx7LN3zvDrcSJVRPXsCFT")
    expect(id.encode(12389125)).toBe("phsV8T")
    expect(id.decode("phsV8T")).toBe(12389125)
  })

  it("shuffling the alphabet changes encoding but preserves round-trip", () => {
    id.randomizeAlphabet()
    const encoded1 = id.encode(12389125)
    expect(id.decode(encoded1)).toBe(12389125)

    const alphabet1 = id.getAlphabet()

    id.randomizeAlphabet()
    const alphabet2 = id.getAlphabet()
    const encoded2 = id.encode(12389125)

    expect(alphabet1).not.toBe(alphabet2)
    expect(encoded1).not.toBe(encoded2)
    expect(id.decode(encoded2)).toBe(12389125)
  })

  it("produces unique encodings for different inputs", () => {
    const encoded = new Set()
    for (let i = 0; i < 1000; i++) {
      encoded.add(id.encode(i))
    }
    expect(encoded.size).toBe(1000)
  })

  it("getAlphabet returns current alphabet", () => {
    expect(id.getAlphabet()).toBe(id.DEFAULT_ALPHABET)
    id.setAlphabet("abc")
    expect(id.getAlphabet()).toBe("abc")
  })
})

const MAX_INT32 = id.MAX_INT32
