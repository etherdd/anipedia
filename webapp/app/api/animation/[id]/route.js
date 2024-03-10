import { NextResponse } from "next/server";

export async function GET(request, {params}) {
  return NextResponse.json({title: "Wind", id: params.id});
}