# SST Bun Monorepo Example

This repository shows how to configure a SST monorepo project managed by Bun.

To build the Bun lambda layers, use [bun-lamba](https://github.com/oven-sh/bun/tree/main/packages/bun-lambda).

```sh
cd bun/packages/bun-lambda
bun i
bun run build-layer --layer=bun --arch=x64 --output=bun-x86_64-layer.zip
cp bun-x86_64-layer.zip ../../../sst-bun-monorepo/infra
```