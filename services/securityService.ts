// This service handles client-side encryption. 
// In a production ZKE app, the key would be derived from a user's password 
// or a mnemonic phrase that never leaves the client.

export const generateVaultKey = async (): Promise<CryptoKey> => {
  return await window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
};

// Helper to convert ArrayBuffer to Base64 string
const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

// Helper to convert Base64 string to Uint8Array
const base64ToUint8Array = (base64: string): Uint8Array => {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export const encryptData = async (data: string, key: CryptoKey): Promise<{ encryptedData: string; iv: string }> => {
  const encodedData = new TextEncoder().encode(data);
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  const encryptedBuffer = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encodedData
  );

  return {
    encryptedData: arrayBufferToBase64(encryptedBuffer),
    iv: arrayBufferToBase64(iv.buffer),
  };
};

export const decryptData = async (encryptedData: string, iv: string, key: CryptoKey): Promise<string> => {
  try {
    const dataBuffer = base64ToUint8Array(encryptedData);
    const ivBuffer = base64ToUint8Array(iv);

    const decryptedBuffer = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: ivBuffer,
      },
      key,
      dataBuffer
    );

    return new TextDecoder().decode(decryptedBuffer);
  } catch (error) {
    console.error("Decryption failed:", error);
    throw new Error("Failed to decrypt data. Invalid key or data corruption.");
  }
};