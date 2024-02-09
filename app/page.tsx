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

import { useState , useEffect, Dispatch, SetStateAction } from 'react'
import { Key, GetCheatKeys, DispCheat, GetDispCheats, DelCheatById } from '@/app/lib/dbaccess'
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
  const keys = await GetCheatKeys()

  setKeys(keys)
}

/**
 * 表示用チートを取得
 * @param key 
 * @param setCheats 
 */
async function getCheats(key:string, setCheats: Dispatch<SetStateAction<DispCheat[] | undefined>>) {
  const cheats = await GetDispCheats(key)

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
  // チートキー用のステート
  const [keys, setKeys] = useState<Key[] | undefined>(undefined)

  // 表示用チートのステート
  const [cheats, setCheats] = useState<DispCheat[] | undefined>(undefined)

  // セレクトが選択された時のハンドラ
  const handleSelect = (e:string) => {
    // ここでチートを呼び出し、画面表示
    getCheats(e, setCheats)
  }

  // 初期にチートキーを呼び出すエフェクト
  useEffect(() => {
    if(keys === undefined) {
      getKeys(setKeys)
    }
  }, [keys])

  // 削除ボタンクリック時のハンドラ
  const handleClick = (e:any) => {
                       
    // ここでチートを呼び出し、画面表示
    if(e !== undefined) {
      const id = e.target.id

      delCheat(id)

      setCheats(() => {
        let newCheats:DispCheat[] | undefined = undefined
        
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
        <div>マイチートシート</div>
        <div>これは正解でも道しるべでもない。おれが試行して失敗して、最後に残った使えそうなもの。</div>
        <div>誰かが、いつか、俺の屍を踏み越えて行く肥しになれば・・・・</div>
        <div className='text-right'>
          <Link href="/maint/add" 
                className="py-2 px-2 mx-1 rounded-lg text-green-700 border border-green-700 hover:shadow-teal-md hover:bg-green-700 hover:text-white transition-all outline-none " >
                新規登録
          </Link>
          {/* 
          <Link href="/maint/list" 
                className="py-2 px-2 rounded-lg text-green-700 border border-green-700 hover:shadow-teal-md hover:bg-green-700 hover:text-white transition-all outline-none " >
                管理画面
          </Link>
          */}
        </div>
        <div className='mt-4 w-4/5'>
          <Select onValueChange={handleSelect} >
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
          <div className="mx-2 md:mx-8 my-4 md:my-8 px-2 md:px-8 py-4 md:py-8 bg-gray-50 border rounded-xl" key={cheat.id}>
            <p className="text-grey-cube text-sm" >{cheat.no + ". " + cheat.title}</p>
            <Textarea className="text-base mt-1 w-100%"
                      value={cheat.cheat}
                      spellCheck="false"
                      />
            <div className="text-right pt-5">
              <button id={cheat.id.toString()}
                      name={cheat.id.toString()}
                      onClick={handleClick}
                      className="py-2 px-2 rounded-lg text-green-700 border border-green-700 hover:shadow-teal-md hover:bg-green-700 hover:text-white transition-all outline-none " >
                    削除
              </button>
              　
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
