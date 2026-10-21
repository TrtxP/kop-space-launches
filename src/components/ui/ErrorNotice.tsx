interface ErrorNoticeProps {
  message: string
  onRetry: () => void
  retryDisabled: boolean
}

function ErrorNotice({ message, onRetry, retryDisabled }: ErrorNoticeProps) {
  return (
    <div
      role="alert"
      className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/50 rounded-lg p-4 shadow-sm flex flex-wrap items-center justify-between gap-2 transition-colors"
    >
      <p className="text-sm font-medium text-rose-600 dark:text-rose-400">{message}</p>
      <button
        type="button"
        className="border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg px-3 py-1 text-sm font-medium transition-colors"
        onClick={onRetry}
        disabled={retryDisabled}
      >
        Спробувати ще раз
      </button>
    </div>
  )
}

export default ErrorNotice

