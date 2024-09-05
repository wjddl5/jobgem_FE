import '../globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import Header from "@/components/common/header/Header";
import Footer from "@/components/common/footer/Footer";
config.autoAddCss = false;

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({ children }) {

	return (
			<>
				<Header/>
					<main className='main'>
						{children}
					</main>
				<Footer/>
			</>
)
	;
}