"use client"
import { useRouter } from "next/navigation";
import { useRef } from "react";
import styles from "./Header.module.css";

function HeaderSearch() {
    const router = useRouter();

    const inputRef = useRef(null);

    const handleIconClick = () => {
        const searchTerm = inputRef.current.value;
        router.push(`/search?keyword=${searchTerm}`);
    }

    return (
        <div className={styles.bar}>
            <input 
                type='text' 
                className={styles.input} 
                placeholder='검색어를 입력하세요'
                ref={inputRef}
            />
            <button onClick={handleIconClick}><i className={styles.icon}></i></button>
        </div>
    );
}

export default HeaderSearch;