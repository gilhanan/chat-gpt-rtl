const fs = require("fs");
const archiver = require("archiver");

const output = fs.createWriteStream("dist.zip");
const archive = archiver("zip", {
  zlib: { level: 9 },
});

archive.pipe(output);

archive.directory("dist/", false);

archive.finalize();
