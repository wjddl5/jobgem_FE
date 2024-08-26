import styles from './page.module.css';
import Input from "@/components/form/Input";
import Textarea from "@/components/form/Textarea";
import FormLayout from "@/components/form/FormLayout";

export default function Home() {
	return (
		<main className={styles.main}>
			<FormLayout>
				<Input type={'text'}/>
				<Textarea />
			</FormLayout>
		</main>
	);
}
