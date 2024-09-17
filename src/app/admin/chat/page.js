'use client';
import { Button, TextField, Box, Typography, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';

export default function ChatPage() {
	const url = '/api/clova/chatbotSend';
	const [inputText, setInputText] = useState('');
	const [responseText, setResponseText] = useState(''); // 응답 데이터를 저장하는 상태
	const [loading, setLoading] = useState(false); // 로딩 상태 관리

	function handleSubmit() {
		setLoading(true); // 전송 시 로딩 시작
		axios
			.get(url, {
				params: {
					inputText: inputText, // inputText를 GET 요청의 파라미터로 전달
				},
			})
			.then((res) => {
				console.log(res.data);
				setResponseText(res.data); // 응답 데이터를 상태로 저장
			})
			.catch((error) => {
				console.error(error);
				setResponseText('Error occurred'); // 에러가 발생할 경우 에러 메시지 설정
			})
			.finally(() => setLoading(false)); // 요청 완료 후 로딩 종료
	}

	return (
		<Box
			sx={{
				width: '100%',
				maxWidth: '600px',
				margin: '0 auto',
				padding: '20px',
				boxSizing: 'border-box',
				backgroundColor: '#f5f5f5',
				borderRadius: '8px',
				boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
			}}
		>
			<Typography variant='h5' gutterBottom>
				실시간 챗봇 대화
			</Typography>

			<Paper elevation={3} sx={{ padding: '15px', marginBottom: '20px' }}>
				<Typography variant='h6'>채팅 입력</Typography>
				<TextField fullWidth variant='outlined' value={inputText} onChange={(event) => setInputText(event.target.value)} placeholder='메시지를 입력하세요...' sx={{ marginBottom: '10px' }} />
				<Button
					variant='contained'
					color='primary'
					onClick={handleSubmit}
					disabled={loading || !inputText.trim()} // 로딩 중이거나 입력이 없을 때 버튼 비활성화
					sx={{ width: '100%' }}
				>
					{loading ? <CircularProgress size={24} /> : '전송'}
				</Button>
			</Paper>

			{responseText && (
				<Paper elevation={3} sx={{ padding: '15px', backgroundColor: '#e0f7fa' }}>
					<Typography variant='h6'>응답 결과</Typography>
					<Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }}>
						{responseText}
					</Typography>
				</Paper>
			)}
		</Box>
	);
}
