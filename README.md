<div align="center">

  <h1><code>webpack-rs</code></h1>

<strong>Bootstrap your Rust, WebAssembly and Webpack projects!</strong>

<sub>Forked from <a href="https://github.com/rustwasm/rust-webpack-template"><code>rust-webpack-template</code></a> due to the original project being abandoned.</sub>

</div>

## About

This template is designed for creating monorepo-style Web applications with
Rust-generated WebAssembly and Webpack without publishing your wasm to NPM.

## 🚴 Using This Template

You can use this template with `npm init`:

```sh
npm init rust-webpack my-app
```

For now you can use the [original project's documentation]([https://rustwasm.github.io/docs/wasm-pack/tutorials/hybrid-applications-with-webpack/index.html]) to learn about the generated project's layout.

## 🔋 Batteries Included

This template comes pre-configured with all the boilerplate for compiling Rust
to WebAssembly and hooking into a Webpack build pipeline.

- `npm start` -- Serve the project locally for development at
  `http://localhost:8080`. It auto-reloads when you make any changes.

- `npm run build` -- Bundle the project (in production mode).

- `npm test` -- Run the project's unit tests.
