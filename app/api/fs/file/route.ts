import FileManager from '@/lib/fileManager'
import { NextRequest, NextResponse } from 'next/server'

/**
 * @swagger
 * /api/fs/file:
 *   get:
 *     description: Get the content of a file.
 *     parameters:
 *       - name: path
 *         in: query
 *         description: The path of the file to read.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with the file content.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: The content of the file.
 *       400:
 *         description: Bad request error if the "path" parameter is missing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error description.
 *       500:
 *         description: Internal server error when reading the file.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error description.
 */
export async function GET(req: NextRequest, res: NextResponse) {
    const path = req.nextUrl.searchParams.get('path')
    if (!path) {
        return NextResponse.json(
            { error: 'The "path" parameter is required' },
            { status: 400 }
        )
    }

    try {
        const output = await FileManager.readFile(path)
        return NextResponse.json({ data: output })
    } catch (e) {
        return NextResponse.json(
            { error: 'Error reading file' },
            { status: 500 }
        )
    }
}

/**
 * @swagger
 * /api/fs/file:
 *   post:
 *     description: Write content to a file.
 *     parameters:
 *       - name: path
 *         in: query
 *         description: The path of the file to write.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: The content to write to the file.
 *       required: true
 *       content:
 *         application/octet-stream:
 *           schema:
 *             type: string
 *     responses:
 *       200:
 *         description: Successful response indicating the file was written successfully.
 *       400:
 *         description: Bad request error if the "path" parameter is missing.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error description.
 *       500:
 *         description: Internal server error when writing the file.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error description.
 */
export async function POST(req: NextRequest, res: NextResponse) {
    const path = req.nextUrl.searchParams.get('path')
    const content = await req.text()
    if (!path) {
        return NextResponse.json(
            { error: 'The "path" parameter is required' },
            { status: 400 }
        )
    }

    try {
        await FileManager.writeFile(path, content)
        return NextResponse.json({}, { status: 200 })
    } catch (e) {
        return NextResponse.json(
            { error: 'Error writing file' },
            { status: 500 }
        )
    }
}
