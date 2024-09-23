'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from '/public/css/board.css';
import { Button, TextField } from '@mui/material';

// 문의사항 게시글 상세보기 z
export default function page(props) {
	// 초기화
	const router = useRouter();
	const [vo, setVo] = useState({});
	const [commentList, setCommentList] = useState([]);
	const [disabled, setDisabled] = useState(true);
	const API_URL = `/api/bbs/${props.params.id}`;

	useEffect(() => {
		getData();
	}, []);

	function getData() {
		axios.get(API_URL).then((res) => {
			setVo(res.data.vo);
			setCommentList(res.data.commentList);
		});
	}

	useEffect(() => {
		if (vo.usIdx == 1 /*(!) 로그인한 유저idx로 변경*/) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [vo]);

	function removeBbs(id) {
		if (confirm('게시글을 삭제 하시겠습니까?')) {
			axios.delete(`/api/bbs/${id}`).then((res) => {
				if (res.data == true) {
					alert('삭제 완료 되었습니다.');
					router.push('/user/bbs-qna-list');
				} else alert('삭제 실패 !');
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
							<p className='comment_content' style={{ height: '200px' }}>
								{comment.commContent}
							</p>
						</li>
					))}
				</ul>
			</div>
			<div className='btn_group'>
				<Button variant='outlined' size='small' onClick={() => router.push(`/user/bbs-qna-list?cPage=${props.searchParams.cPage}`)}>
					목록
				</Button>
				<Button variant='outlined' size='small' onClick={() => router.push(`/user/bbs-qna-edit/${props.params.id}`)}>
					수정
				</Button>
				<Button variant='outlined' size='small' color='error' onClick={() => removeBbs(vo.id)}>
					삭제
				</Button>
			</div>
		</div>
	);
}
