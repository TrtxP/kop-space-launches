import { Link } from "react-router";

function NotFoundPage() {
    return (
        <section className="space-y-3">
            <h2 className="text-2xl font-bold">
                404 - Сторінку не знайдено
            </h2>

            <p>Перевірте адресу або поверніться до дашборду.</p>

           <Link to="/" className="inline-block underline">
              На головну
            </Link>
        </section>
    )
}

export default NotFoundPage