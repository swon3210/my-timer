import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { buildPrompt } from "./prompt";

export function createServer() {
  const server = new McpServer({
    name: "ui-component-generator",
    version: "0.1.0",
  });

  registerGenerateComponentTool(server);
  return server;
}

function registerGenerateComponentTool(server: McpServer) {
  server.tool(
    "generate_component",
    {
      description:
        "컴포넌트 이름과 설명으로 React 컴포넌트를 생성하는 프롬프트를 작성합니다.",
      inputSchema: {
        type: "object",
        properties: {
          componentName: { type: "string", minLength: 1 },
          description: { type: "string", minLength: 1 },
          targetPath: { type: "string" },
        },
        required: ["componentName", "description"],
        additionalProperties: false,
      },
    },
    async (args) => {
      const { componentName, description, targetPath } = args as {
        componentName: string;
        description: string;
        targetPath?: string;
      };

      let finalTargetPath = (targetPath ?? "").trim();

      if (!finalTargetPath) {
        try {
          const result = await server.server.elicitInput({
            message:
              "컴포넌트를 어느 디렉터리에 생성할까요? 규칙상 공용 UI는 `src/components`, 특정 페이지 전용은 해당 라우트 하위의 `components/`를 권장합니다.",
            requestedSchema: {
              type: "object",
              properties: {
                targetPath: {
                  type: "string",
                  title: "컴포넌트 디렉터리 경로",
                  description:
                    "예: src/components, src/components/ui, src/app/account-book/goals/components",
                  minLength: 1,
                },
              },
              required: ["targetPath"],
            },
          });

          if (result && result.action === "accept") {
            const content = result.content;
            const candidate =
              content && typeof content === "object"
                ? (content as Record<string, unknown>)["targetPath"]
                : undefined;
            if (typeof candidate === "string" && candidate.trim().length > 0) {
              finalTargetPath = candidate.trim();
            }
          } else if (result && result.action === "cancel") {
            return {
              content: [
                {
                  type: "text",
                  text: "요청이 취소되었습니다. 컴포넌트 프롬프트 생성을 중단합니다.",
                },
              ],
            };
          }
        } catch {
          finalTargetPath = "src/components";
        }
      }

      if (!finalTargetPath) {
        finalTargetPath = "src/components";
      }

      const prompt = buildPrompt({
        componentName,
        description,
        targetPath: finalTargetPath,
      });
      return {
        content: [{ type: "text", text: prompt }],
      };
    }
  );
}

export async function runServer() {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
