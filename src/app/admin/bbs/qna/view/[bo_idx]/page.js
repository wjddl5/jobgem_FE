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
	API_URL = `api/bbs/qna/view?bo_idx=${props.params.bo_idx}`;
	const [vo, setVo] = useState({});

	useEffect(() => {
		axios.get(API_URL).then((res) => {
			setVo(res.data.vo);
		});
	}, []);

	return (
		<div className='post_detail-container'>
			<div className='post_header'>
				<h1 className='post_title'>{vo.bo_title}</h1>
				<div className='post_meta'>
					<span>By {vo.us_idx}</span>
					<span>{vo.bo_writedate}</span>
					<span></span>
					<span>답변상태: {vo.bo_answer}</span>
				</div>
			</div>
			<div className='post_content'>
				<p>post.content</p>
			</div>
			<div className='post_comments'>
				<h2>댓글</h2>
				<ul>
					{comments.map((comment, index) => (
						<li key={index} className='comment_item'>
							<p className='comment_author'>
								<strong>{comment.author}</strong> :
							</p>
							<Button className='delete-button' variant='text' color='error' size='small' onClick={() => router.push(`delete` /*선택항목 idx*/)}>
								삭제
							</Button>
							<p className='comment_content'>{comment.comm_content}</p>
							<p className='comment_date'>{comment.comm_writedate}</p>
						</li>
					))}
				</ul>
			</div>
			<div className='btn_group'>
				<Button variant='outlined' size='small' onClick={() => router.push('/admin/bbs/qna/list')}>
					목록
				</Button>
				<Button variant='outlined' size='small' color='error'>
					삭제
				</Button>
			</div>
		</div>
	);
}
