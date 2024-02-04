'use server'

import { sql } from '@vercel/postgres'
import { QueryResultRow } from '@vercel/postgres'

export async function getUsers() {
  const data = await sql`SELECT * FROM users where name like '%o%'`
  console.log("data = [" , data, "]")

  const users = data.rows

  /*
  const users = [
    {id:"1", name:"hoge", email:"hogemail"},
    {id:"2", name:"fuga", email:"fugamail"},
    {id:"3", name:"oii", email:"oiimail"},
  ]
  */
  return users;
}