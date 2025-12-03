/**
 * Hash generation utility functions
 * Uses Web Crypto API for SHA algorithms and JS implementation for MD5
 */

export type HashAlgorithm = "MD5" | "SHA-1" | "SHA-256" | "SHA-512";
export type InputFormat = "text" | "hex" | "base64";

export type HashResult = {
  hash?: string;
  error?: string;
  success: boolean;
};

/**
 * Convert input string to Uint8Array based on format
 */
function prepareInput(input: string, format: InputFormat): Uint8Array {
  switch (format) {
    case "text":
      return new TextEncoder().encode(input);
    case "hex":
      // Remove spaces and convert hex string to bytes
      const hex = input.replace(/\s/g, "");
      if (!/^[0-9a-fA-F]*$/.test(hex)) {
        throw new Error("Invalid hexadecimal string");
      }
      if (hex.length % 2 !== 0) {
        throw new Error("Hexadecimal string must have even length");
      }
      const bytes = new Uint8Array(hex.length / 2);
      for (let i = 0; i < hex.length; i += 2) {
        bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
      }
      return bytes;
    case "base64":
      // Decode base64 to bytes
      const base64Clean = input.replace(/\s/g, "");
      const binaryString = atob(base64Clean);
      const base64Bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        base64Bytes[i] = binaryString.charCodeAt(i);
      }
      return base64Bytes;
    default:
      throw new Error("Unsupported input format");
  }
}

/**
 * Convert byte array to hex string
 */
function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * MD5 hash implementation (since Web Crypto API doesn't support it)
 * Based on the MD5 Message-Digest Algorithm (RFC 1321)
 */
function md5(input: Uint8Array): string {
  // MD5 constants
  const K = new Uint32Array([
    0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a,
    0xa8304613, 0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be,
    0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821, 0xf61e2562, 0xc040b340,
    0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
    0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8,
    0x676f02d9, 0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c,
    0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70, 0x289b7ec6, 0xeaa127fa,
    0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
    0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92,
    0xffeff47d, 0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1,
    0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391,
  ]);

  const S = new Uint8Array([
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5,
    9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11,
    16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10,
    15, 21,
  ]);

  // Helper functions
  const rotateLeft = (x: number, n: number) => (x << n) | (x >>> (32 - n));

  const fFunc = (x: number, y: number, z: number) => (x & y) | (~x & z);
  const gFunc = (x: number, y: number, z: number) => (x & z) | (y & ~z);
  const hFunc = (x: number, y: number, z: number) => x ^ y ^ z;
  const iFunc = (x: number, y: number, z: number) => y ^ (x | ~z);

  // Preprocessing
  const msgLen = input.length;
  const bitLen = msgLen * 8;

  // Padding
  const paddingLen = (56 - ((msgLen + 1) % 64)) % 64;
  const totalLen = msgLen + 1 + paddingLen + 8;
  const padded = new Uint8Array(totalLen);
  padded.set(input);
  padded[msgLen] = 0x80;

  // Append length as 64-bit little-endian
  for (let i = 0; i < 8; i++) {
    padded[totalLen - 8 + i] = (bitLen >>> (i * 8)) & 0xff;
  }

  // Initialize hash values
  let a = 0x67452301;
  let b = 0xefcdab89;
  let c = 0x98badcfe;
  let d = 0x10325476;

  // Process 512-bit chunks
  for (let offset = 0; offset < totalLen; offset += 64) {
    const chunk = new Uint32Array(16);
    for (let i = 0; i < 16; i++) {
      chunk[i] =
        padded[offset + i * 4] |
        (padded[offset + i * 4 + 1] << 8) |
        (padded[offset + i * 4 + 2] << 16) |
        (padded[offset + i * 4 + 3] << 24);
    }

    let aa = a;
    let bb = b;
    let cc = c;
    let dd = d;

    for (let i = 0; i < 64; i++) {
      let F: number;
      let gIndex: number;

      if (i < 16) {
        F = fFunc(bb, cc, dd);
        gIndex = i;
      } else if (i < 32) {
        F = gFunc(bb, cc, dd);
        gIndex = (5 * i + 1) % 16;
      } else if (i < 48) {
        F = hFunc(bb, cc, dd);
        gIndex = (3 * i + 5) % 16;
      } else {
        F = iFunc(bb, cc, dd);
        gIndex = (7 * i) % 16;
      }

      F = (F + aa + K[i] + chunk[gIndex]) >>> 0;
      aa = dd;
      dd = cc;
      cc = bb;
      bb = (bb + rotateLeft(F, S[i])) >>> 0;
    }

    a = (a + aa) >>> 0;
    b = (b + bb) >>> 0;
    c = (c + cc) >>> 0;
    d = (d + dd) >>> 0;
  }

  // Produce final hash in little-endian
  const result = new Uint8Array(16);
  for (let i = 0; i < 4; i++) {
    result[i] = a >>> (i * 8);
    result[i + 4] = b >>> (i * 8);
    result[i + 8] = c >>> (i * 8);
    result[i + 12] = d >>> (i * 8);
  }

  return bytesToHex(result);
}

/**
 * Generate hash using Web Crypto API (for SHA algorithms) or MD5 implementation
 */
export async function generateHash(
  input: string,
  algorithm: HashAlgorithm,
  format: InputFormat = "text"
): Promise<HashResult> {
  try {
    if (!input) {
      return { success: false, error: "Input cannot be empty" };
    }

    const inputBytes = prepareInput(input, format);

    if (algorithm === "MD5") {
      // Use our MD5 implementation
      const hash = md5(inputBytes);
      return { success: true, hash };
    }

    // Use Web Crypto API for SHA algorithms
    const algoMap: Record<string, string> = {
      "SHA-1": "SHA-1",
      "SHA-256": "SHA-256",
      "SHA-512": "SHA-512",
    };

    // Create a new Uint8Array to ensure compatibility with Web Crypto API
    const buffer = new Uint8Array(inputBytes);
    const hashBuffer = await crypto.subtle.digest(algoMap[algorithm], buffer);
    const hashArray = new Uint8Array(hashBuffer);
    const hash = bytesToHex(hashArray);

    return { success: true, hash };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate hash",
    };
  }
}

/**
 * Generate HMAC using Web Crypto API
 */
export async function generateHMAC(
  input: string,
  key: string,
  algorithm: HashAlgorithm,
  format: InputFormat = "text"
): Promise<HashResult> {
  try {
    if (!input) {
      return { success: false, error: "Input cannot be empty" };
    }

    if (!key) {
      return { success: false, error: "HMAC key cannot be empty" };
    }

    const inputBytes = prepareInput(input, format);
    const keyBytes = new TextEncoder().encode(key);

    // Web Crypto API doesn't support HMAC-MD5, so we'll return an error for MD5
    if (algorithm === "MD5") {
      return {
        success: false,
        error:
          "HMAC-MD5 is not supported by Web Crypto API due to security concerns. Please use SHA-256 or SHA-512.",
      };
    }

    const algoMap: Record<string, string> = {
      "SHA-1": "SHA-1",
      "SHA-256": "SHA-256",
      "SHA-512": "SHA-512",
    };

    // Import the key
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyBytes,
      {
        name: "HMAC",
        hash: { name: algoMap[algorithm] },
      },
      false,
      ["sign"]
    );

    // Generate HMAC - create a new Uint8Array to ensure compatibility
    const buffer = new Uint8Array(inputBytes);
    const signature = await crypto.subtle.sign("HMAC", cryptoKey, buffer);
    const signatureArray = new Uint8Array(signature);
    const hash = bytesToHex(signatureArray);

    return { success: true, hash };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to generate HMAC",
    };
  }
}

/**
 * Verify HMAC
 */
export async function verifyHMAC(
  input: string,
  key: string,
  expectedHash: string,
  algorithm: HashAlgorithm,
  format: InputFormat = "text"
): Promise<boolean> {
  const result = await generateHMAC(input, key, algorithm, format);
  if (!result.success || !result.hash) {
    return false;
  }
  return result.hash.toLowerCase() === expectedHash.toLowerCase();
}
