import { NextResponse } from 'next/server'
import axios from "axios"

import { BASE_URL } from "@/config/address"

export async function GET() {
    try {
        const url = `${BASE_URL}/bts?page=1&limit=30&sortBy=24hourPriceChange&sortOrder=-1`

        const apiResponse = await axios.get(url)
        return NextResponse.json({ data: apiResponse.data.data }, { status: 200 })

    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: (err as Error).message || 'An error occurred' }, { status: 500 })
    }
}
