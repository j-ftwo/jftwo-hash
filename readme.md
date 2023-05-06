# JFtwoHash

Provides encryption and decryption functionality using the AES-256-CBC algorithm. Additionally, the package provides a `createUniqueHash` function that generates a random hash using UUID v4 and SHA-256

## Installation

Install using npm:

```bash
npm install jftwo-hash
```

## Usage

To use `JFtwoHash`, you'll need to create a new instance of the class with a key and an initialization vector. Here's an example:

```js
const { JFtwoHash } = require('jftwo-hash');

const key = '12345678901234567890123456789012'; // Must be 32 bytes (256 bits)
const iv = '1234567890123456'; // Must be 16 bytes (128 bits)

const jftwoHash = new JFtwoHash(key, iv);

const data = { foo: 'bar' };
const encryptedData = jftwoHash.encrypt(data);
const decryptedData = jftwoHash.decrypt(encryptedData);

console.log(data); // { foo: 'bar' }
console.log(encryptedData); // '1T6PdC8cJWpe1BbkN2kMAg=='
console.log(decryptedData); // { foo: 'bar' }
```

To generate example input values for the constructor, you can use the `generateExampleConstructorInputs` method:

```js
const { JFtwoHash } = require('jftwo-hash');

const { key, iv } = JFtwoHash.generateExampleConstructorInputs();

console.log(key); // e23ce1590c0f07b2e2b6166a11b580d5
console.log(iv); // 2d6b5a6d482a6a5c
```

To generate a random hash using UUID v4 and SHA-256, you can use the `createUniqueHash` function:

```js
const { createUniqueHash } = require('jftwo-hash');

const hash = createUniqueHash(16);

console.log(hash); // a2c03c7e62f6f207
```

## API

### `JFtwoHash(key: Buffer | string, iv: Buffer | string)`

Creates a new `JFtwoHash` instance.

- `key`: The encryption key to use. Can be a string or a buffer.
- `iv`: The initialization vector to use. Can be a string or a buffer.

### `JFtwoHash.generateExampleConstructorInputs(): { key: string, iv: string }`

Generates example input values for the `JFtwoHash` constructor.

### `jftwoHash.encrypt(data: any): string`

Encrypts the given data using AES-256-CBC.

- `data`: The data to encrypt. Can be any JSON-serializable value.

### `jftwoHash.decrypt(encryptedData: string): any`

Decrypts the given data using AES-256-CBC.

- `encryptedData`: The encrypted data to decrypt.

### `createUniqueHash(length: number = 32): string`

Generates a random hash using UUID v4.

- `length` (optional): The length of the hash to generate. Defaults to 32.

## Compatibility

The `JFtwoHash` class uses the `crypto-js` library to provide encryption and decryption functionalities using the AES-256-CBC algorithm. This library is compatible with modern browsers such as Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, as well as in Node.js server environments.

## Compatibility Notes

- The `crypto-js` library is compatible with modern browsers and Node.js environments.
- The AES-256-CBC algorithm is supported by all modern browsers and Node.js environments. If you are using an older version of Node.js or a browser that does not support AES-256-CBC, the `JFtwoHash` class will throw an exception when attempting to encrypt or decrypt data. Be sure to check compatibility with your environment before using this class.

## Security

This library uses the AES-256-CBC algorithm for encryption and decryption, which is a strong and widely-used algorithm. However, please note that no encryption algorithm can guarantee 100% security, and it is always possible for attackers to find vulnerabilities and exploit them.

Additionally, the `createUniqueHash()` function uses UUID v4 to generate random hashes. While the probability of generating duplicate hashes is extremely low, it is still possible. It is recommended that you use a unique salt or other additional entropy to reduce the chances of duplicate hashes.

## License

This package is licensed under the [MIT License](https://raw.githubusercontent.com/j-ftwo/jftwo-hash/main/LICENSE).
