#!/usr/bin/env node

import { execSync, spawnSync } from "child_process";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import cpr from "cpr";
import { sync } from "rimraf";

function isPresent(dep) {
  try {
    execSync(dep, { stdio: "ignore" });
    return true;
  } catch (err) {
    return false;
  }
}

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

if (!isPresent("git --version")) {
  console.log("\n git is required");
  process.exit(1);
}

const args = process.argv.slice(2);

if (args.some((arg) => arg.includes("-"))) {
  console.log(
    `Error: unknown option ${args.filter((arg) => arg.includes("-"))}`
  );
  process.exit(1);
}

let folderName = ".";

if (args.length >= 1) {
  folderName = args[0];

  if (!existsSync(folderName)) {
    mkdirSync(folderName);
  }
}

let gitFolder = join(folderName, "git-clone");

// This uses --no-tags and --depth 1 in order to make the cloning faster
run("git", [
  "clone",
  "--no-tags",
  "--depth",
  "1",
  "https://github.com/asmello/webpack-rs.git",
  gitFolder,
]);

// Copies the template folder
cpr(join(gitFolder, "template"), folderName, {}, function (err, files) {
  // Removes the git folder regardless of whether cpr succeeded or not
  sync(gitFolder);

  if (err) {
    throw err;
  } else {
    console.log(" 🦀 Rust + 🕸 WebAssembly + Webpack = ❤️ ");

    run("npm", ["install"], { cwd: folderName, shell: true });

    console.log(" Installed dependencies ✅ ");
  }
});
