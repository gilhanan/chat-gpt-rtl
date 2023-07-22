import fs from "fs";
import path from "path";
import crypto from "crypto";
import prettier from "prettier";

const manifestPath = "../dist/manifest.json";

function readFile({ filePath }: { filePath: string }): string {
  return fs.readFileSync(path.resolve(__dirname, filePath), "utf-8");
}

function writeToFile({
  filePath,
  data,
}: {
  filePath: string;
  data: any;
}): void {
  fs.writeFileSync(path.resolve(__dirname, filePath), data, "utf8");
}

function generatePrivateKey(): string {
  return crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "der",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  }).privateKey;
}

function generatePublicKey(privateKey: string): crypto.KeyObject {
  const keyObject = crypto.createPrivateKey(privateKey);
  return crypto.createPublicKey(keyObject);
}

function publicKeyToDer(publicKey: crypto.KeyObject): Buffer {
  return publicKey.export({
    type: "spki",
    format: "der",
  });
}

function derToBase64(der: Buffer): string {
  return der.toString("base64");
}

async function format(data: string): Promise<string> {
  return await prettier.format(data, {
    parser: "json",
  });
}

function generateExtensionId({ publicDer }: { publicDer: Buffer }): string {
  const hash = crypto.createHash("sha256");
  hash.update(publicDer);
  return hash
    .digest("hex")
    .substring(0, 32)
    .replace(/[0-9a-f]/g, (c) =>
      "abcdefghijklmnop".charAt("0123456789abcdef".indexOf(c)),
    );
}

async function main(): Promise<void> {
  const privateKey = generatePrivateKey();

  const publicKey = generatePublicKey(privateKey);

  const publicDer = publicKeyToDer(publicKey);

  const key = derToBase64(publicDer);

  const id = generateExtensionId({ publicDer });

  const manifest = JSON.parse(readFile({ filePath: manifestPath }));

  const updatedManifest = {
    id,
    key,
    ...manifest,
  };

  const data = await format(JSON.stringify(updatedManifest));

  writeToFile({
    filePath: manifestPath,
    data,
  });
}

async function runMain(): Promise<void> {
  await main();
}

void runMain();
