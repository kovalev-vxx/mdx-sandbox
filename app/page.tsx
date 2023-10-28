import ConfigModal from '@/components/ConfigModal/ConfigModal'
import getSystemConfiguration from '@/lib/systemConfiguration'
import Explorer from '@/components/Explorer/Explorer'
import IconManager from '@/utils/IconManager'

export default async function Home() {
    const a = await getSystemConfiguration()
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            Hello world! Конфиг: {JSON.stringify(a.config)}
            <Explorer />
            {/*<ConfigModal config={a.config} />*/}
        </main>
    )
}
