<div align="center">

  <h1><code>rust-web-bootstrapper</code></h1>

<strong>Bootstrap your Rust, WebAssembly and Webpack projects!</strong>

<sub>Forked from <a href="https://github.com/rustwasm/rust-webpack-template"><code>rust-webpack-template</code></a> due to the original project being abandoned.</sub>

</div>

## About

This bootstrapper is designed for creating monorepo-style Web applications with
Rust-generated WebAssembly and Webpack without publishing your wasm to NPM.

## Usage

You can use this project bootstrapper with `npm init`:

```sh
npm init rust-web-project my-app
```

For now you can use the [original project's documentation]([https://rustwasm.github.io/docs/wasm-pack/tutorials/hybrid-applications-with-webpack/index.html]) to learn about the generated project's layout.

## 🔋 Batteries Included

This template comes pre-configured with all the boilerplate for compiling Rust
to WebAssembly and hooking into a Webpack build pipeline.

- `npm start` -- Serve the project locally for development at
  `http://localhost:8080`. It auto-reloads when you make any changes.

- `npm run build` -- Bundle the project (in production mode).

- `npm test` -- Run the project's unit tests.
