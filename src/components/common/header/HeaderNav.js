'use client';
import { getToken } from "@/app/util/token/token";
import SystemAlert from "@/components/alert/SystemAlert";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { SlLogin } from "react-icons/sl";
import styles from "./HeaderNav.module.css";

function HeaderNav() {
    const [userId, setUserId] = useState(0);
    const [userRole, setUserRole] = useState(0);
    const eventSource = useRef(null);
    const [alerts, setAlerts] = useState([]);
    const [newAlert, setNewAlert] = useState(false);
    const [isToken, setIsToken] = useState(false);
    const router = useRouter();

    useEffect(() => {
        getToken().then(
            (res) => {
                setUserId(res?.USIDX);
                setUserRole(res?.ROLE);
            }
        )
    }, []);


    const fetchAlerts = async () => {
        try {
            const response = await fetch(`/api/alert?usIdx=${userId}`);
            const data = await response.json();
            setAlerts(data);
            for(let i = 0; i < data.length; i++) {
                if(data[i].alIsRead === 0)
                    setNewAlert(true);
            }
        } catch (error) {
            console.error('Error fetching alerts:', error);
        }
    };

    useEffect(() => {
        if (userId > 0) {
            eventSource.current = new EventSource(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/api/alert/subscribe/${userId}`, { withCredentials: true });

            eventSource.current.onopen = (event) => {
                console.log("SSE OPEN", event);
            };

            eventSource.current.onmessage = (event) => {
                const { data } = event;
                const date = new Date();
                const dateString = date.toISOString();


                if(data.indexOf('sse') === -1){
                    setNewAlert(true);
                    setAlerts((prevAlerts) => [{ alContent: data, alDate: dateString, alIsRead: 0, alState: 0, usIdx: userId }, ...prevAlerts]);
                }
            };

            eventSource.current.onerror = (error) => {
                console.error("SSE error: ", error);
                eventSource.current.close();
            };
            fetchAlerts();
            setIsToken(true);

            return () => {
                if (eventSource.current) {
                    eventSource.current.close();
                }
            };
        }
    }, [userId]);

    const handleButtonClick = () => {
        const URL = "/api/logout";

        const logout = async () => {
            try {
                const result = await axios.get(URL);
                if(result.status == 200) {
                    router.push('/');
                    setIsToken(false);
                }
            } catch {

            }
        }


        logout();
    }

    return (
        <div className={styles.links}>
            {isToken ? (
                    <>
                        <SystemAlert usIdx={userId} alerts={alerts} newAlert={newAlert} setNewAlert={setNewAlert} />
                        {
                            userRole === 1 ? (
                                <Link href='/user'>마이페이지</Link>
                            ) : <Link href='/company'>마이페이지</Link>
                        }
                        <button onClick={handleButtonClick}>로그아웃</button>
                    </>
                ) : (
                    <>
                        <Link href='/login'>로그인</Link>
                        <Link href='/reg'>회원가입</Link>
                        <Link href='/login' className={styles.iconLink}>
                            <SlLogin />
                        </Link>
                        <Link href='/reg' className={styles.iconLink}>
                            <FaUserPlus size={20} />
                        </Link>
                    </>
                )
            }
        </div>
    );
}

export default HeaderNav;
