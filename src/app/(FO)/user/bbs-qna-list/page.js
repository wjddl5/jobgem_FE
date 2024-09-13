'use client';
import { Button, Checkbox, MenuItem, Pagination, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import styles from '/public/css/board.css';
import axios from 'axios';

// QnA 게시판 리스트
export default function page(props) {
	// 초기화
	const router = useRouter();
	const [ar, setAr] = useState([]);
	const API_URL = '/api/bbs/qna/myList';

	// 페이징
	const [cPage, setCPage] = useState(Number(props.searchParams.cPage));
	const [page, setPage] = useState(cPage ? cPage : 0);
	const [totalPage, setTotalPage] = useState(0);
	const [pageSize, setPageSize] = useState(10);

	function changePage(event, value) {
		setPage(value - 1);
		router.replace(`/user/bbs-qna-list?cPage=${value - 1}`, { shallow: true }); // 뒤로가기에도 원래 페이지로 갈 수 있게 URL수정
	}

	useEffect(() => {
		setPage(cPage ? Math.max(0, Math.min(cPage, totalPage)) : 0);
	}, [cPage, totalPage]);
	//========================

	// 함수
	function getData() {
		axios
			.get(API_URL, {
				params: {
					page: page,
					size: pageSize,
					usIdx: 1, // (!) 로그인한 유저 idx로 변경
				},
			})
			.then((res) => {
				setAr(res.data.content);
				setTotalPage(res.data.totalPages);
			});
	}

	useEffect(() => {
		getData();
	}, [page]);
	//========================

	// 페이지
	return (
		<div>
			<div className='bbs_header'>
				<h2 className='bbs_title'>Q & A</h2>
			</div>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell sx={{ width: '80px' }} align='center'>
							번호
						</TableCell>
						<TableCell sx={{ width: '*' }} align='center'>
							제목
						</TableCell>
						<TableCell sx={{ width: '150px' }} align='center'>
							작성일
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{ar.map((row) => (
						<TableRow key={row.id} className={styles.tableRow} onClick={() => router.push(`bbs-qna-view/${row.id}?cPage=${page}`)} hover>
							<TableCell align='center'>{row.id}</TableCell>
							<TableCell>
								{row.boTitle} &nbsp;&nbsp;| <strong> {row.boAnswer != 1 ? '답변대기' : '답변완료'}</strong>
							</TableCell>
							<TableCell align='center'>{row.boWritedate}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Pagination className='pagination' count={totalPage} page={page + 1} color='primary' onChange={changePage} />
		</div>
	);
}
