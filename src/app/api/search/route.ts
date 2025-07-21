import { NextResponse } from "next/server"
import Product from "@/models/Product"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("q")

  if (!query) return NextResponse.json([])

  const results = await Product.find(
    { $text: { $search: query } },
    { score: { $meta: "textScore" } }
  ).sort({ score: { $meta: "textScore" } })

  return NextResponse.json(results)
}