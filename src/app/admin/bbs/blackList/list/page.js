'use client';
import { Button, Checkbox, FormControlLabel, Link, MenuItem, Pagination, Radio, RadioGroup, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from '/public/css/board.css';

// (관리자) 신고 게시판 리스트
export default function page() {
	// 초기화
	const router = useRouter();
	const [searchType, setSearchType] = useState('title');

	const ar = [
		{ bo_idx: 0, bo_title: '신고1', writer: '홍길동', bo_writedate: '2024-08-24', bo_hit: 10, bo_like: 5, c_list: [1, 2, 3] },
		{ bo_idx: 1, bo_title: '신고2', writer: '홍길동2', bo_writedate: '2024-08-24', bo_hit: 11, bo_like: 55, c_list: [1, 2, 3] },
		{ bo_idx: 2, bo_title: '신고3', writer: '홍길동3', bo_writedate: '2024-08-24', bo_hit: 12, bo_like: 53, c_list: [1, 2, 3] },
		{ bo_idx: 3, bo_title: '신고4', writer: '홍길동4', bo_writedate: '2024-08-24', bo_hit: 105, bo_like: 51, c_list: [1, 2, 3] },
		{ bo_idx: 4, bo_title: '신고5', writer: '홍길동5', bo_writedate: '2024-08-24', bo_hit: 106, bo_like: 15, c_list: [1, 2, 3] },
	];

	//========================
	// 함수
	function selectChange(event) {
		setSearchType(event.target.value);
	}

	//========================

	//체크박스 관련 함수 (별도 파일로 이동?)
	const [chkSet, setChkSet] = useState(new Set());
	const [chkAll, setChkAll] = useState(false); //false=전체선택해제

	function allCheckChange(event) {
		if (event.target.checked) {
			const chkRow = new Set(ar.map((row) => row.bo_idx));
			setChkSet(chkRow);
			setChkAll(true);
		} else {
			setChkSet(new Set());
			setChkAll(false);
		}
	}

	function checkChange(event, bo_idx) {
		const chk = new Set(chkSet); // chkSet 가져와서 set 생성

		if (event.target.checked) {
			// 클릭된 체크박스
			chk.add(bo_idx); // 항목 추가
		} else {
			chk.delete(bo_idx); // 항목 삭제
		}
		setChkSet(chk); // 상태 업데이트
	}

	// *allCheckBox에 checked={chkSet.size === ar.length} 속성 필요
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
						<RadioGroup row defaultValue='all' name='blackListType' className='blackList_radio'>
							<FormControlLabel value='all' control={<Radio size='small' />} label='전체' />
							<FormControlLabel value='comp' control={<Radio size='small' />} label='기업' />
							<FormControlLabel value='user' control={<Radio size='small' />} label='회원' />
						</RadioGroup>
					</div>
					<div className='bbs_btn'>
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
							<Checkbox onChange={allCheckChange} checked={chkSet.size === ar.length} />
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
						<TableCell sx={{ width: '150px' }} align='center'>
							작성일
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{ar.map((row) => (
						<TableRow key={row.bo_idx} className={styles.tableRow} onClick={() => router.push(`view/${row.bo_idx}`)} hover>
							<TableCell>
								<Checkbox checked={chkSet.has(row.bo_idx)} onChange={(event) => checkChange(event, row.bo_idx)} onClick={(event) => event.stopPropagation()} />
							</TableCell>
							<TableCell align='center'>{row.bo_idx}</TableCell>
							<TableCell>{row.bo_title} | 처리상태</TableCell>
							<TableCell align='left'>{row.writer}</TableCell>
							<TableCell align='center'>{row.bo_writedate}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Pagination className='pagination' count={10} color='primary' />
		</div>
	);
}
