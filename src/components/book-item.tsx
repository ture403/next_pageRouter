import Link from "next/link";
import style from "./book-item.module.css";
import { BookData } from "@/types";

export default function BookItem({ id, title, subTitle, author, publisher, coverImgUrl }: BookData) {
    return (
        <Link href={`/book/${id}`} className={style.container}>
            <img src={coverImgUrl} alt={title} />
            <div>
                <div className={style.title}>{title}</div>
                <div className={style.subTitle}>{subTitle}</div>
                <div className={style.author}>
                    {author} | {publisher}
                </div>
            </div>
        </Link>
    );
}
