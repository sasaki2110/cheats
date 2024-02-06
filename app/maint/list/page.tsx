// ---------------------------------------------------------------------
// 一覧画面
// ---------------------------------------------------------------------

'use client'

import { useState , useEffect, Dispatch, SetStateAction, MouseEventHandler} from 'react'
import { Cheat, DelCheatById, GetAllCheats } from "@/app/lib/dbaccess"
import Link from "next/link"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
/**
 * チートを全件取得
 * @param setCheats 
 */
async function getCheats(setCheats: Dispatch<SetStateAction<Cheat[] | undefined>>) {
  const cheats = await GetAllCheats()

  setCheats(cheats)
}

/**
 * １行削除
 * @param id 
 */
async function delCheat(id:string) {
  const isOk = confirm("削除するで？ほんまにいいんか？？？")
  if(isOk) {
     await DelCheatById(id)
     alert("削除したことにしといたる。")
  }
}

/**
 * 主コンポーネント
 * @returns 
 */
export default function Home() {
  // 表示用チートのステート
  const [cheats, setCheats] = useState<Cheat[] | undefined>(undefined)

  // 初期にチートキーを呼び出すエフェクト
  useEffect(() => {
    if(cheats === undefined) {
      getCheats(setCheats)
    }
  }, [cheats])

  // 削除ボタンクリック時のハンドラ
  const handleClick = (e:any) => {
                       
    // ここでチートを呼び出し、画面表示
    if(e !== undefined) {
      const id = e.target.id

      delCheat(id)

      setCheats(() => {
        let newCheats:Cheat[] | undefined = undefined
        
        if(cheats !== undefined) {
          newCheats = cheats.slice(0, cheats.length)
          if(newCheats !== undefined) {
            newCheats.forEach((item, index) => {
              if(item.id.toString() === id.toString()) {
                  if(newCheats !== undefined) newCheats.splice(index, 1);
              }
            });
          }
        }

        return newCheats
      })
    }
  }

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
                  <button id={cheat.id.toString()}
                          name={cheat.id.toString()}
                        onClick={handleClick}
                        className="py-2 px-2 rounded-lg text-green-700 border border-green-700 hover:shadow-teal-md hover:bg-green-700 hover:text-white transition-all outline-none " >
                    削除
                  </button>
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
        </Table>        
      </div>
    </div>
  );
}
