import React from "react";
import Image from "next/image";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import axios from "axios";

function Card({ item}) {
	const date = new Date();
	const nowDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()); 
	const deadlineDate = new Date(item.poDeadline);
	const timeDiff = deadlineDate - nowDate;
	const dayDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); 
	const imgUrl = item.company.coThumbImgUrl ? item.company.coThumbImgUrl : "/img/1.jpg";
	const deadlineDisplay = dayDiff > 0 ? `D-${dayDiff}` : dayDiff === 0 ? "D-Day" : `D+${Math.abs(dayDiff)}`;

	const handleDelete = async () => {
		const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
		if (confirmDelete) {
			try {
				const response = await axios.delete(`/api/posts/${item.id}`);
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

	return (
		<article className={`bg-white p-6 mb-6 shadow transition duration-300 group transform hover:-translate-y-2 hover:shadow-2xl rounded-2xl cursor-pointer border`}>
			<a target='_self' href={`/admin/post/${item.id}`} className='absolute opacity-0 top-0 right-0 left-0 bottom-0'></a>
			<div className='relative mb-4 rounded-2xl'>
				<Image
					className='max-h-80 rounded-2xl w-full object-cover transition-transform duration-300 transform group-hover:scale-105'
					src={imgUrl}
					width={"100"}
					height={"100"}
					alt='썸네일이미지'
				/>
				<button className='absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md z-20'>
					<PersonIcon className='h-5 w-5 text-red-700' />
					<span className='ml-1 text-sm text-slate-400'>{item.applyCount}</span>
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
		</article>
	);
}

export default Card;

