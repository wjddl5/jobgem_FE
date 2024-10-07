import HeaderNav from "@/components/common/header/HeaderNav";
import Link from "next/link";
import styles from "./Header.module.css";
import HeaderSearch from "./HeaderSearch";

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
					<HeaderSearch />
				</div>
				<HeaderNav />
			</div>
		</header>
	);
}

