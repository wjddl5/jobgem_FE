import Link from "next/link";
import styles from "./Header.module.css";
import {  FaUserPlus } from "react-icons/fa";
import SystemAlert from "@/components/alert/SystemAlert";
import {SlLogin} from "react-icons/sl"; // react-icons에서 아이콘 불러오기

export default function Header() {
	const isLoggedIn = false; // 로그인 여부 (임시)

	return (
		<header className={styles.header}>
			<div className={styles.inner}>
				<div className={styles.search}>
					<div className={styles.logo}>
						<Link href='/'>
							JOB<span>GEM</span>
						</Link>
					</div>
					<div className={styles.bar}>
						<input type='text' className={styles.input} placeholder='검색어를 입력하세요' />
						<i className={styles.icon}></i>
					</div>
				</div>
				<div className={styles.links}>
					<SystemAlert />

					{/* 데스크탑용 로그인, 회원가입 링크 */}
					<Link href='/login'>로그인</Link>
					<Link href='/reg'>회원가입</Link>

					{/* 로그인 상태에 따라 마이페이지 링크 표시 */}
					{isLoggedIn && (
						<Link href='/my'>마이페이지</Link>
					)}

					{/* 모바일용 아이콘 링크 */}
					<Link href='/login' className={styles.iconLink}>
						<SlLogin />
					</Link>
					<Link href='/reg' className={styles.iconLink}>
						<FaUserPlus size={20} />
					</Link>
				</div>
			</div>
		</header>
	);
}
