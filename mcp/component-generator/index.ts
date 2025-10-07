#!/usr/bin/env tsx
import { runServer } from "./server";

async function main() {
  await runServer();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
