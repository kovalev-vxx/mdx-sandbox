import { NextRequest, NextResponse } from 'next/server'
import FileManager from '@/lib/fileManager'

export async function GET(req: NextRequest, res: NextResponse) {
    const path = req.nextUrl.searchParams.get('path')
    if (!path) {
        return NextResponse.json(
            { error: 'The "path" parameter is required' },
            { status: 400 }
        )
    }
    try {
        const result = await FileManager.readDir(path)
        return NextResponse.json({ data: result })
    } catch (e) {
        const error = e as Error
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    const path = req.nextUrl.searchParams.get('path')
    if (!path) {
        return NextResponse.json(
            { error: 'The "path" parameter is required' },
            { status: 400 }
        )
    }
    try {
        await FileManager.createDir(path)
        return NextResponse.json({})
    } catch (e) {
        const error = e as Error
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}
