import { v4 as uuidv4 } from 'uuid';
import CryptoJS, { SHA256 } from 'crypto-js';

/**
 * Provides encryption and decryption functionality using the AES-256-CBC algorithm.
 */
export class JFtwoHash {
  private readonly keyWordArray: CryptoJS.lib.WordArray;
  private readonly ivWordArray: CryptoJS.lib.WordArray;

  /**
   * Creates a new `JFtwoHash` instance.
   * @param {string} key - The encryption key to use.
   * @param {string} iv - The initialization vector to use.
   * @throws {Error} Throws an error if AES-256-CBC encryption is not supported on this system,
   * if the provided key is not 32 bytes (256 bits), or if the provided iv is not 16 bytes (128 bits).
   */
  constructor(private readonly key: string, private readonly iv: string) {
    this.keyWordArray = CryptoJS.enc.Utf8.parse(this.key);
    this.ivWordArray = CryptoJS.enc.Utf8.parse(this.iv);

    if (
      !CryptoJS.algo.AES.createEncryptor(this.keyWordArray, {
        iv: this.ivWordArray,
      })
    ) {
      throw new Error('AES-256-CBC encryption is not supported on this system');
    }

    if (key.length !== 32) {
      throw new Error(
        'Invalid key length for AES-256-CBC encryption. Key must be 32 bytes (256 bits)'
      );
    }

    if (iv.length !== 16) {
      throw new Error(
        'Invalid iv length for AES-256-CBC encryption. IV must be 16 bytes (128 bits)'
      );
    }
  }

  /**
   * Generates example input values for the `JFtwoHash` constructor.
   * @returns {{key: string, iv: string}} An object containing example `key` and `iv` values.
   */
  public static generateExampleConstructorInputs(): {
    key: string;
    iv: string;
  } {
    const key = CryptoJS.lib.WordArray.random(16).toString();
    const iv = CryptoJS.lib.WordArray.random(8).toString();

    return { key, iv };
  }

  /**
   * Encrypts the given data using AES-256-CBC.
   * @param {*} data - The data to encrypt. Can be any JSON-serializable value.
   * @returns {string} A string containing the encrypted data.
   * @throws {Error} Throws an error if the provided data contains Date objects.
   */
  public encrypt(data: any): string {
    if (typeof data === 'object' && data !== null) {
      this.checkForDates(data);
    }

    const serializedData = JSON.stringify(data);
    const encryptedData = CryptoJS.AES.encrypt(
      serializedData,
      this.keyWordArray,
      {
        iv: this.ivWordArray,
      }
    ).toString();

    return encryptedData;
  }

  /**
   * Decrypts the given data using AES-256-CBC.
   * @param {string} encryptedData - The encrypted data to decrypt.
   * @returns {*} The decrypted data, which will be a JSON-serializable value.
   */
  public decrypt(encryptedData: string): any {
    const decryptedData = CryptoJS.AES.decrypt(
      encryptedData,
      this.keyWordArray,
      {
        iv: this.ivWordArray,
      }
    ).toString(CryptoJS.enc.Utf8);

    return JSON.parse(decryptedData);
  }

  /**
   * Recursively checks an object for any properties that are instances of `Date`.
   * @param {*} obj - The object to check.
   * @throws {Error} Throws an error if the object contains any `Date` properties.
   * @private
   */
  private checkForDates(obj: any): void {
    for (const prop in obj) {
      if (obj[prop] instanceof Date) {
        throw new Error(`Cannot encrypt object containing Date: ${prop}`);
      }

      if (typeof obj[prop] === 'object' && obj[prop] !== null) {
        this.checkForDates(obj[prop]);
      }
    }
  }
}

/**
 * Generates a random hash using UUID v4 and SHA256 algorithm.
 * @param {number} length - The length of the hash to generate. Default is 32.
 * @returns {string} A string containing the generated hash.
 */
export function createUniqueHash(length: number = 32): string {
  const uuid = uuidv4();
  const hash = SHA256(uuid).toString();
  return hash.substring(0, length);
}
