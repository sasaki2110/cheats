'use client'

import Link from "next/link"

/**
 * 主コンポーネント
 * @returns 
 */
export default function Home() {
  console.log("home start")

  return (
    <div className="flex min-h-screen flex-col items-center p-24 ">
      <div className='w-4/5'>
        <h2>マイチートシート 新規登録</h2>
        <div className='text-right'>
          <Link href="/maint/list" 
                className="py-2 px-2 mx-1 rounded-lg text-green-700 border border-green-700 hover:shadow-teal-md hover:bg-green-700 hover:text-white transition-all outline-none " >
                戻る
          </Link>
        </div>
        <form>
            <div className="grid grid-flow-row grid-cols-5 gap-2">
            <div>aaa</div>
            <input className="border col-span-4 w-4/5"/>
            <div>bbb</div>
            <input className="border col-span-4 w-4/5"/>
            </div>
            <div className="col-span-5 text-center pt-8">
              <button type="submit"
                      className="py-2 px-2 mx-1 rounded-lg text-green-700 border border-green-700 hover:shadow-teal-md hover:bg-green-700 hover:text-white transition-all outline-none " >
                      登録
              </button>
            </div>
        </form>
      </div>
    </div>
  );
}
