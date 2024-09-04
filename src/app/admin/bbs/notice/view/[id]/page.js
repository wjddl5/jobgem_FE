'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from '/public/css/board.css';
import { Button, TextField } from '@mui/material';

// (관리자) 공지사항 게시글 상세보기
export default function page(props) {
	// 초기화
	const router = useRouter();
	const [vo, setVo] = useState({});
	const [user, setUser] = useState({});
	const [commentList, setCommentList] = useState([]);
	const [commentContent, setCommentContent] = useState('');
	const API_URL = `/api/bbs/notice/view?id=${props.params.id}`;

	useEffect(() => {
		getData();
	}, []);

	function getData() {
		axios.get(API_URL).then((res) => {
			setVo(res.data.vo);
			setUser(res.data.vo.user);
			setCommentList(res.data.commentList);
		});
	}

	function removeBbs(id) {
		if (confirm('게시글을 삭제 하시겠습니까?')) {
			axios.get(`/api/bbs/notice/remove?id=${id}`).then((res) => {
				if (res.data == true) {
					alert('삭제 완료 되었습니다.');
					router.push('/admin/bbs/notice/list');
				} else alert('삭제 실패 !');
			});
		}
	}

	function removeComment(id) {
		if (confirm('댓글을 삭제 하시겠습니까?')) {
			axios.get(`/api/comment/remove?id=${id}`).then((res) => {
				if (res.data == true) alert('삭제 완료 되었습니다.');
				else alert('삭제 실패 !');
				getData();
			});
		}
	}

	function saveComment() {
		var c = document.getElementById('commentWrite');
		c.value = '';
		if (commentContent.trim().length < 1) {
			alert('댓글을 입력하세요.');
		} else {
			axios
				.get('/api/comment/write', {
					params: {
						content: commentContent,
						usIdx: 1, //로그인한 유저 idx로 변경 (!)
						boIdx: props.params.id,
					},
				})
				.then((res) => {
					document.getElementById('commentWrite').value = '';
					getData();
				});
		}
	}

	return (
		<div className='post_detail-container'>
			<div className='post_header'>
				<h1 className='post_title'>{vo.boTitle}</h1>
				<div className='post_meta'>
					<span>By {vo.usId}</span>
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
					{commentList.map((comment, index) => (
						<li key={index} className='comment_item'>
							<p className='comment_writer'>
								<strong>{comment.usId}</strong> :
							</p>
							<Button className='delete-button' variant='text' color='error' size='small' onClick={() => removeComment(comment.id)}>
								삭제
							</Button>
							<p className='comment_content'>{comment.commContent}</p>
							<p className='comment_date'>{comment.commWritedate}</p>
						</li>
					))}
				</ul>
				<TextField
					id='commentWrite'
					label='댓글작성'
					variant='outlined'
					style={{ width: '870px' }}
					onChange={(event) => {
						setCommentContent(event.target.value);
					}}
				/>

				<Button
					className='commentSaveBtn'
					variant='outlined'
					size='small'
					onClick={() => {
						saveComment();
					}}
				>
					저장
				</Button>
			</div>
			<div className='btn_group'>
				<Button variant='outlined' size='small' onClick={() => router.push(`/admin/bbs/notice/list?cPage=${props.searchParams.cPage}`)}>
					목록
				</Button>
				<Button variant='outlined' size='small'>
					수정
				</Button>
				<Button variant='outlined' size='small' color='error' onClick={() => removeBbs(vo.id)}>
					삭제
				</Button>
			</div>
		</div>
	);
}
