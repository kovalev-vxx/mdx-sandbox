import path from 'node:path'

declare interface IConfig {
    root: string
}

declare interface IDirElement extends path.ParsedPath {
    isFile: boolean
    absolutePath: string
}
