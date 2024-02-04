'use client'

import { useState , useEffect, Dispatch, SetStateAction} from 'react'
import { Cheat, GetAllCheats } from "@/app/lib/dbaccess"
import Link from "next/link"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

async function getCheats(setCheats: Dispatch<SetStateAction<Cheat[] | undefined>>) {
  console.log("local getCheats in...")

  const cheats = await GetAllCheats()

  setCheats(cheats)
}

/**
 * 主コンポーネント
 * @returns 
 */
export default function Home() {
  console.log("home start")

  // 表示用チートのステート
  const [cheats, setCheats] = useState<Cheat[] | undefined>(undefined)

    // 初期にチートキーを呼び出すエフェクト
    useEffect(() => {
      if(cheats === undefined) {
        console.log("getCheats Call")
        getCheats(setCheats)
      }
    }, [cheats])
  

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
              <TableHead className="text-center min-w-[100px]">キー</TableHead>
              <TableHead className="text-center min-w-[150px]">タイトル</TableHead>
              <TableHead className="text-center min-w-[200px]">チート（先頭20文字）</TableHead>
              <TableHead className="text-center min-w-[60px]">編集</TableHead>
              <TableHead className="text-center min-w-[60px]">削除</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {cheats && cheats.map((cheat) => (
              <TableRow key={cheat.id}>
                <TableCell className="text-left">{cheat.key}</TableCell>
                <TableCell className="text-left">{cheat.title}</TableCell>
                <TableCell className="text-left">{cheat.cheat.slice(0, 20)}</TableCell>
                <TableCell className="text-center">
                  <Link href="/detail/reservation/input" 
                        className="py-2 px-2 rounded-lg text-green-700 border border-green-700 hover:shadow-teal-md hover:bg-green-700 hover:text-white transition-all outline-none " >
                    編集
                  </Link>
                </TableCell>
                <TableCell className="text-center">
                  <Link href="/detail/reservation/input" 
                        className="py-2 px-2 rounded-lg text-green-700 border border-green-700 hover:shadow-teal-md hover:bg-green-700 hover:text-white transition-all outline-none " >
                    削除
                  </Link>
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
        </Table>        
      </div>
    </div>
  );
}
