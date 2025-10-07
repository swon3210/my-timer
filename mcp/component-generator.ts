#!/usr/bin/env tsx
// 유지용 얇은 래퍼: 모듈 분리 후 새 엔트리를 호출합니다.
import { runServer } from "./component-generator/server";

runServer().catch((err) => {
  console.error(err);
  process.exit(1);
});
