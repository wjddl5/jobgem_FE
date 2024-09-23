'use client';
import React, { useEffect, useState } from 'react';
import {
	TextField,
	Box,
	Paper,
	Button,
	Typography,
	Toolbar,
	List,
	ListItem,
	ListItemText,
	Divider,
	IconButton,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	CircularProgress,
	Dialog,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

export default function Page(props) {
	const router = useRouter();
	const api_url = '/api/admin/unblocked-companies';
	const [company, setCompany] = useState('');
	const [reason, setReason] = useState('');
	const [ar, setAr] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [searchType, setSearchType] = useState('name');
	const [loading, setLoading] = useState(false);
	const searchParams = props.searchParams;

	useEffect(() => {
		getCompanyList();
	}, []);

	useEffect(() => {
		if (props.searchParams) {
			var a = props.searchParams.coIdx;
			for (var i = 0; i < ar.length; i++) {
				if (ar[i].id == a) {
					setCompany(ar[i]);
				}
			}
		}
	}, [ar]);

	function getCompanyList() {
		axios.get(api_url).then((response) => {
			setAr(response.data);
		});
	}

	// 검색
	const handleSearch = async (e) => {
		if (searchType === '') {
			getCompanyList();
		}
		try {
			const response = await axios.get(api_url, {
				params: {
					type: searchType,
					value: searchValue,
				},
			});
			if (response.status === 200) {
				setAr(response.data);
			} else {
				alert('검색 실패');
			}
		} catch (error) {
			alert('검색 중 오류 발생');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		// 블랙리스트 추가 로직
		if (!company) {
			alert('기업을 선택해주세요.');
			return;
		} else if (reason === '') {
			alert('사유를 입력해주세요.');
			return;
		} else {
			try {
				const response = await axios.post('/api/admin/company-blocks',{}, {
					params: {
						id: company.id,
						value: reason,
					},
				});
				if (response.status === 200) {
					alert('블랙리스트 추가 성공');
					getCompanyList();
					setCompany('');
					setReason('');
					if (props.searchParams == 'R') {
						axios.put(`/api/blackList/process/${props.searchParams.blIdx}`, null, {
							params: {
								nowProcess: 0,
							},
						});
					}
				} else {
					alert('블랙리스트 추가 실패');
				}
			} catch (error) {
				alert('블랙리스트 추가 중 오류 발생');
			}
		}
	};

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};

	const handleCancel = () => {
		if (company) {
			setCompany('');
			setReason('');
		} else {
			router.push('/admin/company/black');
		}
	};

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden', mt: 3, boxShadow: 3, padding: 5 }}>
			<Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
				<Typography sx={{ flex: '1 1 100%', fontWeight: 'bold' }} variant='h6' id='tableTitle' component='div'>
					기업 블랙리스트 추가
				</Typography>
			</Toolbar>
			<Box sx={{ display: 'flex', gap: 2 }}>
				<Box sx={{ width: '30%', borderRight: '1px solid #e0e0e0', paddingRight: 2 }}>
					<Typography variant='h6' gutterBottom>
						기업선택
					</Typography>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2, mt: 2 }}>
						<Typography variant='subtitle1' gutterBottom>
							기업 검색
						</Typography>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
							<FormControl size='small' sx={{ minWidth: 120 }}>
								<InputLabel id='category-select-label'>카테고리</InputLabel>
								<Select labelId='category-select-label' id='category-select' value={searchType} label='카테고리' onChange={(e) => setSearchType(e.target.value)}>
									<MenuItem value='name'>기업명</MenuItem>
									<MenuItem value='number'>기업번호</MenuItem>
									<MenuItem value='tel'>전화번호</MenuItem>
									<MenuItem value='address'>주소</MenuItem>
									<MenuItem value='type'>종류</MenuItem>
									<MenuItem value='open'>개업일</MenuItem>
									<MenuItem value='employee'>직원수</MenuItem>
									<MenuItem value='sales'>매출</MenuItem>
									<MenuItem value='score'>평점</MenuItem>
									<MenuItem value='managerName'>담당자이름</MenuItem>
									<MenuItem value='managerTel'>담당자전화번호</MenuItem>
								</Select>
							</FormControl>
							<TextField label='검색' variant='outlined' size='small' value={searchValue} sx={{ flexGrow: 1 }} onKeyDown={handleKeyDown} onChange={(e) => setSearchValue(e.target.value)} />
							<IconButton sx={{ p: '8px' }} aria-label='search' onClick={handleSearch}>
								<SearchIcon />
							</IconButton>
						</Box>
					</Box>
					<List sx={{ maxHeight: '500px', overflow: 'auto' }}>
						{ar.map((company, idx) => (
							<ListItem key={idx} button={true.toString()} onClick={() => setCompany(company)}>
								<ListItemText
									primary={company.coName}
									secondary={
										<>
											<Typography variant='body2'>기업명: {company.coName}</Typography>
											<Typography variant='body2'>기업번호: {company.coNumber}</Typography>
											<Typography variant='body2'>주소: {company.coAddress}</Typography>
											<Typography variant='body2'>전화번호: {company.coTel}</Typography>
											<Typography variant='body2'>종류: {company.coType}</Typography>
											<Typography variant='body2'>개업일: {company.coOpen}</Typography>
											<Typography variant='body2'>직원수: {company.coEmployee}</Typography>
											<Typography variant='body2'>매출: {company.coSales}</Typography>
											<Typography variant='body2'>평점: {company.coScore}</Typography>
											<Typography variant='body2'>담당자 이름: {company.coManagerName}</Typography>
											<Typography variant='body2'>담당자 전화번호: {company.coManagerTel}</Typography>
											<Divider sx={{ margin: '20px 0' }} />
										</>
									}
								/>
							</ListItem>
						))}
					</List>
				</Box>
				<Box sx={{ width: '70%', paddingLeft: 2 }}>
					<Typography variant='h6' gutterBottom>
						블랙리스트 추가
					</Typography>
					<form onSubmit={handleSubmit}>
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
							<Typography variant='subtitle1'>선택한 기업</Typography>
							<TextField
								variant='outlined'
								fullWidth
								value={company ? `${company.id} - ${company.coName} - ${company.coTel}` : '선택한 기업 정보'}
								InputProps={{
									readOnly: true,
								}}
							/>
							<Typography variant='subtitle1'>블랙리스트 사유 입력</Typography>
							<TextField variant='outlined' multiline rows={15} value={reason} onChange={(e) => setReason(e.target.value)} />
							<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
								<Button variant='contained' color='primary' type='submit'>
									추가
								</Button>
								<Button variant='contained' color='secondary' onClick={handleCancel}>
									취소
								</Button>
							</Box>
						</Box>
					</form>
				</Box>
			</Box>
			<Dialog open={loading} onClose={handleCancel}>
				<CircularProgress />
			</Dialog>
		</Paper>
	);
}
