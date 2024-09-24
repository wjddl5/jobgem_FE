import SideMenuCom from "@/components/sidemenu/SideMenuCom";

export default function RootLayout({ children }) {

	return (
			<div className='flex gap-4 items-start'>
				<SideMenuCom />
				<div className='bg-white rounded-lg flex-1'>
					{children}
				</div>
			</div>
	);
}
