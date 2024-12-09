import { NextRequest, NextResponse } from "next/server";
import { hasAuth } from "../../firebase-admin";

export const GET = async (req: NextRequest) => {
  console.log("called~~~~~~~~~~~~~~~~~~~~~~~");
  const { success, error } = await hasAuth(req);

  return NextResponse.json({ success, error });
};
