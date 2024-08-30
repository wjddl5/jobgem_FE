'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from '/public/css/board.css';
import { Button } from '@mui/material';

// (관리자) 문의사항 게시글 상세보기
export default function page(props) {
	// 초기화
	const router = useRouter();
	const API_URL = `/api/bbs/qna/view?id=${props.params.id}`;
	const [vo, setVo] = useState({});
	const [user, setUser] = useState({});
	const [commentList, setCommentList] = useState([]);

	useEffect(() => {
		axios.get(API_URL).then((res) => {
			setVo(res.data.vo);
			setUser(res.data.vo.user);
			setCommentList(res.data.vo.commentList);
		});
	}, []);

	return (
		<div className='post_detail-container'>
			<div className='post_header'>
				<h1 className='post_title'>{vo.Title}</h1>
				<div className='post_meta'>
					<span>By {user.usId}</span>
					<span>{vo.boWritedate}</span>
					<span>답변상태: {vo.boAnswer == 0 ? '답변대기' : '답변완료'}</span>
				</div>
			</div>
			<div className='post_content'>
				<p>{vo.boContent}</p>
			</div>
			<div className='post_comments'>
				<h2>댓글</h2>
				<ul>
					{commentList.map((comment) => (
						<li key={comment.id} className='comment_item'>
							<p className='comment_author'>
								<strong>{comment.user.usId}</strong> :
							</p>
							<Button className='delete-button' variant='text' color='error' size='small' onClick={() => router.push(`delete` /*선택항목 idx*/)}>
								삭제
							</Button>
							<p className='comment_content'>{comment.commContent}</p>
							<p className='comment_date'>{comment.commWritedate}</p>
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
