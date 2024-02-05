// ---------------------------------------------------------------------
// 初期画面
// ---------------------------------------------------------------------


// onXXXXを使うとクライアントにせざるを得ない
// 
// 結果、メインの中でawaitが使えない。
// 　　⇒　メインの中からasyncを呼ぶときは、useState を使うはめになる。
//        （待ち合わせできないから、値が入ったらリレンダリングする為。）
// 　　⇒  それを呼ぶのに useEffectを使うはめになる。
// 
'use client'

import { useState , useEffect, Dispatch, SetStateAction} from 'react'
import { Key, GetCheatKeys, DispCheat, GetDispCheats } from '@/app/lib/dbaccess'
import Link from "next/link"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Textarea } from "@/components/ui/textarea"

/**
 * 内部でのキー取得処理（awaitで呼び出すための踏み台）
 * ここは別に待ち合わせ出来ないから、promiseでも良い。
 * @param setKeys 
 */
async function getKeys(setKeys: Dispatch<SetStateAction<Key[] | undefined>>) {
  console.log("local getKyes in...")

  const keys = await GetCheatKeys()

  setKeys(keys)
}

async function getCheats(key:string, setCheats: Dispatch<SetStateAction<DispCheat[] | undefined>>) {
  console.log("local getCheats in...")

  const cheats = await GetDispCheats(key)

  setCheats(cheats)
}

/**
 * 主コンポーネント
 * @returns 
 */
export default function Home() {
  console.log("home start")

  // チートキー用のステート
  const [keys, setKeys] = useState<Key[] | undefined>(undefined)

  // 表示用チートのステート
  const [cheats, setCheats] = useState<DispCheat[] | undefined>(undefined)


  // セレクトが選択された時のハンドラ
  const HandleSelect = (e:string) => {
    // ここでチートを呼び出し、画面表示
    console.log(e)
    console.log("getKeys Call")
    getCheats(e, setCheats)
  }

  // 初期にチートキーを呼び出すエフェクト
  useEffect(() => {
    if(keys === undefined) {
      console.log("getKeys Call")
      getKeys(setKeys)
    }
  }, [keys])

  return (
    <div className="flex min-h-screen flex-col items-center p-24 ">
      <div className='w-4/5'>
        <div>マイチートシート</div>
        <div>誰かが、いつか、俺の屍を踏み越えて行く肥しになれば・・・・</div>
        <div className='text-right'>
          <Link href="/maint/list" 
                className="py-2 px-2 rounded-lg text-green-700 border border-green-700 hover:shadow-teal-md hover:bg-green-700 hover:text-white transition-all outline-none " >
                管理画面
          </Link>
        </div>
        <div className='mt-4 w-4/5'>
          <Select onValueChange={HandleSelect} >
            <SelectTrigger>
              <SelectValue placeholder="知りたい技術スタックここにある？"/>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>技術スタックを選択</SelectLabel>

                {keys && keys.map((key) => (
                  <SelectItem value={key.key} key={key.key}>{key.key}</SelectItem>
                ))}

                </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {cheats && cheats.map((cheat) => (
          <div className="mx-2 md:mx-8 my-4 md:my-8 px-2 md:px-8 py-4 md:py-8 bg-gray-cube border rounded-xl" key={1}>
            <p className="text-grey-cube text-sm" >{cheat.title}</p>
            <Textarea className="text-base mt-1 w-100%"
                      value={cheat.cheat}
                      spellCheck="false"
                      />
            <div className="text-right pt-3">
              <Link href={{pathname:"/maint/add", query:{id:cheat.id.toString()}}} 
                    className="py-2 px-2 rounded-lg text-green-700 border border-green-700 hover:shadow-teal-md hover:bg-green-700 hover:text-white transition-all outline-none " >
                    編集
              </Link>
            </div>
          </div> 
        ))}

      </div>
    </div>
  );
}
