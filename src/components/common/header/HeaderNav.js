'use client';
import SystemAlert from "@/components/alert/SystemAlert";
import Link from "next/link";
import styles from "./HeaderNav.module.css";
import {SlLogin} from "react-icons/sl";
import {FaUserPlus} from "react-icons/fa";
import {useEffect, useState} from "react";
import {getToken} from "@/app/util/token/token";

function HeaderNav() {
    const [token, setToken] = useState({});

    useEffect(() => {
        getToken().then(
            (res) => {
                setToken(res);
            }
        )
    }, []);


    return (
        <div className={styles.links}>
            {token ?
                <>
                    <SystemAlert userId={1}/>
                    <Link href='/my'>마이페이지</Link>
                </>
                :
                <>
                    <Link href='/login'>로그인</Link>
                    <Link href='/reg'>회원가입</Link>
                    <Link href='/login' className={styles.iconLink}>
                        <SlLogin/>
                    </Link>
                    <Link href='/reg' className={styles.iconLink}>
                        <FaUserPlus size={20}/>
                    </Link>
                </>
            }
        </div>
    );
}

export default HeaderNav;