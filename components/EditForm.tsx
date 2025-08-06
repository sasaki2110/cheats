'use client'

import { useFormState } from 'react-dom'
import { Cheat } from '@/app/lib/dbaccess'
import { Textarea } from "@/components/ui/textarea"

type EditFormProps = {
  cheat: Cheat | null | undefined
  insAction: (formData: FormData) => Promise<void>
  updAction: (formData: FormData) => Promise<void>
}

export function EditForm({ cheat, insAction, updAction }: EditFormProps) {
  const action = cheat ? updAction : insAction
  const dispButton = cheat ? "更新" : "登録"

  return (
    <form action={action}>
      <input type="hidden" name="id" defaultValue={cheat?.id} />
      <div className="grid grid-flow-row grid-cols-5 gap-2">
        <div>キー</div>
        <input className="border col-span-4 w-4/5"
               name="key"
               defaultValue={cheat?.key}
        />
        <div>no</div>
        <input className="border col-span-4 w-4/5"
               name="no"
               defaultValue={cheat?.no}
        />
        <div>タイトル</div>
        <input className="border col-span-4 w-4/5"
               name="title"
               defaultValue={cheat?.title}
        />
        <div>チート</div>
        <Textarea className="border col-span-4 w-4/5"
               spellCheck="false"
               name="cheat"
               defaultValue={cheat?.cheat}
        />
      </div>
      <div className="col-span-5 text-center pt-8">
        <button type="submit"
                className="py-2 px-2 mx-1 rounded-lg text-green-700 border border-green-700 hover:shadow-teal-md hover:bg-green-700 hover:text-white transition-all outline-none " >
                {dispButton}
        </button>
      </div>
    </form>
  )
}
