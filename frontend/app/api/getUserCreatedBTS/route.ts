import { NextResponse } from "next/server"
import axios from "axios"

import { BASE_URL } from "@/config/address"

export async function POST(request: Request) {
  try {
    const { address } = await request.json()
    const url = `${BASE_URL}/portfolio/created-bts?address=${address}`
    const apiResponse = await axios.get(url)

    return NextResponse.json({ data: apiResponse.data.data }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: (err as Error).message || "An error occurred" },
      { status: 500 }
    )
  }
}
