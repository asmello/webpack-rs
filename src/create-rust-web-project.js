#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { cpSync, existsSync } from "node:fs";
import { join as pathJoin, dirname } from "node:path";
import { fileURLToPath } from "node:url";

function run(cmd, args, opts) {
  const output = spawnSync(cmd, args, opts);

  if (output.error != null) {
    throw output.error;
  }

  if (output.status !== 0) {
    throw new Error(
      "Bad error code when running `" +
        cmd +
        " " +
        args.join(" ") +
        "`: " +
        output.status
    );
  }
}

const args = process.argv.slice(1); // from .js path onwards

// ensure no unexpected arguments are passed
if (args.slice(1).some((arg) => arg.startsWith("-"))) {
  console.error(
    `Error: unknown option ${args.filter((arg) => arg.startsWith("-"))}`
  );
  process.exit(1);
}

let folderName = ".";
let options = { recursive: true };

if (args.length > 1) {
  folderName = args[1];
  options.errorOnExist = true;
}

// prevent overwriting existing project
if (existsSync(pathJoin(folderName, "package.json"))) {
  console.error("Attempting to bootstrap an existing node project.");
  process.exit(2);
}

const templatePath = pathJoin(
  dirname(fileURLToPath(import.meta.url)),
  "../template"
);

cpSync(templatePath, folderName, options);
console.log(" 🦀 Rust + 🕸 WebAssembly + Webpack = ❤️ ");

run("npm", ["install"], { cwd: folderName, shell: true });
console.log(" Installed dependencies ✅ ");
