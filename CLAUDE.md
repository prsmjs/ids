# @prsm/ids

short, obfuscated, reversible integer-to-string encoding. uses modular arithmetic with a prime/inverse pair to scatter sequential IDs across the output space, then base-N encodes with a configurable alphabet.

## structure

```
src/index.js    - single file, default export
tests/          - vitest
```

## dev

```
make test       # run tests
make types      # generate .d.ts from JSDoc
```

## key details

- max encodable value: 2,147,483,647 (MAX_INT32)
- uses `long` npm package for 64-bit intermediate arithmetic
- alphabet is module-level state (not per-instance)
- changing alphabet changes all encodings - decode must use same alphabet as encode
