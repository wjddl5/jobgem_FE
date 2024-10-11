'use client';
import React, { useEffect, useState } from 'react';
import {
	TextField,
	MenuItem,
	FormControl,
	Select,
	InputLabel,
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Toolbar,
	Typography,
	IconButton,
	Button,
	Pagination,
	CircularProgress,
	Dialog,
	Checkbox,
	InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

const initialState = {
	isBlockDatePicker: false,
	isOpenDatePicker: false,
	isSalesRange: false,
	blockStartDate: null,
	blockEndDate: null,
	openStartDate: null,
	openEndDate: null,
	minSales: '',
	maxSales: '',
};


function EnhancedTable() {
	const router = useRouter();
	const [api_url, setApiUrl] = useState('/api/admin/blocked-companies?size=10');
	const [ar, setAr] = useState([]);
	const [page, setPage] = useState(0);
	const [totalPage, setTotalPage] = useState(0);
	const [searchType, setSearchType] = useState('name');
	const [searchValue, setSearchValue] = useState('');
	const [chkSet, setChkSet] = useState(new Set());
	const [chkAll, setChkAll] = useState(false);
	const [loading, setLoading] = useState(false);
	const [state, setState] = useState(initialState);

	useEffect(() => {
		getBlockList();
	}, [page, api_url]);

	function getBlockList() {
		axios.get(api_url).then((response) => {
			setAr(response.data.content);
			setTotalPage(response.data.totalPages);
			setPage(response.data.pageable.pageNumber);
		});
	}

	const handleSearch = async () => {
		try {
			let params = {
			};
			if (searchType && searchValue) {
				params.searchType = searchType;
				params.searchValue = searchValue;
			}
			if (state.blockStartDate) {
				params.blockStartDate = dayjs(state.blockStartDate).format('YYYY-MM-DD');
			}
			if (state.blockEndDate) {
				params.blockEndDate = dayjs(state.blockEndDate).format('YYYY-MM-DD');
			}
			if (state.openStartDate) {
				params.openStartDate = dayjs(state.openStartDate).format('YYYY-MM-DD');
			}
			if (state.openEndDate) {
				params.openEndDate = dayjs(state.openEndDate).format('YYYY-MM-DD');
			}
			if (state.minSales) {
				params.minSal = state.minSales;
			}
			if (state.maxSales) {
				params.maxSal = state.maxSales;
			}
			const queryString = new URLSearchParams(params).toString();
			setApiUrl(`/api/admin/blocked-companies?size=10&page=${page}&${queryString}`);
		} catch (error) {
			console.error('검색 중 오류 발생:', error);
			alert("검색 중 오류 발생");
		}
	};

	const changePage = (event, value) => {
		setPage(value - 1);
		setApiUrl(`/api/admin/blocked-companies?size=10&page=${value - 1}`);
		setChkSet(new Set());
		setChkAll(false);
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	useEffect(() => {
		setChkAll(chkSet.size === ar.length && ar.length > 0);
	}, [chkSet, ar]);

	function checkChange(event, idx) {
		const newChkSet = new Set(chkSet);
		if (event.target.checked) {
			newChkSet.add(idx);
		} else {
			newChkSet.delete(idx);
		}
		setChkSet(newChkSet);
	}

	function allCheckChange(event) {
		const isChecked = event.target.checked;
		setChkSet(isChecked ? new Set(ar.map((company) => company.id)) : new Set());
	}

	const handleDelete = async () => {
		if (chkSet.size === 0) {
			alert('삭제할 항목을 선택해주세요');
			return;
		}
		const confirm = window.confirm('정말로 삭제하시겠습니까?');
		if (!confirm) {
			return;
		}
		try {
			const response = await axios.delete('/api/admin/company-blocks', {
				params: {
					chkList: Array.from(chkSet).join(','),
				},
			});
			if (response.status === 200) {
				let count = response.data;
				alert(`${count}개의 항목이 삭제되었습니다.`);
				getBlockList();
				setChkSet(new Set());
				setChkAll(false);
			}
		} catch (error) {
			alert('삭제 중 오류 발생');
		}
	};

	const handleAdd = () => {
		setLoading(true);
		router.push('/admin/company/black/add');
	};

	const handleSearchTypeChange = (e) => {
		const value = e.target.value;
		setSearchType(value);
		setSearchValue('');

		const newState = { ...initialState };

		switch (value) {
			case 'bldate':
				newState.isBlockDatePicker = true;
				break;
			case 'open':
				newState.isOpenDatePicker = true;
				break;
			case 'sales':
				newState.isSalesRange = true;
				break;
			default:
				break;
		}

		setState(newState);
	};

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden', mt: 3, boxShadow: 3, padding: 5 }}>
			<Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
				<Typography sx={{ flex: '1 1 100%', fontWeight: 'bold', fontFamily: 'pl,sans-serif', fontSize: 30 }} variant='h6' id='tableTitle' component='div'>
					기업 블랙 리스트
				</Typography>
				<Box sx={{ display: 'flex', gap: 1, bgcolor: 'common.white', p: 0.5, borderRadius: 1 }}>
					<FormControl size='small' sx={{ width: '15ch' }}>
						<InputLabel id='category-select-label' sx={{ fontFamily: 'pl,sans-serif' }}>카테고리</InputLabel>
						<Select
							labelId='category-select-label'
							id='category-select'
							value={searchType}
							label='카테고리'
							onChange={handleSearchTypeChange}
							sx={{ fontFamily: 'pl,sans-serif' }}
						>
							<MenuItem value='bldate' sx={{ fontFamily: 'pl,sans-serif' }}>차단일</MenuItem>
							<MenuItem value='blcontent' sx={{ fontFamily: 'pl,sans-serif' }}>차단사유</MenuItem>
							<MenuItem value='name' sx={{ fontFamily: 'pl,sans-serif' }}>기업명</MenuItem>
							<MenuItem value='number' sx={{ fontFamily: 'pl,sans-serif' }}>기업번호</MenuItem>
							<MenuItem value='tel' sx={{ fontFamily: 'pl,sans-serif' }}>전화번호</MenuItem>
							<MenuItem value='address' sx={{ fontFamily: 'pl,sans-serif' }}>주소</MenuItem>
							<MenuItem value='type' sx={{ fontFamily: 'pl,sans-serif' }}>종류</MenuItem>
							<MenuItem value='open' sx={{ fontFamily: 'pl,sans-serif' }}>개업일</MenuItem>
							<MenuItem value='employee' sx={{ fontFamily: 'pl,sans-serif' }}>직원수</MenuItem>
							<MenuItem value='sales' sx={{ fontFamily: 'pl,sans-serif' }}>매출</MenuItem>
							<MenuItem value='score' sx={{ fontFamily: 'pl,sans-serif' }}>평점</MenuItem>
							<MenuItem value='managerName' sx={{ fontFamily: 'pl,sans-serif' }}>담당자이름</MenuItem>
							<MenuItem value='managerTel' sx={{ fontFamily: 'pl,sans-serif' }}>담당자전화번호</MenuItem>
						</Select>
					</FormControl>
					{state.isBlockDatePicker ? (
						<>
							<DatePicker
								selected={state.blockStartDate}
								onChange={(date) => setState({ ...state, blockStartDate: date })}
								dateFormat="yyyy-MM-dd"
								customInput={<TextField label="시작 날짜" variant="outlined" size="small" sx={{ width: '12ch' }} />}
							/>
							<DatePicker
								selected={state.blockEndDate}
								onChange={(date) => setState({ ...state, blockEndDate: date })}
								dateFormat="yyyy-MM-dd"
								customInput={<TextField label="끝 날짜" variant="outlined" size="small" sx={{ width: '12ch' }} />}
							/>
						</>
					) : state.isOpenDatePicker ? (
						<>
							<DatePicker
								selected={state.openStartDate}
								onChange={(date) => setState({ ...state, openStartDate: date })}
								dateFormat="yyyy-MM-dd"
								customInput={<TextField label="시작 날짜" variant="outlined" size="small" sx={{ width: '12ch' }} />}
							/>
							<DatePicker
								selected={state.openEndDate}
								onChange={(date) => setState({ ...state, openEndDate: date })}
								dateFormat="yyyy-MM-dd"
								customInput={<TextField label="끝 날짜" variant="outlined" size="small" sx={{ width: '12ch' }} />}
							/>
						</>
					) : state.isSalesRange ? (
						<>
							<TextField
								label="최소 매출"
								variant="outlined"
								size="small"
								value={state.minSales}
								onChange={(e) => setState({ ...state, minSales: e.target.value })}
								InputProps={{
									startAdornment: <InputAdornment position="start">₩</InputAdornment>,
								}}
								sx={{ width: '12ch', fontFamily: 'pl,sans-serif' }}
								onKeyDown={handleKeyDown}
							/>
							<TextField
								label="최대 매출"
								variant="outlined"
								size="small"
								value={state.maxSales}
								onChange={(e) => setState({ ...state, maxSales: e.target.value })}
								InputProps={{
									startAdornment: <InputAdornment position="start">₩</InputAdornment>,
								}}
								sx={{ width: '12ch', fontFamily: 'pl,sans-serif' }}
								onKeyDown={handleKeyDown}
							/>
						</>
					) : (
						<TextField
							label="검색"
							variant="outlined"
							size="small"
							value={searchValue}
							sx={{ width: '25ch', fontFamily: 'pl,sans-serif' }}
							onKeyDown={handleKeyDown}
							onChange={(e) => setSearchValue(e.target.value)}
						/>
					)}
					<IconButton sx={{ p: '10px' }} aria-label='search'>
						<SearchIcon onClick={handleSearch} />
					</IconButton>
					<Button variant='contained' color='info' onClick={handleAdd} sx={{ fontFamily: 'pl,sans-serif' }}>
						추가
					</Button>
					<Button variant='contained' color='error' onClick={handleDelete} sx={{ fontFamily: 'pl,sans-serif' }}>
						삭제
					</Button>
				</Box>
			</Toolbar>
			<TableContainer>
				<Table sx={{ minWidth: 750, border: '1px solid #e0e0e0' }} aria-labelledby='tableTitle' size='medium'>
					<TableHead>
						<TableRow sx={{ bgcolor: 'primary.main' }}>
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium' }} align='center'>
								<Checkbox checked={chkAll} onChange={allCheckChange} color='primary' style={{ color: 'white' }} />
							</TableCell>
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }} align='center'>
								차단일
							</TableCell>
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }} align='center'>
								차단사유
							</TableCell>
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }} align='center'>
								기업명
							</TableCell>
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }} align='center'>
								기업번호
							</TableCell>
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }} align='center'>
								주소
							</TableCell>
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }} align='center'>
								전화번호
							</TableCell>
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }} align='center'>
								종류
							</TableCell>
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }} align='center'>
								개업일
							</TableCell>
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }} align='center'>
								직원수
							</TableCell>
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }} align='center'>
								사진
							</TableCell>
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }} align='center'>
								썸네일
							</TableCell>
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }} align='center'>
								매출
							</TableCell>
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }} align='center'>
								평점
							</TableCell>
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }} align='center'>
								담당자 이름
							</TableCell>
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }} align='center'>
								담당자 전화번호
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ar.map((company, index) => (
							<TableRow
								key={index}
								hover
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell align='center'>
									<Checkbox checked={chkSet.has(company.id)} onChange={(e) => checkChange(e, company.id)} />
								</TableCell>
								<TableCell align='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{company.blDate ? company.blDate : '없음'}</TableCell>
								<TableCell align='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{company.blContent.length > 10 ? company.blContent.substring(0, 10) + '...' : company.blContent}</TableCell>
								<TableCell align='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{company.company.coName ? company.company.coName : '없음'}</TableCell>
								<TableCell align='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{company.company.coNumber ? company.company.coNumber : '없음'}</TableCell>
								<TableCell align='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{company.company.coAddress ? company.company.coAddress : '없음'}</TableCell>
								<TableCell align='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{company.company.coTel ? company.company.coTel : '없음'}</TableCell>
								<TableCell align='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{company.company.coType ? company.company.coType : '없음'}</TableCell>
								<TableCell align='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{company.company.coOpen ? company.company.coOpen : '없음'}</TableCell>
								<TableCell align='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{company.company.coEmployee ? company.company.coEmployee : '없음'}</TableCell>
								<TableCell align='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{company.company.coImgUrl == null ? '없음' : <img src={`/s3/${company.company.coImgUrl}`} alt="사진" style={{ width: '50px', height: '50px', display: 'block', margin: 'auto' }} />}</TableCell>
								<TableCell align='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{company.company.coThumbImgUrl == null ? '없음' : <img src={`/s3/${company.company.coThumbImgUrl}`} alt="썸네일" style={{ width: '50px', height: '50px', display: 'block', margin: 'auto' }} />}</TableCell>
								<TableCell align='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{company.company.coSales ? company.company.coSales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '없음'}</TableCell>
								<TableCell align='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{company.company.coScore ? company.company.coScore : '없음'}</TableCell>
								<TableCell align='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{company.company.coManagerName ? company.company.coManagerName : '없음'}</TableCell>
								<TableCell align='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{company.company.coManagerTel ? company.company.coManagerTel : '없음'}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Pagination
				onChange={changePage}
				page={page + 1}
				count={totalPage}
				color='primary'
				style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}
				className='pagination'
			/>
			<Dialog open={loading}>
				<CircularProgress />
			</Dialog>
		</Paper>
	);
}

export default EnhancedTable;