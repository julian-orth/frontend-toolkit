export interface JWTResult {
  isValid: boolean;
  header: string;
  payload: string;
  signature: string;
  headerObj: Record<string, unknown> | null;
  payloadObj: Record<string, unknown> | null;
  error?: string;
}

/**
 * Base64URL decode
 * Converts Base64URL encoded string to regular string
 */
function base64UrlDecode(input: string): string {
  try {
    // Replace Base64URL characters with standard Base64
    let base64 = input.replace(/-/g, "+").replace(/_/g, "/");

    // Add padding if necessary
    const pad = base64.length % 4;
    if (pad) {
      if (pad === 1) {
        throw new Error("Invalid Base64URL string");
      }
      base64 += "=".repeat(4 - pad);
    }

    // Decode using standard Base64
    const decoded = atob(base64);

    // Convert to UTF-8
    const bytes = Uint8Array.from(decoded, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch (error) {
    throw new Error(
      `Failed to decode Base64URL: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}

/**
 * Decode JWT token
 * Parses and decodes a JWT token into its components
 */
export function decodeJWT(token: string): JWTResult {
  // Remove whitespace
  const trimmedToken = token.trim();

  if (!trimmedToken) {
    return {
      isValid: false,
      header: "",
      payload: "",
      signature: "",
      headerObj: null,
      payloadObj: null,
      error: "Please enter a JWT token",
    };
  }

  // Split token into parts
  const parts = trimmedToken.split(".");

  if (parts.length !== 3) {
    return {
      isValid: false,
      header: "",
      payload: "",
      signature: "",
      headerObj: null,
      payloadObj: null,
      error: `Invalid JWT format. Expected 3 parts (header.payload.signature), got ${parts.length} parts`,
    };
  }

  const [headerPart, payloadPart, signaturePart] = parts;

  // Validate that parts are not empty
  if (!headerPart || !payloadPart) {
    return {
      isValid: false,
      header: "",
      payload: "",
      signature: signaturePart || "",
      headerObj: null,
      payloadObj: null,
      error: "JWT header or payload is empty",
    };
  }

  try {
    // Decode header
    const decodedHeader = base64UrlDecode(headerPart);
    let headerObj: Record<string, unknown> | null = null;

    try {
      headerObj = JSON.parse(decodedHeader) as Record<string, unknown>;
    } catch (e) {
      return {
        isValid: false,
        header: decodedHeader,
        payload: "",
        signature: signaturePart || "",
        headerObj: null,
        payloadObj: null,
        error: `Invalid JSON in header: ${e instanceof Error ? e.message : "Unknown error"}`,
      };
    }

    // Decode payload
    const decodedPayload = base64UrlDecode(payloadPart);
    let payloadObj: Record<string, unknown> | null = null;

    try {
      payloadObj = JSON.parse(decodedPayload) as Record<string, unknown>;
    } catch (e) {
      return {
        isValid: false,
        header: decodedHeader,
        payload: decodedPayload,
        signature: signaturePart || "",
        headerObj,
        payloadObj: null,
        error: `Invalid JSON in payload: ${e instanceof Error ? e.message : "Unknown error"}`,
      };
    }

    return {
      isValid: true,
      header: JSON.stringify(headerObj, null, 2),
      payload: JSON.stringify(payloadObj, null, 2),
      signature: signaturePart || "",
      headerObj,
      payloadObj,
    };
  } catch (error) {
    return {
      isValid: false,
      header: "",
      payload: "",
      signature: signaturePart || "",
      headerObj: null,
      payloadObj: null,
      error: `Decoding error: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

/**
 * Analyze JWT claims
 * Extracts and analyzes common JWT claims
 */
export function analyzeJWTClaims(payloadObj: Record<string, unknown> | null): {
  claims: Array<{ key: string; value: string; description: string }>;
  isExpired: boolean;
  expirationInfo?: string;
} {
  const claims: Array<{ key: string; value: string; description: string }> = [];
  let isExpired = false;
  let expirationInfo: string | undefined;

  if (!payloadObj) {
    return { claims, isExpired };
  }

  const now = Math.floor(Date.now() / 1000);

  // Common JWT claims descriptions
  const claimDescriptions: Record<string, string> = {
    iss: "Issuer - Identifies who issued the JWT",
    sub: "Subject - Identifies the subject of the JWT",
    aud: "Audience - Identifies the recipients of the JWT",
    exp: "Expiration Time - Time after which the JWT must not be accepted",
    nbf: "Not Before - Time before which the JWT must not be accepted",
    iat: "Issued At - Time at which the JWT was issued",
    jti: "JWT ID - Unique identifier for the JWT",
    name: "Name - Full name of the user",
    email: "Email - Email address of the user",
    email_verified: "Email Verified - Whether the email has been verified",
    phone_number: "Phone Number - Phone number of the user",
    phone_number_verified:
      "Phone Verified - Whether the phone number has been verified",
    given_name: "Given Name - First name of the user",
    family_name: "Family Name - Last name of the user",
    middle_name: "Middle Name - Middle name of the user",
    nickname: "Nickname - Casual name of the user",
    preferred_username: "Preferred Username - Shorthand name for the user",
    profile: "Profile - Profile page URL",
    picture: "Picture - Profile picture URL",
    website: "Website - Web page or blog URL",
    gender: "Gender - Gender of the user",
    birthdate: "Birthdate - Birthday of the user",
    zoneinfo: "Zone Info - Time zone of the user",
    locale: "Locale - Locale of the user",
    updated_at: "Updated At - Time the user's information was last updated",
    azp: "Authorized Party - Party to which the ID token was issued",
    nonce: "Nonce - Value used to associate a client session with an ID token",
    auth_time: "Authentication Time - Time when authentication occurred",
    acr: "Authentication Context Class Reference - Authentication context class",
    amr: "Authentication Methods References - Authentication methods used",
    scope: "Scope - Space-separated list of scope values",
    roles: "Roles - User roles or permissions",
    groups: "Groups - User groups",
  };

  // Process all claims
  for (const [key, value] of Object.entries(payloadObj)) {
    let displayValue = String(value);
    const description =
      claimDescriptions[key] || "Custom claim - Application-specific data";

    // Format timestamp values
    if (["exp", "nbf", "iat", "auth_time", "updated_at"].includes(key)) {
      const timestamp = Number(value);
      if (!isNaN(timestamp) && timestamp > 0) {
        const date = new Date(timestamp * 1000);
        displayValue = `${timestamp} (${date.toISOString()})`;

        // Check expiration
        if (key === "exp") {
          if (timestamp < now) {
            isExpired = true;
            const diffSeconds = now - timestamp;
            expirationInfo = formatTimeDifference(diffSeconds, "ago");
          } else {
            const diffSeconds = timestamp - now;
            expirationInfo = formatTimeDifference(diffSeconds, "from now");
          }
        }
      }
    }

    // Format arrays
    if (Array.isArray(value)) {
      displayValue = JSON.stringify(value, null, 2);
    }

    // Format objects
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      displayValue = JSON.stringify(value, null, 2);
    }

    claims.push({ key, value: displayValue, description });
  }

  return { claims, isExpired, expirationInfo };
}

/**
 * Format time difference in human-readable format
 */
function formatTimeDifference(seconds: number, suffix: string): string {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days !== 1 ? "s" : ""} ${suffix}`;
  }
  if (hours > 0) {
    return `${hours} hour${hours !== 1 ? "s" : ""} ${suffix}`;
  }
  if (minutes > 0) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ${suffix}`;
  }
  return `${seconds} second${seconds !== 1 ? "s" : ""} ${suffix}`;
}

/**
 * Get algorithm name from JWT header
 */
export function getAlgorithmInfo(headerObj: Record<string, unknown> | null): {
  algorithm: string;
  description: string;
  isNone: boolean;
} {
  if (!headerObj || !headerObj.alg) {
    return {
      algorithm: "Unknown",
      description: "Algorithm not specified in header",
      isNone: false,
    };
  }

  const alg = String(headerObj.alg).toUpperCase();
  const isNone = alg === "NONE";

  const algorithmDescriptions: Record<string, string> = {
    HS256: "HMAC with SHA-256 - Symmetric algorithm using a shared secret",
    HS384: "HMAC with SHA-384 - Symmetric algorithm using a shared secret",
    HS512: "HMAC with SHA-512 - Symmetric algorithm using a shared secret",
    RS256:
      "RSA Signature with SHA-256 - Asymmetric algorithm using RSA key pair",
    RS384:
      "RSA Signature with SHA-384 - Asymmetric algorithm using RSA key pair",
    RS512:
      "RSA Signature with SHA-512 - Asymmetric algorithm using RSA key pair",
    ES256:
      "ECDSA with P-256 curve and SHA-256 - Asymmetric algorithm using elliptic curve",
    ES384:
      "ECDSA with P-384 curve and SHA-384 - Asymmetric algorithm using elliptic curve",
    ES512:
      "ECDSA with P-521 curve and SHA-512 - Asymmetric algorithm using elliptic curve",
    PS256:
      "RSASSA-PSS with SHA-256 - Asymmetric algorithm using RSA-PSS key pair",
    PS384:
      "RSASSA-PSS with SHA-384 - Asymmetric algorithm using RSA-PSS key pair",
    PS512:
      "RSASSA-PSS with SHA-512 - Asymmetric algorithm using RSA-PSS key pair",
    NONE: "No digital signature or MAC - WARNING: Not secure!",
  };

  return {
    algorithm: alg,
    description:
      algorithmDescriptions[alg] || "Custom or non-standard algorithm",
    isNone,
  };
}

/**
 * Generate sample JWT token for testing
 */
export function generateSampleJWT(): string {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const payload = {
    sub: "1234567890",
    name: "John Doe",
    email: "john.doe@example.com",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + 3600, // 1 hour from now
    iss: "https://example.com",
    aud: "https://api.example.com",
  };

  // Encode to Base64URL
  const encodeBase64URL = (obj: Record<string, unknown>): string => {
    const json = JSON.stringify(obj);
    const base64 = btoa(
      new TextEncoder()
        .encode(json)
        .reduce((data, byte) => data + String.fromCharCode(byte), "")
    );
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  };

  const headerEncoded = encodeBase64URL(header);
  const payloadEncoded = encodeBase64URL(payload);
  const signature = "SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"; // Sample signature

  return `${headerEncoded}.${payloadEncoded}.${signature}`;
}
