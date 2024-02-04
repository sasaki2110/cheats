'use client'

import { useState , useEffect, Dispatch, SetStateAction} from 'react'
import { getUsers } from './lib/getUsers'

async function table(setRows: Dispatch<SetStateAction<Row[] | undefined>>) {
  console.log("aaa")

  const response = await getUsers()

  const users = JSON.parse(JSON.stringify(response))

  setRows(users)

  return undefined
}

type Row = {
  id: string,
  name: string,
  email: string,
}

export default function Home() {
  console.log("home start")
  const [rows, setRows] = useState<Row[] | undefined>(undefined)

  useEffect(() => {
    if(rows === undefined) {
      table(setRows)
    }
  }, [rows])

  return (
    <div className="flex min-h-screen flex-col items-center p-24">
      <div>
        <>ポストぐレスに手が届くか？</>
        {rows && rows.map((row) => (
          <div className="mx-2 md:mx-8 my-4 md:my-8 px-2 md:px-8 py-4 md:py-8 bg-gray-800 border rounded-xl" key={row.id}>
            <p className="text-grey-800 text-sm" >{row.name}</p>
            <p className="text-grey-800 text-lg">{row.email}</p>
          </div> 
        ))}
        <>もう、届いとるな。</>
      </div>
    </div>
  );
}
