'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import styles from '/public/css/board.css';
import { Button } from '@mui/material';

// (관리자) 문의사항 게시글 상세보기
export default function page(props) {
	// 초기화
	const router = useRouter();
	API_URL = `api/blackList/view?bl_idx=${props.params.bl_idx}`;
	const [vo, setVo] = useState({});

	useEffect(() => {
		axios.get(API_URL).then((res) => {
			setVo(res.data.vo);
		});
	}, []);

	return (
		<div className='post_detail-container'>
			<div className='post_header'>
				<h1 className='post_title'>{vo.bl_title}</h1>
				<div className='post_meta'>
					<span>By {vo.us_idx}</span>
					<span>To {vo.bl_co_idx ? vo.bl_co_idx : vo.bl_jo_idx}</span>
					<span>{vo.bl_date}</span>
					<span>{vo.bl_status}</span>
				</div>
			</div>
			<div className='post_content'>
				<p>{vo.bl_content}</p>
			</div>
			<div className='btn_group'>
				<Button variant='outlined' size='small'>
					상태변경
				</Button>
				<Button variant='outlined' size='small' onClick={() => router.push('/admin/blackList/list')}>
					목록
				</Button>
				<Button variant='outlined' size='small' color='error'>
					삭제
				</Button>
			</div>
		</div>
	);
}
