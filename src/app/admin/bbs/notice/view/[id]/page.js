'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from '/public/css/board.css';
import { Button } from '@mui/material';

// (관리자) 공지사항 게시글 상세보기
export default function page(props) {
	// 초기화
	const router = useRouter();
	const [vo, setVo] = useState({});
	const [user, setUser] = useState({});
	const [commentList, setCommentList] = useState([]);
	const API_URL = `/api/bbs/notice/view?id=${props.params.id}`;

	useEffect(() => {
		axios.get(API_URL).then((res) => {
			console.log(res);
			setVo(res.data.vo);
			setUser(res.data.vo.user);
			setCommentList(res.data.vo.commentList);
		});
	}, []);

	return (
		<div className='post_detail-container'>
			<div className='post_header'>
				<h1 className='post_title'>{vo.boTitle}</h1>
				<div className='post_meta'>
					<span>By {user.usId}</span>
					<span>{vo.boWritedate}</span>
					<span>조회: {vo.boHit}</span>
					<span>추천: {vo.boLike ? vo.boLike : 0}</span>
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
							<p className='comment_writer'>
								<strong>{comment.user.usId}</strong> :
							</p>
							<Button className='delete-button' variant='text' color='error' size='small' onClick={() => router.push(`delete`)}>
								삭제
							</Button>
							<p className='comment_content'>{comment.commContent}</p>
							<p className='comment_date'>{comment.commWritedate}</p>
						</li>
					))}
				</ul>
			</div>
			<div className='btn_group'>
				<Button variant='outlined' size='small' onClick={() => router.push('/admin/bbs/notice/list')}>
					목록
				</Button>
				<Button variant='outlined' size='small'>
					수정
				</Button>
				<Button variant='outlined' size='small' color='error'>
					삭제
				</Button>
			</div>
		</div>
	);
}
