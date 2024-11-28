import { NextResponse } from "next/server";
import { firebaseConfig } from "../../firebase";
import { withAuth } from "../../firebase-admin";

export const GET = withAuth(async function () {
  return NextResponse.json({ firebaseConfig });
});
