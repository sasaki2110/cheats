import { GetCheatKeys } from '@/app/lib/dbaccess'
import { getCheats, delCheat } from '@/app/lib/actions'
import Link from "next/link"
import { CheatSheet } from '@/components/CheatSheet'

/**
 * 主コンポーネント
 * @returns
 */
export default async function Home() {
  // チートキー用のステート
  const keys = await GetCheatKeys()

  return (
    <div className="flex min-h-screen flex-col items-center p-24 ">
      <div className='w-4/5'>
        <div className="text-xl">マイチートシート</div>
        <div className="py-2 my-1 px-4 mb-4 bg-gray-50 border rounded-xl">
          <div>日々の作業でコピペするコマンドやコーディング例、ハマりポイントなどを技術スタック別に記述していく。</div>
          <div>主目的は、生産性を高めるためにコピペする参考をすぐに探す事で、ナレッジの蓄積は二次的目的。</div>
          <div>最終的には、ユーザー別でナレッジやチートを登録し、それを複数ユーザーが共有し、他人の良い知見を学ぶ（パクる）土台にできれば・・・・</div>
        </div>
        <div className='text-right'>
          <Link href="/maint/add"
                className="py-2 px-2 mx-1 rounded-lg text-green-700 border border-green-700 hover:shadow-teal-md hover:bg-green-700 hover:text-white transition-all outline-none " >
                新規登録
          </Link>
        </div>
        <CheatSheet keys={keys} getCheats={getCheats} delCheat={delCheat} />
      </div>
    </div>
  );
}
