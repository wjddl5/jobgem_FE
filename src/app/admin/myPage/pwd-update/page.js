'use client';
import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function page() {
	const [newPwd, setNewPwd] = useState('');
	const [confirmPwd, setConfirmPwd] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const router = useRouter();

	const API_URL = `/api/password`;

	function send() {
		axios({
			url: API_URL,
			method: 'put',
			params: {
				id: 1, //admin idx
				newPwd: newPwd,
			},
		})
			.then((res) => {
				if (res.data == '1') {
					alert('비밀번호가 변경되었습니다');
					router.push(`/admin`); // 비밀번호 변경 후 페이지 이동
				} else if (res.data == '0') {
					alert('비밀번호 변경에 실패했습니다');
				}
			})
			.catch((error) => {
				console.error('에러 발생:', error);
				alert('에러가 발생했습니다.');
			});
	}

	const handleSubmit = () => {
		if (newPwd !== confirmPwd) {
			setErrorMessage('새 비밀번호와 비밀번호 확인이 일치하지 않습니다.');
		} else {
			setErrorMessage('');
			send(); // 비밀번호 확인이 성공하면 send 함수 호출
		}
	};

	const handleCancel = () => {
		if (confirm('비밀번호 변경을 취소하시겠습니까?')) {
			router.push('/admin');
		}
	};

	return (
		<div className='bg-white p-6 rounded-lg shadow-lg flex-1 max-w-md mx-auto'>
			<h2 className='text-lg font-semibold mb-1'>비밀번호 변경</h2>
			<p className='text-sm text-red-600 mb-8'>비밀번호는 주기적(최소 6개월)으로 변경해 주시기 바랍니다.</p>

			{/* 에러 메시지 출력 */}
			{errorMessage && <p className='text-red-600 mb-4'>{errorMessage}</p>}

			<div className='mb-4'>
				<label htmlFor='new-password' className='block text-sm font-medium text-gray-700'>
					비밀번호
				</label>
				<TextField
					type='password'
					id='newPwd'
					name='newPwd'
					style={{ width: '400px' }}
					value={newPwd}
					onChange={(e) => setNewPwd(e.target.value)} // 새로운 비밀번호 입력 핸들러
				/>
			</div>

			<div className='mb-6'>
				<label htmlFor='confirm-password' className='block text-sm font-medium text-gray-700'>
					비밀번호 확인
				</label>
				<TextField
					type='password'
					id='confirmPwd'
					name='confirmPwd'
					style={{ width: '400px' }}
					value={confirmPwd}
					onChange={(e) => setConfirmPwd(e.target.value)} // 비밀번호 확인 입력 핸들러
				/>
			</div>

			<div className='flex justify-center gap-2'>
				<Button type='submit' variant='contained' onClick={handleSubmit}>
					저장
				</Button>
				<Button variant='contained' color='error' onClick={handleCancel}>
					취소
				</Button>
			</div>
		</div>
	);
}
