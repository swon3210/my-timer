import { NextResponse } from "next/server";
import { firebaseConfig } from "../../../../lib/firebase";
import { withAuth } from "../../firebase-admin";

export const GET = withAuth(async function () {
  return NextResponse.json({ firebaseConfig });
});
