'use client'

import { useState } from 'react'
import { Key, DispCheat } from '@/app/lib/dbaccess'
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

type CheatSheetProps = {
  keys: Key[] | undefined
  getCheats: (key: string) => Promise<DispCheat[] | undefined>
  delCheat: (id: string) => Promise<void>
}

export function CheatSheet({ keys, getCheats, delCheat }: CheatSheetProps) {
  const [cheats, setCheats] = useState<DispCheat[] | undefined>(undefined)

  const handleSelect = async (key: string) => {
    const newCheats = await getCheats(key)
    setCheats(newCheats)
  }

  const handleClick = async (id: string) => {
    const isOk = confirm("削除するで？ほんまにいいんか？？？")
    if (isOk) {
      await delCheat(id)
      // Optimistic UI update
      setCheats((prevCheats) => prevCheats?.filter((cheat) => cheat.id.toString() !== id))
      alert("削除したことにしといたる。")
    }
  }

  return (
    <>
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
          <div className="grid justify-between grid-flow-col">
            <p className="text-grey-cube text-xl" >{cheat.no + ". " + cheat.title}</p>
            <div>
              <p className="text-grey-cube text-sm" >登録日：{cheat.created_at}</p>
              <p className="text-grey-cube text-sm" >更新日：{cheat.updated_at}</p>
            </div>
          </div>
          <Textarea className="text-base mt-1 w-100%"
                    value={cheat.cheat}
                    spellCheck="false"
                    readOnly
                    />
          <div className="text-right pt-5">
            <button onClick={() => handleClick(cheat.id.toString())}
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
    </>
  )
}
