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
	const [joIdx, setJoIdx] = useState(props.searchParams.joIdx);
	const [blIdx, setBlIdx] = useState(props.searchParams.blIdx);

	useEffect(() => {
		getMemberList();
	}, []);

	useEffect(() => {
		if (joIdx) {
			for (var i = 0; i < ar.length; i++) {
				if (ar[i].id == joIdx) {
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
		try {
			const response = await axios.get(api_url, {
				params: {
					searchType: searchType,
					searchValue: searchValue,
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
		if (reason.length > 255) {
			alert('255자 이내로 입력해주세요.');
			setReason('');
			return;
		}
		// 블랙리스트 추가 로직
		if (!member) {
			alert('회원을 선택해주세요.');
			return;
		} else if (reason === '') {
			alert('사유를 입력해주세요.');
			return;
		} else {
			try {
				const response = await axios.post(
					'/api/admin/jobseeker-blocks',
					{},
					{
						params: {
							joIdx: member.id,
							blContent: reason,
						},
					}
				);
				if (response.status === 201) {
					alert('블랙리스트 추가 성공');
					getMemberList();
					setMember('');
					setReason('');
					if (blIdx) {
						axios.put(`/api/blackList/process/${blIdx}`, null, {
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
				<Typography sx={{ flex: '1 1 100%', fontWeight: 'bold', fontFamily: 'pl,sans-serif', fontSize: 30 }} variant='h6' id='tableTitle' component='div'>
					회원 블랙리스트 추가
				</Typography>
			</Toolbar>
			<Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
				<Box sx={{ width: '30%', borderRight: '1px solid #e0e0e0', paddingRight: 2 }}>
					<Typography variant='h6' gutterBottom sx={{ fontFamily: 'pl,sans-serif', fontSize: 20, fontWeight: 'bold' }}>
						회원선택
					</Typography>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2, mt: 3 }}>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
							<FormControl size='small' sx={{ minWidth: 120 }}>
								<InputLabel id='category-select-label' sx={{ fontFamily: 'pl,sans-serif' }}>
									카테고리
								</InputLabel>
								<Select labelId='category-select-label' id='category-select' value={searchType} label='카테고리' onChange={(e) => setSearchType(e.target.value)} sx={{ fontFamily: 'pl,sans-serif' }}>
									<MenuItem value='name' sx={{ fontFamily: 'pl,sans-serif' }}>
										이름
									</MenuItem>
									<MenuItem value='birth' sx={{ fontFamily: 'pl,sans-serif' }}>
										생년월일
									</MenuItem>
									<MenuItem value='tel' sx={{ fontFamily: 'pl,sans-serif' }}>
										전화번호
									</MenuItem>
									<MenuItem value='address' sx={{ fontFamily: 'pl,sans-serif' }}>
										주소
									</MenuItem>
									<MenuItem value='edu' sx={{ fontFamily: 'pl,sans-serif' }}>
										학력
									</MenuItem>
									<MenuItem value='sal' sx={{ fontFamily: 'pl,sans-serif' }}>
										연봉
									</MenuItem>
									<MenuItem value='gender' sx={{ fontFamily: 'pl,sans-serif' }}>
										성별
									</MenuItem>
									<MenuItem value='joinDate' sx={{ fontFamily: 'pl,sans-serif' }}>
										가입일자
									</MenuItem>
									<MenuItem value='leaveDate' sx={{ fontFamily: 'pl,sans-serif' }}>
										탈퇴일자
									</MenuItem>
								</Select>
							</FormControl>
							<TextField
								label='검색'
								variant='outlined'
								size='small'
								value={searchValue}
								sx={{ flexGrow: 1, fontFamily: 'pl,sans-serif' }}
								onKeyDown={handleKeyDown}
								onChange={(e) => setSearchValue(e.target.value)}
							/>
							<IconButton sx={{ p: '8px' }} aria-label='search' onClick={handleSearch}>
								<SearchIcon />
							</IconButton>
						</Box>
					</Box>
					<List sx={{ maxHeight: '500px', overflow: 'auto' }}>
						{ar.map((user, idx) => (
							<ListItem key={idx} button={true.toString()} onClick={() => setMember(user)}>
								<ListItemText
									primary={user.joName ? user.joName : '없음'}
									secondary={
										<>
											<Typography variant='body2' sx={{ fontFamily: 'pl,sans-serif' }}>
												전화번호: {user.joTel ? user.joTel : '없음'}
											</Typography>
											<Typography variant='body2' sx={{ fontFamily: 'pl,sans-serif' }}>
												성별: {user.joGender ? user.joGender : '없음'}
											</Typography>
											<Typography variant='body2' sx={{ fontFamily: 'pl,sans-serif' }}>
												주소: {user.joAddress ? user.joAddress : '없음'}
											</Typography>
											<Typography variant='body2' sx={{ fontFamily: 'pl,sans-serif' }}>
												학력: {user.joEdu ? user.joEdu : '없음'}
											</Typography>
											<Typography variant='body2' sx={{ fontFamily: 'pl,sans-serif' }}>
												연봉: {user.joSal ? user.joSal : '없음'}
											</Typography>
											<Typography variant='body2' sx={{ fontFamily: 'pl,sans-serif' }}>
												가입일자: {user.user.usJoinDate ? user.user.usJoinDate : '없음'}
											</Typography>
											<Typography variant='body2' sx={{ fontFamily: 'pl,sans-serif' }}>
												탈퇴일자: {user.user.usLeaveDate ? user.user.usLeaveDate : '활동중'}
											</Typography>
											<Divider sx={{ margin: '20px 0' }} />
										</>
									}
								/>
							</ListItem>
						))}
					</List>
				</Box>
				<Box sx={{ width: '70%', paddingLeft: 2 }}>
					<Typography variant='h6' gutterBottom sx={{ fontFamily: 'pl,sans-serif', fontSize: 20, fontWeight: 'bold' }}>
						블랙리스트 추가
					</Typography>
					<form onSubmit={handleSubmit}>
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
							<Typography variant='subtitle1' sx={{ fontFamily: 'pl,sans-serif', fontSize: 15, fontWeight: 'bold' }}>
								선택한 회원
							</Typography>
							<TextField
								variant='outlined'
								fullWidth
								value={member ? `${member.joName ? member.joName : '없음'} ( ${member.joAddress ? member.joAddress : '없음'} / ${member.joGender ? member.joGender : '없음'} )` : '선택한 회원 정보'}
								InputProps={{
									readOnly: true,
								}}
							/>
							<Typography variant='subtitle1' sx={{ fontFamily: 'pl,sans-serif', fontSize: 15, fontWeight: 'bold' }}>
								블랙리스트 사유 입력
							</Typography>
							<TextField variant='outlined' multiline rows={15} value={reason} onChange={(e) => setReason(e.target.value)} />
							<Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
								<Button variant='contained' color='primary' type='submit' sx={{ fontFamily: 'pl,sans-serif' }}>
									추가
								</Button>
								<Button variant='contained' color='secondary' onClick={handleCancel} sx={{ fontFamily: 'pl,sans-serif' }}>
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
