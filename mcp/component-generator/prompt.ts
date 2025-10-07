import { loadUiRules } from "./uiRules";

export type BuildPromptInput = {
  componentName: string;
  description: string;
  targetPath?: string;
};

export function buildPrompt(input: BuildPromptInput): string {
  const { componentName, description } = input;
  const uiRules = loadUiRules();
  return [
    "[UI Component Generation Prompt]",
    "- Follow the UI rules below strictly when generating markup and classes.",
    "- Use Tailwind utility-first styling, meaningful labels/alt, hover/focus/transition states.",
    "- Provide an accessible structure and semantic elements.",
    "",
    `Component Name: ${componentName}`,
    `Description: ${description}`,
    `Target Directory: ${input.targetPath ?? "(미정)"}`,
    "",
    "[UI Rules from ui-markup-styling.mdc]",
    uiRules,
  ].join("\n");
}
