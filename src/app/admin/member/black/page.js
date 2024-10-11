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
	Dialog,
	CircularProgress,
	Checkbox,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import InputAdornment from '@mui/material/InputAdornment';

function EnhancedTable() {
	const router = useRouter();
	const [api_url, setApiUrl] = useState('/api/admin/blocked-jobseekers?size=10');
	const [ar, setAr] = useState([]);
	const [page, setPage] = useState(0);
	const [totalPage, setTotalPage] = useState(0);
	const [searchType, setSearchType] = useState('name');
	const [searchValue, setSearchValue] = useState('');
	const [chkSet, setChkSet] = useState(new Set());
	const [chkAll, setChkAll] = useState(false);
	const [loading, setLoading] = useState(false);
	const initialState = {
		isBlockDatePicker: false,
		isJoinDatePicker: false,
		isLeaveDatePicker: false,
		isBirthDatePicker: false,
		isSalaryRange: false,
		blockStartDate: null,
		blockEndDate: null,
		joinStartDate: null,
		joinEndDate: null,
		leaveStartDate: null,
		leaveEndDate: null,
		birthStartDate: null,
		birthEndDate: null,
		minSalary: '',
		maxSalary: '',
	};
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
			let params = {};
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
			if (state.birthStartDate) {
				params.birthStartDate = dayjs(state.birthStartDate).format('YYYY-MM-DD');
			}
			if (state.birthEndDate) {
				params.birthEndDate = dayjs(state.birthEndDate).format('YYYY-MM-DD');
			}
			if (state.joinStartDate) {
				params.joinStartDate = dayjs(state.joinStartDate).format('YYYY-MM-DD');
			}
			if (state.joinEndDate) {
				params.joinEndDate = dayjs(state.joinEndDate).format('YYYY-MM-DD');
			}
			if (state.leaveStartDate) {
				params.leaveStartDate = dayjs(state.leaveStartDate).format('YYYY-MM-DD');
			}
			if (state.leaveEndDate) {
				params.leaveEndDate = dayjs(state.leaveEndDate).format('YYYY-MM-DD');
			}
			if (state.minSalary) {
				params.minSal = state.minSalary;
			}
			if (state.maxSalary) {
				params.maxSal = state.maxSalary;
			}
			console.log(params);
			const queryString = new URLSearchParams(params).toString();
			setApiUrl(`/api/admin/blocked-jobseekers?size=10&page=${page}&${queryString}`);
		} catch (error) {
			console.error('검색 중 오류 발생:', error);
			alert("검색 중 오류 발생");
		}
	};

	const changePage = (event, value) => {
		setPage(value - 1);
		setApiUrl(`/api/admin/blocked-jobseekers?size=10&page=${value - 1}`);
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
		setChkSet(isChecked ? new Set(ar.map((user) => user.id)) : new Set());
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
			const response = await axios.delete('/api/admin/jobseeker-blocks', {
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
			console.error('삭제 중 오류 발생:', error);
			alert('삭제 중 오류 발생');
		}
	};

	const handleAdd = () => {
		setLoading(true);
		router.push('/admin/member/black/add');
	};

	const handleBlockStartDateChange = (date) => {
		setState({ ...state, blockStartDate: date });
	};

	const handleBlockEndDateChange = (date) => {
		setState({ ...state, blockEndDate: date });
	};

	const handleJoinStartDateChange = (date) => {
		setState({ ...state, joinStartDate: date });
	};

	const handleJoinEndDateChange = (date) => {
		setState({ ...state, joinEndDate: date });
	};

	const handleLeaveStartDateChange = (date) => {
		setState({ ...state, leaveStartDate: date });
	};

	const handleLeaveEndDateChange = (date) => {
		setState({ ...state, leaveEndDate: date });
	};
	const handleBirthStartDateChange = (date) => {
		setState({ ...state, birthStartDate: date });
	};
	const handleBirthEndDateChange = (date) => {
		setState({ ...state, birthEndDate: date });
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
			case 'joinDate':
				newState.isJoinDatePicker = true;
				break;
			case 'leaveDate':
				newState.isLeaveDatePicker = true;
				break;
			case 'sal':
				newState.isSalaryRange = true;
				break;
			case 'birth':
				newState.isBirthDatePicker = true;
				break;
			default:
				break;
		}

		setState(newState);
	};

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden', mt: 3, boxShadow: 3, padding: 5 }}>
			<Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
				<Typography sx={{ flex: '1 1 100%', fontWeight: 'bold', fontFamily: 'pl,sans-serif', fontSize: 30 }} variant="h6" id="tableTitle" component="div" >
					회원 블랙 리스트
				</Typography>
				<Box sx={{ display: 'flex', gap: 1, bgcolor: 'common.white', p: 0.5, borderRadius: 1 }}>
					<FormControl size='small' sx={{ width: '15ch' }}>
						<InputLabel id='category-select-label' sx={{ fontFamily: 'pl,sans-serif' }}>카테고리</InputLabel>
						<Select labelId='category-select-label' id='category-select' value={searchType} sx={{ fontFamily: 'pl,sans-serif' }} label='카테고리' onChange={handleSearchTypeChange}>
							<MenuItem value='bldate' sx={{ fontFamily: 'pl,sans-serif' }}>차단일</MenuItem>
							<MenuItem value='blcontent' sx={{ fontFamily: 'pl,sans-serif' }}>차단사유</MenuItem>
							<MenuItem value='name' sx={{ fontFamily: 'pl,sans-serif' }}>회원명</MenuItem>
							<MenuItem value='birth' sx={{ fontFamily: 'pl,sans-serif' }}>생년월일</MenuItem>
							<MenuItem value='tel' sx={{ fontFamily: 'pl,sans-serif' }}>전화번호</MenuItem>
							<MenuItem value='address' sx={{ fontFamily: 'pl,sans-serif' }}>주소</MenuItem>
							<MenuItem value='edu' sx={{ fontFamily: 'pl,sans-serif' }}>학력</MenuItem>
							<MenuItem value='sal' sx={{ fontFamily: 'pl,sans-serif' }}>월급</MenuItem>
							<MenuItem value='gender' sx={{ fontFamily: 'pl,sans-serif' }}>성별</MenuItem>
							<MenuItem value='joinDate' sx={{ fontFamily: 'pl,sans-serif' }}>가입일자</MenuItem>
							<MenuItem value='leaveDate' sx={{ fontFamily: 'pl,sans-serif' }}>탈퇴일자</MenuItem>
						</Select>
					</FormControl>
					{state.isBlockDatePicker ? (
						<>
							<DatePicker
								selected={state.blockStartDate}
								onChange={handleBlockStartDateChange}
								dateFormat="yyyy-MM-dd"
								customInput={<TextField label="시작 날짜" variant="outlined" size="small" sx={{ width: '12ch' }} />}
							/>
							<DatePicker
								selected={state.blockEndDate}
								onChange={handleBlockEndDateChange}
								dateFormat="yyyy-MM-dd"
								customInput={<TextField label="끝 날짜" variant="outlined" size="small" sx={{ width: '12ch' }} />}
							/>
						</>
					) : state.isBirthDatePicker ? (
						<>
							<DatePicker
								selected={state.birthStartDate}
								onChange={handleBirthStartDateChange}
								dateFormat="yyyy-MM-dd"
								customInput={<TextField label="시작 날짜" variant="outlined" size="small" sx={{ width: '12ch' }} />}
							/>
							<DatePicker
								selected={state.birthEndDate}
								onChange={handleBirthEndDateChange}
								dateFormat="yyyy-MM-dd"
								customInput={<TextField label="끝 날짜" variant="outlined" size="small" sx={{ width: '12ch' }} />}
							/>
						</>
					) : state.isJoinDatePicker ? (
						<>
							<DatePicker
								selected={state.joinStartDate}
								onChange={handleJoinStartDateChange}
								dateFormat="yyyy-MM-dd"
								customInput={<TextField label="시작 날짜" variant="outlined" size="small" sx={{ width: '12ch' }} />}
							/>
							<DatePicker
								selected={state.joinEndDate}
								onChange={handleJoinEndDateChange}
								dateFormat="yyyy-MM-dd"
								customInput={<TextField label="끝 날짜" variant="outlined" size="small" sx={{ width: '12ch' }} />}
							/>
						</>
					) : state.isLeaveDatePicker ? (
						<>
							<DatePicker
								selected={state.leaveStartDate}
								onChange={handleLeaveStartDateChange}
								dateFormat="yyyy-MM-dd"
								customInput={<TextField label="시작 날짜" variant="outlined" size="small" sx={{ width: '12ch' }} />}
							/>
							<DatePicker
								selected={state.leaveEndDate}
								onChange={handleLeaveEndDateChange}
								dateFormat="yyyy-MM-dd"
								customInput={<TextField label="끝 날짜" variant="outlined" size="small" sx={{ width: '12ch' }} />}
							/>
						</>
					) : state.isSalaryRange ? (
						<>
							<TextField label='최소 월급' variant='outlined' size='small' value={state.minSalary} onKeyDown={handleKeyDown} onChange={(e) => setState({ ...state, minSalary: e.target.value })} sx={{ width: '12ch' }} />
							<TextField label='최대 월급' variant='outlined' size='small' value={state.maxSalary} onKeyDown={handleKeyDown} onChange={(e) => setState({ ...state, maxSalary: e.target.value })} sx={{ width: '12ch' }} />
						</>
					) : (
						<TextField label='검색' variant='outlined' size='small' value={searchValue} onKeyDown={handleKeyDown} onChange={(e) => setSearchValue(e.target.value)} sx={{ width: '25ch' }} />
					)}
					<IconButton sx={{ p: '10px' }} aria-label='search'>
						<SearchIcon onClick={handleSearch} />
					</IconButton>
					<Button variant='contained' color='info' onClick={handleAdd} sx={{ fontFamily: 'pl,sans-serif' }}>
						추가
					</Button>
					<Button variant='contained' color='error' onClick={() => handleDelete()} sx={{ fontFamily: 'pl,sans-serif' }}>
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
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif', width: '100px' }} align='center'>
								사진
							</TableCell>
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }} align='center'>
								차단일
							</TableCell>
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }} align='center'>
								차단사유
							</TableCell>
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }} align='center'>
								회원명
							</TableCell>
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }} align='center'>
								생년월일
							</TableCell>
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }} align='center'>
								전화번호
							</TableCell>
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }} align='center'>
								주소
							</TableCell>
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }} align='center'>
								학력
							</TableCell>
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }} align='center'>
								월급
							</TableCell>
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }} align='center'>
								성별
							</TableCell>
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }} align='center'>
								가입일자
							</TableCell>
							<TableCell sx={{ color: 'common.white', fontWeight: 'medium', fontFamily: 'pl,sans-serif' }} align='center'>
								탈퇴여부
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{ar.map((user, idx) => (
							<TableRow key={idx} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell align='center'>
									<Checkbox checked={chkSet.has(user.id)} onChange={(e) => checkChange(e, user.id)} />
								</TableCell>
								<TableCell align='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{user.joImgUrl == null ? <img src='/img/profile.png'/> : <img src={`/s3/${user.joImgUrl}`} alt="회원사진" style={{ width: '50px', height: '50px', display: 'block', margin: 'auto', borderRadius: '50%' }} />}</TableCell>
								<TableCell align='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{user.blDate}</TableCell>
								<TableCell align='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{user.blContent.length > 10 ? user.blContent.substring(0, 10) + '...' : user.blContent}</TableCell>
								<TableCell align='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{user.name ? user.name : '없음'}</TableCell>
								<TableCell align='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>
									{user.joBirth ? (
										<>
											{user.joBirth}
											<br />
											현재 나이: {user.joAge}
										</>
									) : '없음'}
								</TableCell>
								<TableCell align='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{user.joTel ? user.joTel : '없음'}</TableCell>
								<TableCell align='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{user.joAddress ? user.joAddress : '없음'}</TableCell>
								<TableCell align='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{user.joEdu ? user.joEdu : '없음'}</TableCell>
								<TableCell align='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{user.joSal ? user.joSal : '없음'}</TableCell>
								<TableCell align='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{user.joGender ? user.joGender : '없음'}</TableCell>
								<TableCell align='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{user.joinDate ? user.joinDate : '없음'}</TableCell>
								<TableCell align='center' sx={{ whiteSpace: 'normal', wordBreak: 'break-all', fontFamily: 'pl,sans-serif' }}>{user.leaveDate == null ? '활동중' : user.leaveDate}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Pagination onChange={changePage} page={page + 1} count={totalPage} color='primary' style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }} className='pagination' />
			<Dialog open={loading}>
				<CircularProgress />
			</Dialog>
		</Paper>
	);
}

export default EnhancedTable;