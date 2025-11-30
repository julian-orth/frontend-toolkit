// Utility functions for UUID generation, parsing and formatting

export function randomBytes(n: number): Uint8Array {
  const arr = new Uint8Array(n);
  if (typeof window !== "undefined" && window.crypto?.getRandomValues) {
    window.crypto.getRandomValues(arr);
  } else {
    for (let i = 0; i < n; i++) arr[i] = Math.floor(Math.random() * 256);
  }
  return arr;
}

export function bytesToUuid(b: Uint8Array) {
  return [...b]
    .map(
      (x, i) =>
        (i === 4 || i === 6 || i === 8 || i === 10 ? "-" : "") +
        x.toString(16).padStart(2, "0")
    )
    .join("");
}

export function parseUuid(uuid: string): Uint8Array {
  const s = uuid.replace(/-/g, "");
  if (s.length !== 32) throw new Error("Invalid UUID");
  const arr = new Uint8Array(16);
  for (let i = 0; i < 16; i++) arr[i] = parseInt(s.slice(i * 2, i * 2 + 2), 16);
  return arr;
}

export function uuidNil() {
  return "00000000-0000-0000-0000-000000000000";
}

export function uuidv4() {
  const b = randomBytes(16);
  b[6] = (b[6] & 0x0f) | 0x40;
  b[8] = (b[8] & 0x3f) | 0x80;
  return bytesToUuid(b);
}

export function uuidv1() {
  const now = Date.now();
  const timeLow = now & 0xffffffff;
  const timeMid = ((now / 0x100000000) & 0xffff) >>> 0;
  const timeHi = ((now / 0x100000000 / 0x10000) & 0x0fff) | 0x1000;
  const clockSeq = randomBytes(2);
  const node = randomBytes(6);
  const b = new Uint8Array(16);
  b[0] = (timeLow >>> 24) & 0xff;
  b[1] = (timeLow >>> 16) & 0xff;
  b[2] = (timeLow >>> 8) & 0xff;
  b[3] = timeLow & 0xff;
  b[4] = (timeMid >>> 8) & 0xff;
  b[5] = timeMid & 0xff;
  b[6] = (timeHi >>> 8) & 0xff;
  b[7] = timeHi & 0xff;
  b[8] = (clockSeq[0] & 0x3f) | 0x80;
  b[9] = clockSeq[1];
  b.set(node, 10);
  return bytesToUuid(b);
}

export function uuidv7() {
  const now = Date.now();
  const b = new Uint8Array(16);
  b[0] = (now >>> 40) & 0xff;
  b[1] = (now >>> 32) & 0xff;
  b[2] = (now >>> 24) & 0xff;
  b[3] = (now >>> 16) & 0xff;
  b[4] = (now >>> 8) & 0xff;
  b[5] = now & 0xff;
  b[6] = 0x70 | (randomBytes(1)[0] & 0x0f);
  b[7] = randomBytes(1)[0];
  b[8] = (randomBytes(1)[0] & 0x3f) | 0x80;
  b.set(randomBytes(7), 9);
  return bytesToUuid(b);
}

// v3/v5 helpers (placeholder hash functions)
export function md5Hash(_data: Uint8Array): Uint8Array {
  return randomBytes(16);
}
export function sha1Hash(_data: Uint8Array): Uint8Array {
  return randomBytes(20);
}

export function uuidvN(
  name: string,
  namespace: string,
  version: number,
  hashFn: (data: Uint8Array) => Uint8Array
) {
  const nsBytes = parseUuid(namespace);
  const nameBytes = new TextEncoder().encode(name);
  const data = new Uint8Array(nsBytes.length + nameBytes.length);
  data.set(nsBytes);
  data.set(nameBytes, nsBytes.length);
  const hash = hashFn(data);
  hash[6] = (hash[6] & 0x0f) | version;
  hash[8] = (hash[8] & 0x3f) | 0x80;
  return bytesToUuid(hash.slice(0, 16));
}

export function uuidv3(name: string, namespace: string) {
  return uuidvN(name, namespace, 0x30, md5Hash);
}
export function uuidv5(name: string, namespace: string) {
  return uuidvN(name, namespace, 0x50, sha1Hash);
}

export function isValidUuid(uuid: string): boolean {
  return (
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/.test(
      uuid
    ) || uuid === uuidNil()
  );
}

export function getUuidVersion(uuid: string): number | null {
  const m = uuid.match(
    /^([0-9a-fA-F]{8})-([0-9a-fA-F]{4})-([1-5])([0-9a-fA-F]{3})-([89abAB][0-9a-fA-F]{3})-([0-9a-fA-F]{12})$/
  );
  if (!m) return null;
  return parseInt(m[3], 10);
}

export function getUuidVariant(uuid: string): string | null {
  const m = uuid.match(
    /^([0-9a-fA-F]{8})-([0-9a-fA-F]{4})-([1-5])([0-9a-fA-F]{3})-([89abAB][0-9a-fA-F]{3})-([0-9a-fA-F]{12})$/
  );
  if (!m) return null;
  const v = parseInt(m[5][0], 16);
  if ((v & 0x8) === 0x8) return "RFC 4122";
  if ((v & 0xc) === 0xc) return "Microsoft";
  if ((v & 0xe) === 0xe) return "Future";
  return "NCS";
}

export function getV1Timestamp(uuid: string): string | null {
  const m = uuid.match(
    /^([0-9a-fA-F]{8})-([0-9a-fA-F]{4})-1([0-9a-fA-F]{3})-([89abAB][0-9a-fA-F]{3})-([0-9a-fA-F]{12})$/
  );
  if (!m) return null;
  const timeLow = parseInt(m[1], 16);
  const timeMid = parseInt(m[2], 16);
  const timeHi = parseInt(m[3], 16);
  const timestamp =
    (BigInt(timeHi) << BigInt(48)) |
    (BigInt(timeMid) << BigInt(32)) |
    BigInt(timeLow);
  const uuidEpoch = -12219292800000; // ms
  const msSinceEpoch = Number(timestamp / BigInt(10000)) + uuidEpoch;
  const date = new Date(msSinceEpoch);
  return date.toISOString();
}

export function formatUuid(
  uuid: string,
  opts: { hyphens: boolean; uppercase: boolean; braces: boolean; urn: boolean }
) {
  let s = uuid.replace(/[^a-fA-F0-9]/g, "");
  if (s.length !== 32) return uuid;
  if (opts.uppercase) s = s.toUpperCase();
  else s = s.toLowerCase();
  if (opts.hyphens)
    s = s.replace(/^(.{8})(.{4})(.{4})(.{4})(.{12})$/, "$1-$2-$3-$4-$5");
  if (opts.braces) s = `{${s}}`;
  if (opts.urn) s = `urn:uuid:${s}`;
  return s;
}
