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
	// API_URL = `api/bbs/blackList/view?bo_idx=${props.params.bo_idx}`;
	// const [vo, setVo] = useState({});

	// useEffect(() => {
	//   axios.get(API_URL).then((res) => {
	//     setVo(res.data.vo);
	//   });
	// }, []);

	return (
		<div className='post_detail-container'>
			<div className='post_header'>
				<h1 className='post_title'>post.title</h1>
				<div className='post_meta'>
					<span>By post.author</span>
					<span>To post.comp or user</span>
					<span>post.date</span>
					<span>Process: post.state</span>
				</div>
			</div>
			<div className='post_content'>
				<p>post.content</p>
			</div>
			<div className='btn_group'>
				<Button variant='outlined' size='small'>
					상태변경
				</Button>
				<Button variant='outlined' size='small' onClick={() => router.push('/admin/bbs/blackList/list')}>
					목록
				</Button>
				<Button variant='outlined' size='small' color='error'>
					삭제
				</Button>
			</div>
		</div>
	);
}
