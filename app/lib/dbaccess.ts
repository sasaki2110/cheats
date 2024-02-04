'use server'

import { sql } from '@vercel/postgres'

export type Key = {
  key: string,
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

