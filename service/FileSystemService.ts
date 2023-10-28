import API from '@/service'
import { IDirElement } from '@/types/globals'

type getFileReturnType = {
    data: string
}

type getDirReturnType = {
    data: { path: string; content: IDirElement[] }
}

export default class FileSystemService {
    public static async getFile(path: string) {
        const res = await API.get<getFileReturnType>('api/fs/file', {
            params: { path },
        })
        return String(res.data)
    }

    public static async getDir(path: string) {
        const res = await API.get<getDirReturnType>('api/fs/dir', {
            params: { path },
        })
        return res.data
    }
}
