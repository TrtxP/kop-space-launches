interface EmptyMessageProps {
  message?: string
}

function EmptyMessage({ message }: EmptyMessageProps) {
  return <p className="text-sm text-slate-500 dark:text-slate-400">{message}</p>
}

export default EmptyMessage
