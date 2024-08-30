'use client';
import { Button, Checkbox, MenuItem, Pagination, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from '/public/css/board.css';
import axios from 'axios';

// (관리자) 공지사항 게시판 리스트
export default function page() {
	// 초기화
	const router = useRouter();
	const [searchType, setSearchType] = useState('title');
	const [ar, setAr] = useState([]);
	const [arLength, setArLength] = useState(0);
	const API_URL = '/api/bbs/notice/list';

	//========================
	// 함수
	function selectChange(event) {
		setSearchType(event.target.value);
	}

	function getData() {
		axios.get(API_URL).then((res) => {
			setAr(res.data.ar);
			setArLength(res.data.length);
		});
	}

	useEffect(() => {
		getData();
	}, []);

	//========================

	//체크박스 관련 함수 (별도 파일로 이동?)
	const [chkSet, setChkSet] = useState(new Set());
	const [chkAll, setChkAll] = useState(false); //false=전체선택해제

	function allCheckChange(event) {
		if (event.target.checked) {
			const chkRow = new Set(ar.map((row) => row.id));
			setChkSet(chkRow);
			setChkAll(true);
		} else {
			setChkSet(new Set());
			setChkAll(false);
		}
	}

	function checkChange(event, id) {
		const chk = new Set(chkSet); // chkSet 가져와서 set 생성

		if (event.target.checked) {
			// 클릭된 체크박스
			chk.add(id); // 항목 추가
		} else {
			chk.delete(id); // 항목 삭제
		}
		setChkSet(chk); // 상태 업데이트
	}

	//========================

	// 페이지
	return (
		<div>
			<div className='bbs_header'>
				<h2 className='bbs_title'>공지사항</h2>
				<div className='bbs_toolBox'>
					<div className='bbs_search'>
						<Select className='selectBox' value={searchType} onChange={(event) => selectChange(event)}>
							<MenuItem value={'title'}>제목</MenuItem>
							<MenuItem value={'writer'}>작성자</MenuItem>
							<MenuItem value={'content'}>내용</MenuItem>
						</Select>
						<TextField className='textfield' variant='outlined' />
						<Button className='search_btn' variant='contained' onClick={() => router.push('')}>
							검색
						</Button>
					</div>
					<div className='bbs_btn'>
						<Button variant='contained' onClick={() => router.push(`write/${1}`)}>
							글쓰기
						</Button>
						<Button variant='outlined' color='error' onClick={() => router.push(`delete` /*선택항목 idx*/)}>
							삭제
						</Button>
					</div>
				</div>
			</div>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell sx={{ width: '50px' }} align='center'>
							<Checkbox onChange={allCheckChange} checked={chkSet.size === arLength} />
						</TableCell>
						<TableCell sx={{ width: '80px' }} align='center'>
							번호
						</TableCell>
						<TableCell sx={{ width: '*' }} align='center'>
							제목
						</TableCell>
						<TableCell sx={{ width: '150px' }} align='left'>
							작성자
						</TableCell>
						<TableCell sx={{ width: '80px' }} align='center'>
							댓글
						</TableCell>
						<TableCell sx={{ width: '80px' }} align='center'>
							조회
						</TableCell>
						<TableCell sx={{ width: '80px' }} align='center'>
							추천
						</TableCell>
						<TableCell sx={{ width: '150px' }} align='center'>
							작성일
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{ar.map((row) => (
						<TableRow key={row.id} className={styles.tableRow} onClick={() => router.push(`view/${row.id}`)} hover>
							<TableCell align='center'>
								<Checkbox checked={chkSet.has(row.id)} onChange={(event) => checkChange(event, row.id)} onClick={(event) => event.stopPropagation()} />
							</TableCell>
							<TableCell align='center'>{row.id}</TableCell>
							<TableCell className={styles.tableRow}>{row.boTitle}</TableCell>
							<TableCell align='left'>{row.user.usId}</TableCell>
							<TableCell align='center'>{row.commentList.length}</TableCell>
							<TableCell align='center'>{row.boHit}</TableCell>
							<TableCell align='center'>{row.boLike}</TableCell>
							<TableCell align='center'>{row.boWritedate}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Pagination className='pagination' count={10} color='primary' />
		</div>
	);
}
