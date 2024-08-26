import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
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
				<Link href='/login'>로그인</Link>
				<Link href='/reg'>회원가입</Link>
				<Link href='/my'>마이페이지</Link>
			</div>
			</div>
		</header>
	);
}
