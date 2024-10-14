'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from '@/app/style/css/board.css';
import { Button, TextField } from '@mui/material';
import { getToken } from '@/app/util/token/token';
import { useRecoilState } from 'recoil';
import { qnaState } from '@/components/admin/alert/atom';

// (관리자) 문의사항 게시글 상세보기
export default function page(props) {
	// 초기화
	const router = useRouter();
	const [cPage, setCPage] = useState(props.searchParams.cPage || 0);
	const [searchType, setSearchType] = useState(props.searchParams.searchType || 'title');
	const [searchValue, setSearchValue] = useState(props.searchParams.searchValue || '');
	const [vo, setVo] = useState({});
	const [commentList, setCommentList] = useState([]);
	const [commentContent, setCommentContent] = useState('');
	const API_URL = `/api/bbs/${props.params.id}`;
	const [token, setToken] = useState({});
	const [qna, setQna] = useRecoilState(qnaState);
	useEffect(() => {
		getToken().then((res) => {
			setToken(res);
		});
	}, []);
	useEffect(() => {
		getData();
	}, [token]);
	function getData() {
		axios
			.get(API_URL)
			.then((res) => {
				setVo(res.data.vo);
				setCommentList(res.data.commentList);
				qnaList();
			})
			.catch((e) => {
				console.error('error:', e);
			});
	}

	function removeBbs(id) {
		if (confirm('게시글을 삭제 하시겠습니까?')) {
			axios.delete(`/api/bbs/${id}`).then((res) => {
				if (res.data == true) {
					alert('삭제 완료 되었습니다.');
					router.push('/admin/bbs/qna/list');
					qnaList();
				} else alert('삭제 실패 !');
			});
		}
	}

	// 댓글
	function removeComment(id) {
		if (confirm('댓글을 삭제 하시겠습니까?')) {
			axios.delete(`/api/comment/${id}`).then((res) => {
				if (res.data == true) {
					alert('삭제 완료 되었습니다.');
					updateAnswerStatus(false);
					qnaList();
				} else alert('삭제 실패 !');
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
				.then(() => {
					document.getElementById('commentWrite').value = '';
					updateAnswerStatus(true);
					qnaList();
				});
		}
	}

	function qnaList() {
		axios
			.get('/api/admin/unanswered-questions')
			.then((res) => setQna(res.data.filter(q => q.boAnswer == 0)))
			.catch((error) => console.error('Error fetching QnA:', error));
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

	function updateAnswerStatus(a) {
		if (a == true) {
			axios.put(`/api/bbs/answer/${props.params.id}/yes`).then(() => {
				getData();
				qnaList();
			});
		} else {
			axios.put(`/api/bbs/answer/${props.params.id}/no`).then(() => {
				getData();
				qnaList();
			});
		}
	}

	return vo != null ? (
		<div className='post_detail-container'>
			<div className='post_header'>
				<h1 className='post_title'>{vo.boTitle}</h1>
				<div className='post_meta'>
					<span>By {vo.usId}</span>
					<span>{vo.boWritedate}</span>
					<span>답변상태: {vo.boAnswer != 1 ? '답변대기' : '답변완료'}</span>
				</div>
			</div>
			<div className='post_content'>
				<p dangerouslySetInnerHTML={{ __html: vo.boContent }}></p>
			</div>
			<div className='post_comments'>
				<h2>답변</h2>
				<ul>
					{commentList.map((comment, index) => (
						<li key={index} className='comment_item'>
							<p className='comment_writer'>
								<strong>[관리자]&nbsp;{comment.usId}</strong> :
							</p>
							{editingCommentId === comment.id ? (
								<>
									<input className='editCommentInput' type='text' value={newContent} onChange={(e) => setNewContent(e.target.value)} />
									<Button className='edit-button' variant='text' size='small' onClick={() => SaveClick(comment.id)}>
										저장
									</Button>
									<Button className='delete-button' variant='text' color='error' size='small' onClick={() => setEditingCommentId(null)}>
										취소
									</Button>
								</>
							) : (
								<>
									<Button className='edit-button' variant='text' size='small' hidden={comment.usIdx != token.USIDX} onClick={() => EditClick(comment)}>
										수정
									</Button>
									<Button className='delete-button' variant='text' color='error' size='small' onClick={() => removeComment(comment.id)}>
										삭제
									</Button>
									<p className='comment_content' style={{ height: '200px' }}>
										{comment.commContent}
									</p>
								</>
							)}
						</li>
					))}
				</ul>
				{commentList.length < 1 ? (
					<div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
						<TextField id='commentWrite' label='댓글작성' variant='outlined' style={{ flexGrow: 1 }} onChange={changeComment} />
						<Button className='commentSaveBtn' variant='outlined' size='small' onClick={saveComment}>
							저장
						</Button>
					</div>
				) : (
					''
				)}
			</div>
			<div className='btn_group'>
				<Button variant='outlined' size='small' onClick={() => router.push(`/admin/bbs/qna/list?cPage=${cPage}&searchType=${searchType}&searchValue=${searchValue}`)}>
					목록
				</Button>
				<Button variant='outlined' size='small' color='error' onClick={() => removeBbs(vo.id)}>
					삭제
				</Button>
			</div>
		</div>
	) : (
		<></>
	);
}
