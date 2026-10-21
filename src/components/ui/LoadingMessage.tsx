interface LoadingMessageProps {
  message?: string
}

function LoadingMessage({ message }: LoadingMessageProps) {
  return (
    <p role="status" className="text-sm text-slate-500 dark:text-slate-400">
      {message}
    </p>
  )
}

export default LoadingMessage
