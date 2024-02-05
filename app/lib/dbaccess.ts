// DBアクセスは async/await を使いたいから、別ファイルに切り出して、サーバーサイドで実行
'use server'

// vercel postgres 用のインポート
import { sql } from '@vercel/postgres'

// クエリー結果の型宣言
// チートキー型
export type Key = {
  key: string,
}

// 表示用チート型
export type DispCheat = {
  title: string,
  cheat: string,
}

// チート型
export type Cheat = {
  id: number,
  key: string,
  no: string,
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

/**
 * 表示用のチートを取得
 * @param key 
 * @returns 
 */
export async function GetDispCheats(key:string) {
  console.log("111 key = [" + key + "]")
  const data = await sql`select title, cheat from cheats where key = ${key}`
  console.log("222")
  console.log("data = [" , data, "]")

  const cheats:DispCheat[] = JSON.parse(JSON.stringify(data.rows))

  return cheats;
}

/**
 * チートを１レコード挿入
 * @param cheat 
 */
export async function InsCheat(cheat:Cheat) {
  console.log("cheat = [", JSON.stringify(cheat), "]")

  const data = await sql`insert into cheats (key, no, title, cheat) values (${cheat.key}, ${cheat.no}, ${cheat.title}, ${cheat.cheat})`

  console.log(JSON.stringify(data))
}

/**
 * チートを一覧用に全件取得
 * @returns 
 */
export async function GetAllCheats() {

  const data = await sql`select * from cheats order by key, no`

  console.log("data = [" , data, "]")

  const cheats:Cheat[] = JSON.parse(JSON.stringify(data.rows))

  return cheats;
}

/**
 * チートを主キーで１件取得
 * @param id 
 * @returns 
 */
export async function GetCheatById(id:string) {

  const data = await sql`select * from cheats where id = ${id}`

  console.log("data = [" , data, "]")

  if(data.rowCount===0) {
    return undefined
  }

  const cheat:Cheat = JSON.parse(JSON.stringify(data.rows[0]))

  return cheat;
}