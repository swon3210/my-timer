import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export function loadUiRules(): string {
  try {
    const rulesPath = resolve(
      process.cwd(),
      ".cursor/rules/ui-markup-styling.mdc"
    );
    const raw = readFileSync(rulesPath, "utf8");
    return raw;
  } catch {
    return "(UI 규칙 문서를 찾지 못했습니다. Tailwind 유틸리티 우선, 접근성 레이블 제공, transition/hover/focus 상태 피드백을 기본으로 준수하세요.)";
  }
}
