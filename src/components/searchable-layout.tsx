import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import style from "./searchable-layout.module.css";

export default function SearchableLayout({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [serach, setSearch] = useState("");

    const q = router.query.q as string;

    useEffect(() => {
        setSearch(q || "");
    }, [q]);

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const onSubmit = () => {
        if (!serach || q === serach) return;
        router.push(`/search?q=${serach}`);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            onSubmit();
        }
    };

    return (
        <div>
            <div className={style.searchbar_container}>
                <input
                    onKeyDown={onKeyDown}
                    value={serach}
                    onChange={onChangeSearch}
                    type="text"
                    placeholder="검색어를 입력하세요/."
                />
                <button onClick={onSubmit}>검색</button>
            </div>
            {children}
        </div>
    );
}
