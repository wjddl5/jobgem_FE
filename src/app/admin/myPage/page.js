'use client';
import { Button, TextField } from '@mui/material';
import SideMenu from '@/components/sidemenu/SideMenu';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { getToken } from '@/app/util/token/token';

export default function page() {
	const [chkPwd, setChkPwd] = useState(''); // 비밀번호 상태 추가
	const router = useRouter();
	const [token, setToken] = useState({});
	const API_URL = '/api/admin/password/';

	useEffect(() => {
		getToken().then((res) => {
			setToken(res);
		});
	}, []);

	function send() {
		if (token) {
			axios
				.get(API_URL + token.USIDX, {
					params: {
						usPw: chkPwd, // 입력된 비밀번호를 전송
					},
				})
				.then((res) => {
					if (res.data == 'pwd match') {
						router.push(`/admin/myPage/pwd-update`);
					} else if (res.data == 'pwd mismatch') {
						alert('비밀번호가 일치하지 않습니다.');
					}
				})
				.catch((error) => {
					console.error('에러 발생:', error);
					alert('에러가 발생했습니다.');
				});
		}
	}

	// 비밀번호 입력 핸들러
	function handlePwdChange(e) {
		setChkPwd(e.target.value); // 입력된 비밀번호를 상태로 저장
	}

	const handleCancel = () => {
		if (confirm('비밀번호 변경을 취소하시겠습니까?')) {
			router.push('/admin');
		}
	};

	return (
		<div className='bg-white p-6 rounded-lg shadow-lg flex-1 max-w-md mx-auto'>
			<h2 className='text-lg font-semibold mb-4'>비밀번호 확인</h2>
			<p className='text-sm text-gray-600 mb-4'>회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 입력해 주세요.</p>
			<div className='mb-6'>
				<label htmlFor='password' className='block text-sm font-medium text-gray-700'>
					비밀번호
				</label>
				<TextField
					type='password'
					id='confirmPwd'
					name='confirmPwd'
					style={{ width: '400px' }}
					value={chkPwd}
					onChange={(e) => handlePwdChange(e)} // 비밀번호 확인 입력 핸들러
				/>
			</div>
			<div className='flex justify-center gap-2'>
				<Button type='submit' variant='contained' onClick={send}>
					확인
				</Button>
				<Button variant='contained' color='error' onClick={handleCancel}>
					취소
				</Button>
			</div>
		</div>
	);
}
