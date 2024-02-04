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

  const data = await sql`insert into cheats (key, title, cheat) values (${cheat.key}, ${cheat.title}, ${cheat.cheat})`

  console.log(JSON.stringify(data))
}

export async function GetAllCheats(order:string = "", filter:string = "") {
  let orderStr = ""
  let filterStr = ""
  if(order !== "") {
    orderStr = "order by " + order + " "
  }
  if(filter !== "") {
    filterStr = "where key like '%" + filter + "%' "
  }
  console.log("filter = [", filter, "]")
  console.log("order  = [", order , "]")

  //const data = await sql`select * from cheats ${filter} ${order}`
  const data = await sql`select * from cheats`

  console.log("data = [" , data, "]")

  const cheats:Cheat[] = JSON.parse(JSON.stringify(data.rows))

  return cheats;
}