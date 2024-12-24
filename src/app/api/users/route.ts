import { NextResponse } from "next/server";
import { AuthRequest, withAuth } from "../firebase-admin";

export const GET = withAuth(async function (request: AuthRequest) {
  const user = request.user;

  return NextResponse.json({ user });
});
