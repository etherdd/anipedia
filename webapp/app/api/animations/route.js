import { NextResponse } from "next/server";

// Search animations.
export async function GET(request, {params}) {

  const animations = [
    {
      path: "/sgheSKxZkttIe8ONsf2sWXPgip3.jpg",
      title: "Monsters, Inc."
    },
    {
      path: "/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg",
      title: "Toy Story"
    },
    {
      path: "/sKCr78MXSLixwmZ8DyJLrpMsd15.jpg",
      title: "The Lion King"
    },
    {
      path: "/kgwjIb2JDHRhNk13lmSxiClFjVk.jpg",
      title: "Frozen"
    },
    {
      path: "/dyhaB19AICF7TO7CK2aD6KfymnQ.jpg",
      title: "Shrek"
    },
  ]

  return NextResponse.json(animations);
}