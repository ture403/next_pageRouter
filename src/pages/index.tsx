import { ReactNode } from "react";
import style from "./index.module.css";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import { InferGetStaticPropsType } from "next";
import fetchRandomBooks from "@/lib/fetch-random-books";

export const getStaticProps = async () => {
    console.log("인덱스 페이지");
    const [allBooks, randomBooks] = await Promise.all([fetchBooks(), fetchRandomBooks()]);
    return {
        props: { allBooks, randomBooks },
    };
};

export default function Home({ allBooks, randomBooks }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                {randomBooks.map((book) => (
                    <BookItem key={book.id} {...book} />
                ))}
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                {allBooks.map((book) => (
                    <BookItem key={book.id} {...book} />
                ))}
            </section>
        </div>
    );
}

Home.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>;
};
