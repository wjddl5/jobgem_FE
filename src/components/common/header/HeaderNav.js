'use client';
import SystemAlert from "@/components/alert/SystemAlert";
import Link from "next/link";
import styles from "./HeaderNav.module.css";
import { SlLogin } from "react-icons/sl";
import { FaUserPlus } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { getToken } from "@/app/util/token/token";

function HeaderNav() {
    const [token, setToken] = useState({});
    const [userId, setUserId] = useState(0);
    const eventSource = useRef(null);
    const [alerts, setAlerts] = useState([]);
    const [newAlert, setNewAlert] = useState(false);

    useEffect(() => {
        getToken().then(
            (res) => {
                setUserId(res?.USIDX);
                setToken(res);
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
            eventSource.current = new EventSource(`http://localhost:8080/api/alert/subscribe/${userId}`, { withCredentials: true });

            eventSource.current.onopen = (event) => {
                console.log("SSE OPEN", event);
            };

            eventSource.current.onmessage = (event) => {
                const { data } = event;
                const date = new Date();
                const dateString = date.toISOString();

                // 새로운 알림 추가
                setAlerts((prevAlerts) => [{ alContent: data, alDate: dateString, alIsRead: 0, alState: 0, usIdx: userId }, ...prevAlerts]);

                if(data.indexOf('sse') === -1)
                    setNewAlert(true);
            };

            eventSource.current.onerror = (error) => {
                console.error("SSE error: ", error);
                eventSource.current.close();
            };
            fetchAlerts();

            return () => {
                if (eventSource.current) {
                    eventSource.current.close();
                }
            };
        }
    }, [userId]);

    return (
        <div className={styles.links}>
            {token ? (
                <>
                    <SystemAlert usIdx={userId} alerts={alerts} newAlert={newAlert} setNewAlert={setNewAlert} />
                    <Link href='/my'>마이페이지</Link>
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
            )}
        </div>
    );
}

export default HeaderNav;
