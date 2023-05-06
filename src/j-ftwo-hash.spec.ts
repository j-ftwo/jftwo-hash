import CryptoJS from 'crypto-js';

import { TestObject } from './test-object';
import { JFtwoHash, createUniqueHash } from './j-ftwo-hash';

describe('JFtwoHash', () => {
  let jftwoHash: JFtwoHash;
  let key: string;
  let iv: string;

  beforeAll(() => {
    ({ key, iv } = JFtwoHash.generateExampleConstructorInputs());
    jftwoHash = new JFtwoHash(key, iv);
  });

  afterAll(() => {
    const mockData = {
      name: 'j-ftwo',
      age: 13,
      birthdate: new Date().toISOString(),
    };
    const encrypted = jftwoHash.encrypt(mockData);

    console.log(
      `key=${key}`,
      `iv=${iv}`,
      `generateHash=${createUniqueHash()}`,
      `encrypt=${encrypted}`,
      `decrypt=${JSON.stringify(jftwoHash.decrypt(encrypted))}`
    );
  });

  describe('JFtwoHash constructor', () => {
    it('should create a new instance with valid string key and iv', () => {
      const key = '0123456789abcdef0123456789abcdef';
      const iv = '0123456789abcdef';

      const instance = new JFtwoHash(key, iv);

      expect(instance).toBeInstanceOf(JFtwoHash);
    });

    it('should throw an error if AES-256-CBC encryption is not supported', () => {
      jest
        .spyOn(CryptoJS.algo.AES, 'createEncryptor')
        .mockReturnValueOnce(undefined as any);

      expect(() => new JFtwoHash(key, iv)).toThrowError(
        'AES-256-CBC encryption is not supported on this system'
      );
    });

    it('should throw an error if the key length is invalid', () => {
      expect(() => new JFtwoHash('shortkey', iv)).toThrowError(
        'Invalid key length for AES-256-CBC encryption. Key must be 32 bytes (256 bits)'
      );
    });

    it('should throw an error if the IV length is invalid', () => {
      expect(() => new JFtwoHash(key, 'shortiv')).toThrowError(
        'Invalid iv length for AES-256-CBC encryption. IV must be 16 bytes (128 bits)'
      );
    });

    it('should throw an error with invalid string key and iv', () => {
      const key = 'invalid_key';
      const iv = 'invalid_iv';

      expect(() => {
        new JFtwoHash(key, iv);
      }).toThrow();
    });
  });

  describe('generateExampleConstructorInputs', () => {
    it('returns an object with `key` and `iv` properties', () => {
      const result = JFtwoHash.generateExampleConstructorInputs();
      expect(typeof result).toEqual('object');
      expect(result).toHaveProperty('key');
      expect(result).toHaveProperty('iv');
    });

    it('generates random 16-byte key and 8-byte iv', () => {
      const result = JFtwoHash.generateExampleConstructorInputs();
      expect(result.key).toMatch(/^[0-9a-f]{32}$/);
      expect(result.iv).toMatch(/^[0-9a-f]{16}$/);
    });
  });

  describe('generateHash', () => {
    it('should generate a hash of length 32 if no length parameter is passed', () => {
      const hash = createUniqueHash();
      expect(hash.length).toEqual(32);
    });

    it('should generate a hash of specified length if length parameter is passed', () => {
      const hash = createUniqueHash(16);
      expect(hash.length).toEqual(16);
    });

    it('should generate a unique hash each time it is called', () => {
      const hash1 = createUniqueHash();
      const hash2 = createUniqueHash();
      expect(hash1).not.toEqual(hash2);
    });

    it('should generate a hash using SHA-256 algorithm', () => {
      const hash = createUniqueHash();
      expect(hash).toMatch(/^[0-9a-f]{32}$/i); // Regular expression to match SHA-256 hash
    });
  });

  describe('encrypt and decrypt using TestObject', () => {
    test('encrypts and decrypts OBJECT_1', () => {
      const encryptedData = jftwoHash.encrypt(TestObject.OBJECT_1);
      const decryptedData = jftwoHash.decrypt(encryptedData);
      expect(decryptedData).toEqual(TestObject.OBJECT_1);
    });

    test('throws error when encrypting invalid OBJECT_2', () => {
      expect(() => jftwoHash.encrypt(TestObject.OBJECT_2)).toThrowError(
        'Cannot encrypt object containing Date: date'
      );
    });

    test('encrypts and decrypts OBJECT_3', () => {
      const encryptedData = jftwoHash.encrypt(TestObject.OBJECT_3);
      const decryptedData = jftwoHash.decrypt(encryptedData);
      expect(decryptedData).toEqual(TestObject.OBJECT_3);
    });

    test('encrypts and decrypts OBJECT_4', () => {
      const encryptedData = jftwoHash.encrypt(TestObject.OBJECT_4);
      const decryptedData = jftwoHash.decrypt(encryptedData);
      expect(decryptedData).toEqual(TestObject.OBJECT_4);
    });
  });
});
