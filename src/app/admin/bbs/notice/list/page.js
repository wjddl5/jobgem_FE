'use client';
import { Button, Checkbox, MenuItem, Pagination, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from '/public/css/board.css';
import axios from 'axios';

// (관리자) 공지사항 게시판 리스트
export default function page(props) {
	// 초기화
	const router = useRouter();
	const [searchType, setSearchType] = useState(sessionStorage.getItem('searchType') ? sessionStorage.getItem('searchType') : 'title');
	const [searchValue, setSearchValue] = useState(sessionStorage.getItem('searchValue') ? sessionStorage.getItem('searchValue') : '');
	const [ar, setAr] = useState([]);
	const [arLength, setArLength] = useState(0);
	const API_URL = '/api/bbs/notice';

	// 페이징
	const [cPage, setCPage] = useState(Number(props.searchParams.cPage));
	const [page, setPage] = useState(cPage ? cPage : 0);
	const [totalPage, setTotalPage] = useState(0);
	const [pageSize, setPageSize] = useState(10);

	function changePage(event, value) {
		setPage(value - 1);
		router.replace(`/admin/bbs/notice/list?cPage=${value - 1}`, { shallow: true }); // 뒤로가기에도 원래 페이지로 갈 수 있게 URL수정
	}

	useEffect(() => {
		setPage(cPage ? Math.max(0, Math.min(cPage, totalPage)) : 0);
	}, [cPage, totalPage]);
	//========================

	// 함수
	function search() {
		setPage(0);
		getData();
		sessionStorage.setItem('searchType', searchType);
		sessionStorage.setItem('searchValue', searchValue);
	}

	function getData() {
		if (searchValue.trim().length < 1) {
			axios
				.get(API_URL, {
					params: {
						page: page,
						size: pageSize,
					},
				})
				.then((res) => {
					setAr(res.data.content);
					setArLength(res.data.content.length);
					setTotalPage(res.data.totalPages);
				});
		} else {
			axios
				.get(API_URL, {
					params: {
						page: page,
						size: pageSize,
						searchType: searchType,
						searchValue: searchValue,
					},
				})
				.then((res) => {
					setAr(res.data.content);
					setArLength(res.data.content.length);
					setTotalPage(res.data.totalPages);
				});
		}
	}

	function removeBbsList(chkList) {
		const chkAraay = Array.from(chkList);
		if (confirm('체크한 게시글을 삭제하시겠습니까?')) {
			axios
				.delete('/api/bbs/removeList', {
					params: {
						chkList: chkAraay,
					},
				})
				.then((res) => {
					if (res.data == true) alert('삭제 완료 되었습니다.');
					else alert('삭제 실패 !');
					getData();
				});
		}
	}

	useEffect(() => {
		getData();
	}, [page]);
	//========================

	//체크박스
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
						<Select className='selectBox' value={searchType} onChange={(event) => setSearchType(event.target.value)}>
							<MenuItem value={'title'}>제목</MenuItem>
							<MenuItem value={'writer'}>작성자</MenuItem>
							<MenuItem value={'content'}>내용</MenuItem>
						</Select>
						<TextField className='textfield' variant='outlined' onChange={(event) => setSearchValue(event.target.value)} defaultValue={searchValue} />
						<Button className='search_btn' variant='contained' onClick={search}>
							검색
						</Button>
					</div>
					<div className='bbs_btn'>
						<Button variant='contained' onClick={() => router.push(`write/${1}`)}>
							{/*로그인한 유저 idx로 변경 (!)*/}
							글쓰기
						</Button>
						<Button
							variant='outlined'
							color='error'
							onClick={() => {
								removeBbsList(chkSet);
							}}
						>
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
						<TableRow key={row.id} className={styles.tableRow} onClick={() => router.push(`view/${row.id}?cPage=${page}`)} hover>
							<TableCell align='center'>
								<Checkbox checked={chkSet.has(row.id)} onChange={(event) => checkChange(event, row.id)} onClick={(event) => event.stopPropagation()} />
							</TableCell>
							<TableCell align='center'>{row.id}</TableCell>
							<TableCell className={styles.tableRow}>{row.boTitle}</TableCell>
							<TableCell align='left'>{row.usId}</TableCell>
							<TableCell align='center'>{row.commCount}</TableCell>
							<TableCell align='center'>{row.boHit}</TableCell>
							<TableCell align='center'>{row.boLike}</TableCell>
							<TableCell align='center'>{row.boWritedate}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Pagination className='pagination' count={totalPage} page={page + 1} color='primary' onChange={changePage} />
		</div>
	);
}
