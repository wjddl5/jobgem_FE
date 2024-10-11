import React from "react";
import { useRouter } from "next/navigation";

function Card({ item }) {
	const router = useRouter();
	const date = new Date();
	const nowDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Get the current date without time

	const deadlineDate = new Date(item.poDeadline);

	const timeDiff = deadlineDate - nowDate;
	const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) - 1; // Convert milliseconds to days

	const deadlineDisplay = dayDiff > 0 ? `D-${dayDiff}` : dayDiff === 0 ? "D-Day" : `D+${Math.abs(dayDiff)}`;

	return (
		<article className='bg-white p-4 mb-4 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer border'>
			<a target='_self' onClick={() => router.push(`/post/view/${item.id}`)} className='absolute opacity-0 top-0 right-0 left-0 bottom-0'></a>
			<div className='relative mb-4 rounded-2xl'>
				<img
					className='max-h-32 object-cover rounded-2xl w-full transition-transform duration-300 transform group-hover:scale-105'
					src={`/s3/${item.company.coImgUrl ? item.company.coImgUrl : "1.jpg"}`}
					width={"100"}
					height={"100"}
					alt='썸네일이미지'
				/>

				<a
					className='flex justify-center items-center bg-cyan-200 bg-opacity-80 z-10 absolute top-0 left-0 w-full h-full text-gray-700 rounded-2xl opacity-0 transition-all duration-300 transform group-hover:scale-105 text-xl group-hover:opacity-100'
					onClick={() => router.push(`/post/view/${item.id}`)}
					target='_self'
					rel='noopener noreferrer'
				>
					자세히 보기
					<svg className='ml-2 w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
						<path d='M13 5l7 7-7 7M5 5l7 7-7 7'></path>
					</svg>
				</a>
			</div>
			<div className='w-full mb-auto'>
				<div>
					<p className='text-l font-bold text-left mb-2'>{item.company.coName}</p>
					<p
						className='text-m text-left mb-2'
						style={{
							textOverflow: "ellipsis",
							overflow: "hidden",
							display: "-webkit-box",
							WebkitLineClamp: 2,
							WebkitBoxOrient: "vertical",
						}}
					>
						{item.poTitle}
					</p>
					<div className='text-sm text-gray-500 text-left flex justify-between'>
						<span>{item.poDate}</span>
						<div className='text-sm flex items-center text-gray-500 '>
							<svg className='ml-1 w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
								<path d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'></path>
							</svg>
							{deadlineDisplay}
						</div>
					</div>
				</div>
			</div>
		</article>
	);
}

export default Card;
