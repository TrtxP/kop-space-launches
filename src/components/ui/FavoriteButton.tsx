import { selectIsFavorite, toggleFavorite } from "../../store/favoritesSlice"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import trashIcon from "../../../assets/iconoir-trash.svg"

interface FavoriteButtonProps {
  id: string
}

function FavoriteButton({ id }: FavoriteButtonProps) {
  const dispatch = useAppDispatch()

  const isFavorite = useAppSelector((state) => selectIsFavorite(state, id))
  const label = isFavorite ? "Видалити з обраного" : "Додати до обраного"

  return (
    <button
      type="button"
      aria-pressed={isFavorite}
      aria-label={label}
      title={label}
      onClick={() => dispatch(toggleFavorite(id))}
      className={`inline-flex size-10 shrink-0 cursor-pointer items-center justify-center
        rounded-lg border transition-colors
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
        ${isFavorite
          ? "border-rose-200 bg-rose-50 hover:border-rose-300 hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950/40 dark:hover:bg-rose-900/60"
          : "border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-600 dark:hover:bg-slate-700 dark:hover:text-blue-400"
        }`}
    >
      {isFavorite ? (
        <img src={trashIcon} alt="" width={20} height={20} className="dark:invert" />
      ) : (
        <span aria-hidden="true" className="text-2xl leading-none">+</span>
      )}
    </button>
  )
}

export default FavoriteButton
