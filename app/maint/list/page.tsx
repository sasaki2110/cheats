import { GetAllCheats } from "@/app/lib/dbaccess"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DeleteButton } from "@/components/DeleteButton"
import { delCheat } from "@/app/lib/actions"

export default async function ListPage() {
  const cheats = await GetAllCheats()

  return (
    <div className="flex min-h-screen flex-col items-center p-24 ">
      <div className='w-4/5'>
        <h2>マイチートシート 一覧</h2>
        <div className='text-right'>
          <Link href="/maint/add"
                className="py-2 px-2 mx-1 rounded-lg text-green-700 border border-green-700 hover:shadow-teal-md hover:bg-green-700 hover:text-white transition-all outline-none " >
                新規登録
          </Link>
          <Link href="/"
                className="py-2 px-2 mx-1 rounded-lg text-green-700 border border-green-700 hover:shadow-teal-md hover:bg-green-700 hover:text-white transition-all outline-none " >
                戻る
          </Link>
        </div>

        <Table className='mt-4'>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center min-w-[80px]" >キー</TableHead>
              <TableHead className="text-center min-w-[30px]" >no</TableHead>
              <TableHead className="text-center min-w-[150px]">タイトル</TableHead>
              <TableHead className="text-center min-w-[100px]">チート（先頭20文字）</TableHead>
              <TableHead className="text-center min-w-[60px]" >編集</TableHead>
              <TableHead className="text-center min-w-[60px]" >削除</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {cheats && cheats.map((cheat) => (
              <TableRow key={cheat.id}>
                <TableCell className="text-left">{cheat.key}</TableCell>
                <TableCell className="text-right">{cheat.no}</TableCell>
                <TableCell className="text-left">{cheat.title}</TableCell>
                <TableCell className="text-left">{cheat.cheat.slice(0, 20)}</TableCell>
                <TableCell className="text-center">
                  <Link href={{pathname:"/maint/add", query:{id:cheat.id}}}
                        className="py-2 px-2 rounded-lg text-green-700 border border-green-700 hover:shadow-teal-md hover:bg-green-700 hover:text-white transition-all outline-none " >
                    編集
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  <DeleteButton id={cheat.id.toString()} action={delCheat} />
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
        </Table>
      </div>
    </div>
  );
}
