import long from "long"

const MAX_INT32 = 2_147_483_647
const PRIME = 1_125_812_041
const INVERSE = 348_986_105
const RANDOM = 998_048_641
const DEFAULT_ALPHABET = "23456789bcdfghjkmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ-_"

let alphabet = DEFAULT_ALPHABET

const getBase = () => alphabet.length

function shorten(id) {
  let result = ""
  const base = getBase()
  while (id > 0) {
    result = alphabet[id % base] + result
    id = Math.floor(id / base)
  }
  return result
}

function unshorten(str) {
  let result = 0
  const base = getBase()
  for (let i = 0; i < str.length; i++) {
    result = result * base + alphabet.indexOf(str[i])
  }
  return result
}

const id = {
  MAX_INT32,
  DEFAULT_ALPHABET,

  /**
   * @param {number} num - integer to encode (max 2,147,483,647)
   * @returns {string} obfuscated short string
   */
  encode(num) {
    if (num > MAX_INT32) {
      throw new Error(`Number (${num}) is too large to encode. MAX_INT32 is ${MAX_INT32}`)
    }
    const n = long.fromInt(num)
    return shorten(n.multiply(PRIME).and(long.fromInt(MAX_INT32)).xor(RANDOM).toInt())
  },

  /**
   * @param {string} str - encoded string to decode
   * @returns {number} original integer
   */
  decode(str) {
    const n = long.fromInt(unshorten(str))
    return n.xor(RANDOM).multiply(INVERSE).and(long.fromInt(MAX_INT32)).toInt()
  },

  /** @returns {string} */
  getAlphabet() {
    return alphabet
  },

  /** @param {string} newAlphabet */
  setAlphabet(newAlphabet) {
    alphabet = newAlphabet
  },

  randomizeAlphabet() {
    const array = alphabet.split("")
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    alphabet = array.join("")
  },
}

export default id
