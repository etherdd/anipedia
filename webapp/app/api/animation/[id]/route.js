import { NextResponse } from "next/server";

// Get information of a specific animation.
export async function GET(request, {params}) {
  return NextResponse.json({title: "Wind", id: params.id});
}