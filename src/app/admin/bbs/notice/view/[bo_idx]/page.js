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
	const [commentList, setCommentList] = useState([]);
	const API_URL = `/api/bbs/notice/view?boIdx=${props.params.bo_idx}`;

	useEffect(() => {
		axios.get(API_URL).then((res) => {
			setVo(res.data.vo);
			setCommentList(res.data.vo.commentList);
		});
	}, []);

	return (
		<div className='post_detail-container'>
			<div className='post_header'>
				<h1 className='post_title'>{vo.bo_title}</h1>
				<div className='post_meta'>
					<span>By {vo.us_idx}</span>
					<span>{vo.bo_writedate}</span>
					<span>조회: {vo.bo_hit}</span>
					<span>추천: {vo.bo_like ? vo.bo_like : 0}</span>
				</div>
			</div>
			<div className='post_content'>
				<p>{vo.bo_content}</p>
			</div>
			<div className='post_comments'>
				<h2>댓글</h2>
				<ul>
					{commentList.map((comment, index) => (
						<li key={index} className='comment_item'>
							<p className='comment_writer'>
								<strong>{comment.us_idx}</strong> :
							</p>
							<Button className='delete-button' variant='text' color='error' size='small' onClick={() => router.push(`delete`)}>
								삭제
							</Button>
							<p className='comment_content'>{comment.comm_content}</p>
							<p className='comment_date'>{comment.comm_writedate}</p>
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
