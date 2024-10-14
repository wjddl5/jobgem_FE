'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import styles from '@/app/style/css/board.css';
import { Button, TextField } from '@mui/material';
import { getToken } from '@/app/util/token/token';

// 공지사항 게시글 상세보기
export default function page(props) {
	// 초기화
	const router = useRouter();
	const [cPage, setCPage] = useState(props.searchParams.cPage || 0);
	const [searchType, setSearchType] = useState(props.searchParams.searchType || 'title');
	const [searchValue, setSearchValue] = useState(props.searchParams.searchValue || '');
	const [vo, setVo] = useState({});
	const [commentList, setCommentList] = useState([]);
	const [commentContent, setCommentContent] = useState('');
	const [disabled, setDisabled] = useState(true);
	const API_URL = `/api/bbs/${props.params.id}`;
	const [token, setToken] = useState(null);
	const [USIDX, setUSIDX] = useState();

	useEffect(() => {
		getToken().then((res) => {
			setToken(res);
			setUSIDX(res.USIDX);
		});
	}, []);

	function getData() {
		axios
			.get(API_URL)
			.then((res) => {
				setVo(res.data.vo);
				setCommentList(res.data.commentList);
			})
			.catch((e) => {
				console.error('eroor:', e);
			});
	}

	// 조회수
	var chk = useRef(true);

	function hasViewed() {
		const viewedPosts = sessionStorage.getItem('viewedPosts');
		return viewedPosts ? JSON.parse(viewedPosts).includes(props.params.id) : false;
	}

	function markAsViewed() {
		const viewedPosts = sessionStorage.getItem('viewedPosts');
		const updatedViewedPosts = viewedPosts ? JSON.parse(viewedPosts) : [];

		if (!updatedViewedPosts.includes(props.params.id)) {
			updatedViewedPosts.push(props.params.id);
			sessionStorage.setItem('viewedPosts', JSON.stringify(updatedViewedPosts));
		}
	}

	useEffect(() => {
		if (chk.current) {
			if (!hasViewed()) {
				axios.put(`/api/bbs/hit/${props.params.id}`).then(() => {
					getData();
					markAsViewed();
				});
			} else getData();
		}
		chk = false;
	}, []);

	// =================
	// 댓글
	function removeComment(id) {
		if (confirm('댓글을 삭제 하시겠습니까?')) {
			axios.delete(`/api/comment/${id}`).then((res) => {
				if (res.data == true) alert('삭제 완료 되었습니다.');
				else alert('삭제 실패 !');
				getData();
			});
		}
	}

	function saveComment() {
		if (commentContent.trim().length < 1) {
			alert('댓글을 입력하세요.');
		} else if (commentContent.length > 100) {
			alert('최대 100글자까지 입력할 수 있습니다.');
		} else {
			axios
				.post('/api/comment/write', null, {
					params: {
						content: commentContent,
						usIdx: token.USIDX,
						boIdx: props.params.id,
					},
				})
				.then((res) => {
					document.getElementById('commentWrite').value = '';
					getData();
				});
		}
	}

	function changeComment(event) {
		var c = event.target.value;
		if (c.length > 100) {
			alert('최대 100글자까지 입력할 수 있습니다.');
			event.target.value = c.substring(0, 99);
		} else {
			setCommentContent(c);
		}
	}

	const [editingCommentId, setEditingCommentId] = useState(null);
	const [newContent, setNewContent] = useState('');

	const EditClick = (comment) => {
		setEditingCommentId(comment.id);
		setNewContent(comment.commContent);
	};

	const SaveClick = (commentId) => {
		updateComment(commentId, newContent);
		setEditingCommentId(null);
	};

	function updateComment(id, content) {
		axios
			.put(`/api/comment/${id}`, null, {
				params: {
					content: content,
				},
			})
			.then(() => {
				getData();
			});
	}

	return (
		<div className='post_detail-container'>
			<div className='post_header'>
				<h1 className='post_title'>{vo.boTitle}</h1>
				<div className='post_meta'>
					<span>By {vo.usId}</span>
					<span>{vo.boWritedate}</span>
					<span>조회: {vo.boHit}</span>
				</div>
			</div>
			<div className='post_content'>
				<p dangerouslySetInnerHTML={{ __html: vo.boContent }}></p>
			</div>

			<div className='post_comments'>
				<h2>댓글</h2>
				<ul>
					{commentList.map((comment, index) => (
						<li key={index} className='comment_item'>
							<p className='comment_writer'>
								<strong>{comment.usId}</strong> :
							</p>
							{editingCommentId === comment.id ? (
								<>
									<input style={{ width: '830px', height: '30px', marginTop: '10px' }} type='text' value={newContent} onChange={(e) => setNewContent(e.target.value)} />
									<Button className='edit-button' variant='text' size='small' onClick={() => SaveClick(comment.id)}>
										저장
									</Button>
									<Button className='delete-button' variant='text' color='error' size='small' onClick={() => setEditingCommentId(null)}>
										취소
									</Button>
								</>
							) : (
								<>
									<Button className='edit-button' variant='text' size='small' sx={{ display: comment.usIdx != USIDX ? 'none' : 'block' }} onClick={() => EditClick(comment)}>
										수정
									</Button>
									<Button className='delete-button' variant='text' color='error' size='small' sx={{ display: comment.usIdx != USIDX ? 'none' : 'block' }} onClick={() => removeComment(comment.id)}>
										삭제
									</Button>
									<p className='comment_content'>{comment.commContent}</p>
									<p className='comment_date'>{comment.commWritedate}</p>
								</>
							)}
						</li>
					))}
				</ul>
				<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
					<TextField id='commentWrite' label='댓글작성' variant='outlined' style={{ flexGrow: 1 }} onChange={changeComment} />
					<Button className='commentSaveBtn' variant='outlined' size='small' onClick={saveComment}>
						저장
					</Button>
				</div>
			</div>
			<div className='btn_group'>
				<Button variant='outlined' size='small' onClick={() => router.push(`/bbs-notice-list?cPage=${cPage}&searchType=${searchType}&searchValue=${searchValue}`)}>
					목록
				</Button>
			</div>
		</div>
	);
}
