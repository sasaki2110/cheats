// onXXXXを使うとクライアントにせざるを得ない
// 
// 結果、メインの中でawaitが使えない。
// 　　⇒　メインの中からasyncを呼ぶときは、useState を使うはめになる。
//        （待ち合わせできないから、値が入ったらリレンダリングする為。）
// 　　⇒  それを呼ぶのに useEffectを使うはめになる。
// 
'use client'

import { useState , useEffect, Dispatch, SetStateAction} from 'react'
import { Key, GetCheatKeys, Cheat, GetCheatValues } from './lib/dbaccess'

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

async function getCheats(key:string, setCheats: Dispatch<SetStateAction<Cheat[] | undefined>>) {
  console.log("local getCheats in...")

  const cheats = await GetCheatValues(key)

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

  // チートキー用のステート
  const [cheats, setCheats] = useState<Cheat[] | undefined>(undefined)


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
      <div className='w-3/4'>
        <h2>マイチートシート</h2>
        <Select onValueChange={HandleSelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="チートキーを選択してや！" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>チートキー</SelectLabel>

              {keys && keys.map((key) => (
                <SelectItem value={key.key} key={key.key}>{key.key}</SelectItem>
              ))}

              </SelectGroup>
          </SelectContent>
        </Select>

        {cheats && cheats.map((cheat) => (
          <div className="mx-2 md:mx-8 my-4 md:my-8 px-2 md:px-8 py-4 md:py-8 bg-gray-cube border rounded-xl" key={1}>
            <p className="text-grey-cube text-sm" >{cheat.title}</p>
            <Textarea className="text-grey-cube text-lg w-3/4"
                      value={cheat.cheat}
                      />
          </div> 
        ))}

      </div>
    </div>
  );
}
