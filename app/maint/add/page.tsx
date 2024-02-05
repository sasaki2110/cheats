// ---------------------------------------------------------------------
// 新規画面
// ---------------------------------------------------------------------

'use client'

import { useState , useEffect, Dispatch, SetStateAction} from 'react'
import Link from "next/link"
import { useSearchParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea"
import { Cheat, InsCheat, UpdCheat, GetCheatById } from '@/app/lib/dbaccess'

async function insCheat(c:Cheat) {
  await InsCheat(c)
}

async function updCheat(c:Cheat) {
  await UpdCheat(c)
}

async function getCheat(id:string, 
                        setDispCheat: Dispatch<SetStateAction<Cheat  | undefined>>,
                        setKey:       Dispatch<SetStateAction<string>>, 
                        setNo:        Dispatch<SetStateAction<string>>, 
                        setTitle:     Dispatch<SetStateAction<string>>, 
                        setCheat:     Dispatch<SetStateAction<string>>
) {
  console.log("local getCheats in...")

  const cheat = await GetCheatById(id)

  if(cheat !== undefined) {
    setDispCheat(cheat)
    setKey(cheat.key)
    setNo(cheat.no)
    setTitle(cheat.title)
    setCheat(cheat.cheat)
  }
}

/**
 * 主コンポーネント
 * @returns 
 */
export default function Home() {
  console.log("home start")

  // 起動パラメータ取得
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  // id===null は新規モード。じゃなければ編集モード
  console.log("id は [", id, "]です")

  let dispTitle:string
  let dispButton:string

  if(id===null) {
    dispTitle = "新規登録"
    dispButton = "登録"
  } else {
    dispTitle = "変更"
    dispButton = "更新"
  }

  // この画面で対象とするチート（新規入力用に初期化）
  const[dispCheat,   setDispCheat]   = useState<Cheat | undefined>( undefined )
  const[key,   setKey]   = useState<string>('')
  const[no,    setNo]    = useState<string>('')
  const[title, setTitle] = useState<string>('')
  const[cheat, setCheat] = useState<string>('')

  // 初期にチートキーを呼び出すエフェクト
  useEffect(() => {
    if(dispCheat===undefined) {
        // 編集モードなら
      if(id!==null) {
          // DB を読み出し表示チートに設定
          console.log("getCheats Call")
          getCheat(id, setDispCheat, setKey, setNo, setTitle, setCheat)
      } else {
        const c:Cheat = {id:0, key:"", no:"", title:"", cheat:""}
        setDispCheat(c)
      }
    }
  }, [dispCheat, id])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let insupd
    if(id === null){
      insupd = "登録"
    } else {
      insupd = "更新"
    }

    const isOk = confirm(insupd + "するで？ほんまにいいんか？？？")

    if(isOk) {
      console.log("key   = [", key, "]")
      console.log("no    = [", no, "]")
      console.log("title = [", title, "]")
      console.log("cheat = [", cheat, "]")

      let updateId = 0
      if(dispCheat!==undefined) updateId = dispCheat.id


      const c:Cheat = {
        id:updateId,
        key:key,
        no:no, 
        title:title,
        cheat:cheat,
      }
      
      if(id === null){
        const ins = insCheat(c)
      } else {
        const upd = updCheat(c)
      }

      alert(insupd + "したことにしといたるか。")
    }
  }

  const handleChangeKey = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.target.value);
  };
  const handleChangeNo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNo(e.target.value);
  };
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleChangeCheat = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCheat(e.target.value);
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-24 ">
      <div className='w-4/5'>
        <h2>マイチートシート {dispTitle}</h2>
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
                   defaultValue={dispCheat && dispCheat.key}
                   onChange={handleChangeKey}
            />
            <div>no</div>
            <input className="border col-span-4 w-4/5"
                   name="no"
                   defaultValue={dispCheat && dispCheat.no}
                   onChange={handleChangeNo}
            />
            <div>タイトル</div>
            <input className="border col-span-4 w-4/5"
                   name="title"
                   defaultValue={dispCheat && dispCheat.title}
                   onChange={handleChangeTitle}
            />
            <div>チート</div>
            <Textarea className="border col-span-4 w-4/5"
                   spellCheck="false"
                   name="cheat"
                   defaultValue={dispCheat && dispCheat.cheat}
                   onChange={handleChangeCheat}
            />

          </div>
          <div className="col-span-5 text-center pt-8">
            <button type="submit"
                    className="py-2 px-2 mx-1 rounded-lg text-green-700 border border-green-700 hover:shadow-teal-md hover:bg-green-700 hover:text-white transition-all outline-none " >
                    {dispButton}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
