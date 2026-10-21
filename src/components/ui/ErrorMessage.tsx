interface ErrorMessageProps {
    message: string
}

function ErrorMesage({ message }: ErrorMessageProps) {
    return <p className="text-sm font-medium text-rose-600 dark:text-rose-400">{message}</p>
}

export default ErrorMesage