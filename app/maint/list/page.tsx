'use client'

import { useState , useEffect, Dispatch, SetStateAction} from 'react'
import { Cheat, GetAllCheats } from "@/app/lib/dbaccess"
import Link from "next/link"

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
      </div>
    </div>
  );
}
