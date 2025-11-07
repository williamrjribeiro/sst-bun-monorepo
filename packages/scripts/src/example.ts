import { Example } from "@sst-bun-monorepo/core/example";
import { Resource } from "sst";

console.log(`${Example.hello()} Linked to ${Resource.MyBucket.name}.`);
