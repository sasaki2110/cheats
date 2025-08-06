'use server'

import { GetDispCheats, DelCheatById, InsCheat, UpdCheat, Cheat } from './dbaccess'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getCheats(key: string) {
  const cheats = await GetDispCheats(key)
  return cheats
}

export async function delCheat(id: string) {
  await DelCheatById(id)
  revalidatePath('/')
}

export async function insCheat(formData: FormData) {
  const cheat: Cheat = {
    id: 0, // dummy
    key: formData.get('key') as string,
    no: formData.get('no') as string,
    title: formData.get('title') as string,
    cheat: formData.get('cheat') as string,
  }
  await InsCheat(cheat)
  revalidatePath('/')
  redirect('/')
}

export async function updCheat(formData: FormData) {
  const cheat: Cheat = {
    id: Number(formData.get('id')),
    key: formData.get('key') as string,
    no: formData.get('no') as string,
    title: formData.get('title') as string,
    cheat: formData.get('cheat') as string,
  }
  await UpdCheat(cheat)
  revalidatePath('/')
  redirect('/')
}
