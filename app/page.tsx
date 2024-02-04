'use client'

import { useState , useEffect, Dispatch, SetStateAction} from 'react'
import { Key, GetCheatKeys } from './lib/dbaccess'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

async function getKeys(setKeys: Dispatch<SetStateAction<Key[] | undefined>>) {
  console.log("local getKyes in...")

  const keys = await GetCheatKeys()

  setKeys(keys)
}

export default function Home() {
  console.log("home start")
  const [keys, setKeys] = useState<Key[] | undefined>(undefined)

  console.log(keys)

  //const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
  const handleSelect = (e) => {
    console.log(JSON.stringify(e))
  }

  useEffect(() => {
    if(keys === undefined) {
      console.log("getKeys Call")
      getKeys(setKeys)
    }
  }, [keys])

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <div>
        <>ポストぐレスに手が届くか？</>
        <>もう、届いとるな。</>
        <Select onValueChange={handleSelect}>
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

      </div>
    </div>
  );
}
