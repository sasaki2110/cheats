import Link from "next/link"
import { GetCheatById } from '@/app/lib/dbaccess'
import { EditForm } from '@/components/EditForm'
import { insCheat, updCheat } from '@/app/lib/actions'

export const dynamic = 'force-dynamic'

type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ searchParams }: PageProps) {
  const id = searchParams.id as string | undefined

  let cheat = null
  if (id) {
    cheat = await GetCheatById(id)
  }

  const dispTitle = id ? "変更" : "新規登録"

  return (
    <div className="flex min-h-screen flex-col items-center p-24 ">
      <div className='w-4/5'>
        <h2>マイチートシート {dispTitle}</h2>
        <div className='text-right'>
          <Link href="/"
                className="py-2 px-2 mx-1 rounded-lg text-green-700 border border-green-700 hover:shadow-teal-md hover:bg-green-700 hover:text-white transition-all outline-none " >
                戻る
          </Link>
        </div>
        <EditForm cheat={cheat} insAction={insCheat} updAction={updCheat} />
      </div>
    </div>
  );
}
