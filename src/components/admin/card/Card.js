import React from "react";
import Image from "next/image";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CampaignIcon from '@mui/icons-material/Campaign'; // 확성기 아이콘을 대표할 수 있는 MUI 아이콘
import axios from "axios";

function Card({ item }) {
	const date = new Date();
	const nowDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()); // Get the current date without time

	const deadlineDate = new Date(item.poDeadline);

	const timeDiff = deadlineDate - nowDate;
	const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

	const deadlineDisplay = dayDiff > 0 ? `D-${dayDiff}` : dayDiff === 0 ? "D-Day" : `D+${Math.abs(dayDiff)}`;

	const handleDelete = async () => {
		const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
		if (confirmDelete) {
			try {
				// params를 axios 요청과 함께 올바르게 전달
				const response = await axios.get(`/api/post/delete?id=${item.id}`);
				if (response.status === 200) {
					alert("삭제 완료");
					window.location.reload();
				} else {
					alert("삭제 실패");
				}
			} catch (error) {
				console.log(error);
			}
		}
	}

	const handleRequest = () => {
		console.log("요청");
	}

	return (
		<article className='bg-white p-6 mb-6 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer border'>
			<a target='_self' href={`/admin/post/${item.id}`} className='absolute opacity-0 top-0 right-0 left-0 bottom-0'></a>
			<div className='relative mb-4 rounded-2xl'>
				<Image
					className='max-h-80 rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105'
					src={`/img/1.jpg`}
					width={"100"}
					height={"100"}
					alt='썸네일이미지'
				/>
				<button className='absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md z-20'>
					<svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24' stroke='currentColor' className='h-5 w-5 text-red-700'>
						<path d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' />
					</svg>
					<span className='ml-1 text-sm text-slate-400'>2</span>
				</button>

				<a
					className='flex justify-center items-center bg-cyan-200 bg-opacity-80 z-10 absolute top-0 left-0 w-full h-full text-gray-700 rounded-2xl opacity-0 transition-all duration-300 transform group-hover:scale-105 text-xl group-hover:opacity-100'
					href={`/admin/post/${item.id}`} 
					target='_self'
					rel='noopener noreferrer'
				>
					자세히 보기
					<svg className='ml-2 w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
						<path d='M13 5l7 7-7 7M5 5l7 7-7 7'></path>
					</svg>
				</a>
			</div>
			<div className='flex justify-between items-center w-full pb-4 mb-auto'>
				<div className='flex items-center'>
					<div className='flex flex-1'>
						<div className=''>
							<p className='text-l font-bold text-left'>{item.company.coName}</p>
							<p className='text-m text-left'>{item.poTitle}</p>
							<p className='text-sm text-gray-500 text-left'>{item.poDate}</p>
						</div>
					</div>
				</div>
				<div className='flex justify-end'>
					<div className='text-sm flex items-center text-gray-500 '>
						<svg className='ml-1 w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
							<path d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'></path>
						</svg>
						{deadlineDisplay}
					</div>
				</div>
			</div>
			<IconButton aria-label="delete" className='absolute bottom-0 right-0 m-2'>
				<DeleteIcon onClick={handleDelete}/>
			</IconButton>
			<IconButton aria-label="edit" className='absolute bottom-0 right-12 m-2' > {/* right 값을 조정하여 위치 조절 */}
				<CampaignIcon onClick={handleRequest}/>
			</IconButton>
		</article>
	);
}

export default Card;
