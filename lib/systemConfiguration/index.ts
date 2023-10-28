import path from 'node:path'
import FileManager from '@/lib/fileManager'

const CONFIG_FILENAME = 'mdx-sandbox.config.json'
const SERVICE_ROOT = process.cwd()

let index: SystemConfiguration | null = null

class SystemConfiguration {
    readonly userRoot: string
    readonly config: IConfig

    private constructor(config: IConfig) {
        this.config = config
        this.userRoot = config.root
    }

    public static async run() {
        const config = await this.createConfig()
        return new SystemConfiguration(config)
    }

    private static async createConfig() {
        try {
            const file = await FileManager.readFile(
                path.join(SERVICE_ROOT, CONFIG_FILENAME)
            )
            return JSON.parse(file) as IConfig
        } catch (e) {
            const config: IConfig = { root: '' }
            await FileManager.writeFile(
                path.join(SERVICE_ROOT, CONFIG_FILENAME),
                JSON.stringify(config, null, 4)
            )
            return config
        }
    }
}

export default async function getSystemConfiguration() {
    if (index === null) {
        index = await SystemConfiguration.run()
    }
    return index
}
