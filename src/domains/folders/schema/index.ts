import { z } from "zod";

export const getFolderNamesResponseSchema = z.object({
  folders: z.array(z.string()),
});
