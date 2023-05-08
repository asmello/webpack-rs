import { spawnSync } from "node:child_process";
import { rmSync, mkdtempSync } from "node:fs";
import { join, resolve } from "node:path";
import { tmpdir } from "node:os";

function run(cmd, args, opts) {
  const output = spawnSync(cmd, args, opts);

  if (output.error != null) {
    throw output.error;
  }

  return output.status;
}

const workingDir = resolve(".");
const targetProjectDir = "project-dir";
let targetPath;

beforeAll(() => {
  targetPath = mkdtempSync(join(tmpdir(), "tmp-rust-web-project-install-dir-"));
});

afterAll(() => {
  rmSync(targetPath, { recursive: true });
});

test("npm install command should succeed", () => {
  expect(run("npm", ["install", workingDir], { cwd: targetPath })).toEqual(0);
});

test("npm init command should succeed", () => {
  expect(
    run("npm", ["init", "rust-web-project", targetProjectDir], {
      cwd: targetPath,
    })
  ).toEqual(0);
});

test("npm test command should succeed", () => {
  expect(
    run("npm", ["test"], { cwd: join(targetPath, targetProjectDir) })
  ).toEqual(0);
});
