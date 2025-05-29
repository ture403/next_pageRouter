import { ReactNode } from "react";
import style from "./index.module.css";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import { InferGetServerSidePropsType } from "next";
import fetchReandomBooks from "@/lib/fetch-random-books";

export const getServerSideProps = async () => {
    console.log("SSR 테스트");
    const [allBooks, randomBooks] = await Promise.all([fetchBooks(), fetchReandomBooks()]);
    return {
        props: { allBooks, randomBooks },
    };
};

export default function Home({ allBooks, randomBooks }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    console.log(allBooks);
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
