// DBアクセスは async/await を使いたいから、別ファイルに切り出して、サーバーサイドで実行
'use server'

// vercel postgres 用のインポート
import { sql } from '@vercel/postgres'

// クエリー結果の型宣言
// チートキー型
export type Key = {
  key: string,
}

// チート型
export type Cheat = {
  title: string,
  cheat: string,
}

/**
 * チートのキーをdistinctで取得
 */
export async function GetCheatKeys() {
  const data = await sql`select distinct key from cheats order by key`
  console.log("data = [" , data, "]")

  const keys:Key[] = JSON.parse(JSON.stringify(data.rows))

  return keys;
}

export async function GetCheatValues(key:string) {
  console.log("111 key = [" + key + "]")
  const data = await sql`select title, cheat from cheats where key = ${key}`
  console.log("222")
  console.log("data = [" , data, "]")

  const cheats:Cheat[] = JSON.parse(JSON.stringify(data.rows))

  return cheats;
}