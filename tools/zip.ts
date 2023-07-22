import { createWriteStream } from "fs";
import archiver from "archiver";

async function runMain(): Promise<void> {
  const output = createWriteStream("extension.zip");
  const archive = archiver("zip");

  archive.pipe(output);

  archive.directory("dist/", false);

  await archive.finalize();
}

void runMain();
