'use client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from '@/app/style/css/board.css';
import { Button } from '@mui/material';
import { useRecoilState } from 'recoil';
import { blacklistState } from '@/components/admin/alert/atom';

// (관리자) 신고 게시글 상세보기
export default function page(props) {
	// 초기화
	const router = useRouter();
	const API_URL = `/api/blackList/${props.params.id}`;
	const [cPage, setCPage] = useState(props.searchParams.cPage || 0);
	const [searchType, setSearchType] = useState(props.searchParams.searchType || 'title');
	const [searchValue, setSearchValue] = useState(props.searchParams.searchValue || '');
	const [selectType, setselectType] = useState(props.searchParams.selectType || 'all');
	const [vo, setVo] = useState({});
	const [blacklist, setBlacklist] = useRecoilState(blacklistState);
	useEffect(() => {
		getData();
	}, []);

	function getData() {
		axios
			.get(API_URL)
			.then((res) => {
				setVo(res.data);
				blacklistList();
			})
			.catch((e) => {
				console.error('error:', e);
			});
	}

	function removeList() {
		if (confirm('게시글을 삭제하시겠습니까?')) {
			axios.delete(`/api/blackList/${props.params.id}`).then((res) => {
				if (res.data == true) {
					alert('삭제 완료 되었습니다.');
					blacklistList();
				} else alert('삭제 실패 !');
				router.push('/admin/blackList/list');
			});
		}
	}

	function changeProcess(process) {
		if (confirm('처리상태를 변경하시겠습니까?')) {
			axios
				.put(`/api/blackList/process/${props.params.id}`, null, {
					params: {
						nowProcess: process,
					},
				})
				.then((res) => {
					if (res.data == true) {
						alert('변경 완료 되었습니다.');
						blacklistList();
					} else alert('오류가 발생했습니다.\n 다시 시도해주세요.');
					getData();
				});
		}
	}
	function blacklistList() {
		axios.get('/api/admin/pending-blacklist').then((res) => {
			setBlacklist(res.data.filter(b => b.blProcess == 0));
		});
	}
	return (
		<div className='post_detail-container'>
			<div className='post_header'>
				<h1 className='post_title'>{vo.blTitle}</h1>
				<div className='post_meta'>
					<span>By {vo.usId}</span>
					<span>To {vo.coName ? vo.coName : vo.joName}</span>
					<span>{vo.blDate}</span>
					{vo.blProcess == 1 ? <span style={{ color: 'blue' }}>처리완료</span> : <span style={{ color: 'orangered' }}>처리대기</span>}
				</div>
			</div>
			<div className='post_content'>
				<p>{vo.blContent}</p>
			</div>
			<div className='btn_group'>
				{vo.coIdx ? (
					<Button variant='outlined' size='small' onClick={() => router.push(`/admin/company/black/add?coIdx=${vo.coIdx}&blIdx=${vo.id}`)}>
						처리
					</Button>
				) : (
					<Button variant='outlined' size='small' onClick={() => router.push(`/admin/member/black/add?joIdx=${vo.joIdx}&blIdx=${vo.id}`)}>
						처리
					</Button>
				)}
				<Button variant='outlined' size='small' onClick={() => changeProcess(vo.blProcess)}>
					상태변경
				</Button>
				<Button variant='outlined' size='small' onClick={() => router.push(`/admin/blackList/list?cPage=${cPage}&searchType=${searchType}&searchValue=${searchValue}&selectType=${selectType}`)}>
					목록
				</Button>
				<Button variant='outlined' size='small' color='error' onClick={removeList}>
					삭제
				</Button>
			</div>
		</div>
	);
}
