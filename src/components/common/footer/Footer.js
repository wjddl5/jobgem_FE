export default function Footer() {
	return (
		<footer className='bg-zinc-200 py-6 border-t border-gray-200'>
			<div className='container mx-auto text-center'>
				<div className='mb-4'>
					<h3 className='text-lg font-bold'>JOBGEM LLC.</h3>
					<p className='text-sm text-gray-600'>&copy; {new Date().getFullYear()} JOBGEM LLC. All Rights Reserved.</p>
				</div>
				<div className='space-x-4'>
					<span href='/terms' className='text-sm text-blue-500 hover:underline'>
						Terms of Service
					</span>
					<span href='/privacy' className='text-sm text-blue-500 hover:underline'>
						Privacy Policy
					</span>
					<span href='/contact' className='text-sm text-blue-500 hover:underline'>
						Contact Us
					</span>
				</div>
			</div>
		</footer>
	);
}
