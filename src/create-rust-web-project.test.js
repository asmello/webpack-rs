import { spawnSync } from "node:child_process";
import { rmSync, existsSync, mkdtempSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

function run(cmd, args, opts) {
  const output = spawnSync(cmd, args, opts);

  if (output.error != null) {
    throw output.error;
  }

  return output.status;
}

let targetPath;

beforeAll(() => {
  targetPath = mkdtempSync(join(tmpdir(), "tmp-rust-web-project-dir-"));
  const status = run(join("src", "create-rust-web-project.js"), [targetPath]);
  if (status !== 0) {
    rmSync(targetPath, { recursive: true });
    // workaround for https://github.com/jestjs/jest/issues/6695
    process.exit(status);
  }
});

afterAll(() => {
  rmSync(targetPath, { recursive: true });
});

test.concurrent("should contain Cargo.toml file", async () => {
  expect(existsSync(join(targetPath, "Cargo.toml"))).toBeTruthy();
});

test.concurrent("should contain package.json file", async () => {
  expect(existsSync(join(targetPath, "package.json"))).toBeTruthy();
});

test.concurrent("should contain webpack.config.js file", async () => {
  expect(existsSync(join(targetPath, "webpack.config.js"))).toBeTruthy();
});

test.concurrent("should contain README file", async () => {
  expect(existsSync(join(targetPath, "README.md"))).toBeTruthy();
});

test.concurrent("should contain index.html file", async () => {
  expect(existsSync(join(targetPath, "static", "index.html"))).toBeTruthy();
});

test.concurrent("should contain index.js file", async () => {
  expect(existsSync(join(targetPath, "js", "index.js"))).toBeTruthy();
});

test.concurrent("should contain lib.rs file", async () => {
  expect(existsSync(join(targetPath, "src", "lib.rs"))).toBeTruthy();
});

test.concurrent("should contain app.rs file", async () => {
  expect(existsSync(join(targetPath, "tests", "app.rs"))).toBeTruthy();
});

test.concurrent("should contain .gitignore file", async () => {
  expect(existsSync(join(targetPath, ".gitignore"))).toBeTruthy();
});

test("should have package-lock.json file (created during init)", () => {
  expect(existsSync(join(targetPath, "package-lock.json"))).toBeTruthy();
});

test("should build successfully", () => {
  expect(run("cargo", ["build"], { cwd: targetPath })).toEqual(0);
  expect(existsSync(join(targetPath, "Cargo.lock"))).toBeTruthy();
});

test("should create bundle successfully", () => {
  expect(run("npm", ["run", "build"], { cwd: targetPath })).toEqual(0);
  expect(existsSync(join(targetPath, "pkg", "index.js"))).toBeTruthy();
});

test("should run tests successfully", () => {
  expect(run("npm", ["test"], { cwd: targetPath })).toEqual(0);
});
