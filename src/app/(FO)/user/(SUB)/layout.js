import SideMenu from "@/components/sidemenu/SideMenu";

export default function RootLayout({ children }) {
	return (
		<div className='flex gap-4 items-start'>
			<SideMenu />
			<div className='bg-white rounded-lg flex-1'>{children}</div>
		</div>
	);
}
