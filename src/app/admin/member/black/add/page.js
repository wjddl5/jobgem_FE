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
	Dialog,
	CircularProgress,
} from '@mui/material';

import { useRouter } from 'next/navigation';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

export default function Page(props) {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const [member, setMember] = useState('');
	const [reason, setReason] = useState('');
	const [ar, setAr] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [searchType, setSearchType] = useState('name');
	const api_url = '/api/admin/unblocked-jobseekers';
	const searchParams = props.searchParams;

	useEffect(() => {
		getMemberList();
	}, []);

	useEffect(() => {
		if (props.searchParams) {
			var a = props.searchParams.joIdx;
			for (var i = 0; i < ar.length; i++) {
				if (ar[i].id == a) {
					setMember(ar[i]);
				}
			}
		}
	}, [ar]);

	function getMemberList() {
		axios.get(api_url).then((response) => {
			setAr(response.data);
		});
	}

	// 검색
	const handleSearch = async (e) => {
		if (searchType === '') {
			getMemberList();
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
		if (!member) {
			alert('회원을 선택해주세요.');
			return;
		} else if (reason === '') {
			alert('사유를 입력해주세요.');
			return;
		} else {
			try {
				const response = await axios.post('/api/admin/jobseeker-blocks', {}, {
					params: {
						id: member.id,
						value: reason,
					}
				});
				if (response.status === 200) {
					alert('블랙리스트 추가 성공');
					getMemberList();
					setMember('');
					setReason('');
					if (searchParams.length > 0) {
						axios.get('/api/blackList/process', {
							params: {
								id: props.searchParams.blIdx,
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
		if (member) {
			setMember('');
			setReason('');
		} else {
			setLoading(true);
			router.push('/admin/member/black');
		}
	};

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden', mt: 3, boxShadow: 3, padding: 5 }}>
			<Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
				<Typography sx={{ flex: '1 1 100%', fontWeight: 'bold' }} variant='h6' id='tableTitle' component='div'>
					회원 블랙리스트 추가
				</Typography>
			</Toolbar>
			<Box sx={{ display: 'flex', gap: 2 }}>
				<Box sx={{ width: '30%', borderRight: '1px solid #e0e0e0', paddingRight: 2 }}>
					<Typography variant='h6' gutterBottom>
						회원선택
					</Typography>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2, mt: 2 }}>
						<Typography variant='subtitle1' gutterBottom>
							회원 검색
						</Typography>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
							<FormControl size='small' sx={{ minWidth: 120 }}>
								<InputLabel id='category-select-label'>카테고리</InputLabel>
								<Select labelId='category-select-label' id='category-select' value={searchType} label='카테고리' onChange={(e) => setSearchType(e.target.value)}>
									<MenuItem value='name'>이름</MenuItem>
									<MenuItem value='birth'>생년월일</MenuItem>
									<MenuItem value='tel'>전화번호</MenuItem>
									<MenuItem value='address'>주소</MenuItem>
									<MenuItem value='edu'>학력</MenuItem>
									<MenuItem value='sal'>월급</MenuItem>
									<MenuItem value='gender'>성별</MenuItem>
									<MenuItem value='joinDate'>가입일자</MenuItem>
									<MenuItem value='leaveDate'>탈퇴일자</MenuItem>
								</Select>
							</FormControl>
							<TextField label='검색' variant='outlined' size='small' value={searchValue} sx={{ flexGrow: 1 }} onKeyDown={handleKeyDown} onChange={(e) => setSearchValue(e.target.value)} />
							<IconButton sx={{ p: '8px' }} aria-label='search' onClick={handleSearch}>
								<SearchIcon />
							</IconButton>
						</Box>
					</Box>
					<List sx={{ maxHeight: '500px', overflow: 'auto' }}>
						{ar.map((user, idx) => (
							<ListItem key={idx} button={true.toString()} onClick={() => setMember(user)}>
								<ListItemText
									primary={user.joName}
									secondary={
										<>
											<Typography variant='body2'>전화번호: {user.joTel}</Typography>
											<Typography variant='body2'>성별: {user.joGender}</Typography>
											<Typography variant='body2'>주소: {user.joAddress}</Typography>
											<Typography variant='body2'>학력: {user.joEdu}</Typography>
											<Typography variant='body2'>월급: {user.joSal}</Typography>
											<Typography variant='body2'>사진: {user.joImgUrl ? '있음' : '없음'}</Typography>
											<Typography variant='body2'>가입일자: {user.user.usJoinDate}</Typography>
											<Typography variant='body2'>탈퇴일자: {user.user.usLeaveDate || '활동중'}</Typography>
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
							<Typography variant='subtitle1'>선택한 회원</Typography>
							<TextField
								variant='outlined'
								fullWidth
								value={member ? `${member.id} - ${member.joName} - ${member.joTel}` : '선택한 회원 정보'}
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
