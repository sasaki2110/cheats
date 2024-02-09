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
  id: number,
  no: string,
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

  const keys:Key[] = JSON.parse(JSON.stringify(data.rows))

  return keys;
}

/**
 * 表示用のチートを取得
 * @param key 
 * @returns 
 */
export async function GetDispCheats(key:string) {
  const data = await sql`select id, no, title, cheat from cheats where key = ${key} order by no`

  const cheats:DispCheat[] = JSON.parse(JSON.stringify(data.rows))

  return cheats;
}

/**
 * チートを１レコード挿入
 * @param cheat 
 */
export async function InsCheat(cheat:Cheat) {
  const data = await sql`insert into cheats (key, no, title, cheat) values (${cheat.key}, ${cheat.no}, ${cheat.title}, ${cheat.cheat})`
}

/**
 * チートを一覧用に全件取得
 * @returns 
 */
export async function GetAllCheats() {

  const data = await sql`select * from cheats order by key, no`

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

  if(data.rowCount===0) {
    return undefined
  }

  const cheat:Cheat = JSON.parse(JSON.stringify(data.rows[0]))

  return cheat;
}

/**
 * チートを１行更新
 * @param cheat 
 */
export async function UpdCheat(cheat:Cheat) {

  const data = await sql`update cheats
                            set key=${cheat.key},
                                no=${cheat.no},
                                title=${cheat.title},
                                cheat=${cheat.cheat}
                          where id=${cheat.id.toString()}`

}

/**
 * チートを１行削除
 * @param id 
 * @returns 
 */
export async function DelCheatById(id:string) {

  await sql`delete from cheats where id = ${id}`

  return;
}

