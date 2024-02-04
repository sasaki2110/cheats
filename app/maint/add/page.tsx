'use client'

import { useState } from "react";
import Link from "next/link"
import { Textarea } from "@/components/ui/textarea"

/**
 * 主コンポーネント
 * @returns 
 */
export default function Home() {
  console.log("home start")

  const[key,   setKey]   = useState<string>('')
  const[title, setTitle] = useState<string>('')
  const[cheat, setCheat] = useState<string>('')

  // type event as React.FormEvent<HTMLFormElement>
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent page refresh
    event.preventDefault();

    console.log("key   = [", key, "]")
    console.log("title = [", title, "]")
    console.log("cheat = [", cheat, "]")
  };

  const handleChangeKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    // useStateの第二引数のメソッドを書く
    // この中に引数[e]が入ってきて保存される
    setKey(e.target.value);
  };
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    // useStateの第二引数のメソッドを書く
    // この中に引数[e]が入ってきて保存される
    setTitle(e.target.value);
  };
  const handleChangeCheat = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // useStateの第二引数のメソッドを書く
    // この中に引数[e]が入ってきて保存される
    setCheat(e.target.value);
  };


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
        <form onSubmit={handleSubmit}>
          <div className="grid grid-flow-row grid-cols-5 gap-2">
            <div>キー</div>
            <input className="border col-span-4 w-4/5"
                   name="key"
                   onChange={handleChangeKey}
            />
            <div>タイトル</div>
            <input className="border col-span-4 w-4/5"
                   name="title"
                   onChange={handleChangeTitle}
            />
            <div>チート</div>
            <Textarea className="border col-span-4 w-4/5"
                   name="cheat"
                   onChange={handleChangeCheat}
            />

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
