
import { sql } from '@vercel/postgres'
import { QueryResultRow } from '@vercel/postgres'

async function table():Promise<QueryResultRow[] | undefined> {
  console.log("aaa")

  let data

  try{
    console.log("bbb")
    const data = await sql`SELECT * FROM users where name like '%o%'`
    const rows = data.rows
    console.log("ccc")
    console.log(JSON.stringify(data))
    return rows

  } catch (e: any) {
    console.log("ddd")
    console.log(JSON.stringify(e))

    return undefined
  }

  return undefined
}


export default async function Home() {
  const rows = await table()
  if(rows === undefined) {
    return(<main>ないわー</main>)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <p>{process.env.ENV_CHECK}</p>
      <p>ポストぐレスに手が届くか？</p>
      {rows.map((row) => (
        <div className="mx-2 md:mx-8 my-4 md:my-8 px-2 md:px-8 py-4 md:py-8 bg-gray-cube border rounded-xl" key={1}>
          <p className="text-grey-cube text-sm" >{row.name}</p>
          <p className="text-grey-cube text-lg">{row.email}</p>
        </div> 
      ))}
    </main>
  );
}
