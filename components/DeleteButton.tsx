'use client'

type DeleteButtonProps = {
  id: string
  action: (id: string) => Promise<void>
}

export function DeleteButton({ id, action }: DeleteButtonProps) {
  const handleClick = () => {
    const isOk = confirm("削除するで？ほんまにいいんか？？？")
    if (isOk) {
      action(id)
      alert("削除したことにしといたる。")
    }
  }

  return (
    <button onClick={handleClick}
            className="py-2 px-2 rounded-lg text-green-700 border border-green-700 hover:shadow-teal-md hover:bg-green-700 hover:text-white transition-all outline-none " >
      削除
    </button>
  )
}
