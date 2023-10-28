import path from 'node:path'
import { promises as fsPromises } from 'fs'
import os from 'os'
import { IDirElement } from '@/types/globals'

function dirSort(a: IDirElement, b: IDirElement) {
    if (a.isFile && !b.isFile) {
        return 1
    } else if (!a.isFile && b.isFile) {
        return -1
    } else {
        return a.name.localeCompare(b.name)
    }
}

export default class FileManager {
    public static async readDir(dirPath?: string) {
        const _path = dirPath || os.homedir()
        const files = await fsPromises
            .readdir(_path)
            .then((res) => res.map((file) => path.resolve(_path, file)))

        const parsedFiles = await Promise.all(
            files.map(async (file) => {
                const stat = await fsPromises.lstat(file)
                const parsedFile = path.parse(file)
                return {
                    ...parsedFile,
                    isFile: stat.isFile(),
                    absolutePath: path.join(parsedFile.dir, parsedFile.base),
                } as IDirElement
            })
        )

        return {
            path: path.resolve(_path),
            content: parsedFiles.sort(dirSort),
        }
    }

    public static async createDir(dirPath: string) {
        try {
            await fsPromises.access(dirPath)
        } catch (e) {
            // @ts-ignore
            if (e.code === 'ENOENT') {
                await fsPromises.mkdir(dirPath, { recursive: true })
            }
        }
    }

    public static async readFile(filePath: string) {
        return await fsPromises.readFile(path.join(filePath), 'utf-8')
    }

    public static async writeFile(filePath: string, data: string) {
        await fsPromises.writeFile(path.join(filePath), data)
        return data
    }
}
