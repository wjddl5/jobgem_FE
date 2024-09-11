'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from '/public/css/board.css';
import { Button } from '@mui/material';

// (관리자) 신고 게시글 상세보기
export default function page(props) {
	// 초기화
	const router = useRouter();
	const API_URL = '/api/blackList/view';
	const [vo, setVo] = useState({});

	useEffect(() => {
		getData();
	}, []);

	function getData() {
		axios.get(API_URL, { params: { id: props.params.id } }).then((res) => {
			setVo(res.data);
		});
	}

	function removeList() {
		if (confirm('게시글을 삭제하시겠습니까?')) {
			axios
				.get('/api/blackList/remove', {
					params: {
						id: props.params.id,
					},
				})
				.then((res) => {
					if (res.data == true) alert('삭제 완료 되었습니다.');
					else alert('삭제 실패 !');
					router.push('/admin/blackList/list');
				});
		}
	}

	function changeProcess(process) {
		if (confirm('처리상태를 변경하시겠습니까?')) {
			axios
				.get('/api/blackList/process', {
					params: {
						id: props.params.id,
						nowProcess: process,
					},
				})
				.then((res) => {
					if (res.data == true) alert('변경 완료 되었습니다.');
					else alert('오류가 발생했습니다.\n 다시 시도해주세요.');
					getData();
				});
		}
	}

	return (
		<div className='post_detail-container'>
			<div className='post_header'>
				<h1 className='post_title'>{vo.blTitle}</h1>
				<div className='post_meta'>
					<span>By {vo.usId}</span>
					<span>To {vo.coName ? vo.coName : vo.joName}</span>
					<span>{vo.blDate}</span>
					{vo.blProcess == 0 ? <span style={{ color: 'orangered' }}>처리대기</span> : <span style={{ color: 'blue' }}>처리완료</span>}
				</div>
			</div>
			<div className='post_content'>
				<p>{vo.blContent}</p>
			</div>
			<div className='btn_group'>
				{vo.coIdx ? (
					<Button variant='outlined' size='small' onClick={() => router.push(`/admin/company/black/add?${vo.coIdx}`)}>
						처리
					</Button>
				) : (
					<Button variant='outlined' size='small' onClick={() => router.push(`/admin/member/black/add?${vo.joIdx}`)}>
						처리
					</Button>
				)}
				<Button variant='outlined' size='small' onClick={() => changeProcess(vo.blProcess)}>
					상태변경
				</Button>
				<Button variant='outlined' size='small' onClick={() => router.push('/admin/blackList/list')}>
					목록
				</Button>
				<Button variant='outlined' size='small' color='error' onClick={removeList}>
					삭제
				</Button>
			</div>
		</div>
	);
}
