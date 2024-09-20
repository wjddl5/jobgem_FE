'use client';
import { Button, TextField, Box, Typography, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

export default function ChatPage() {
	const url = '/api/clova/chatbotSend';
	const [inputText, setInputText] = useState('');
	const [chatHistory, setChatHistory] = useState([]); // 채팅 히스토리 상태 추가
	const [loading, setLoading] = useState(false); // 로딩 상태 관리
	const chatEndRef = useRef(null);

	function handleSubmit() {
		if (!inputText.trim()) return; // 빈 입력 방지
		setLoading(true); // 전송 시 로딩 시작
		const newChat = { user: 'user', text: inputText }; // 새로운 채팅 메시지

		// 히스토리에 유저 메시지 추가
		setChatHistory((prevChat) => [...prevChat, newChat]);
		setInputText(''); // 입력 필드 초기화

		axios
			.get(url, {
				params: {
					inputText: inputText, // inputText를 GET 요청의 파라미터로 전달
				},
			})
			.then((res) => {
				const botReply = { user: 'bot', text: res.data }; // 봇 응답 메시지
				setChatHistory((prevChat) => [...prevChat, botReply]); // 응답 데이터를 히스토리에 추가
			})
			.catch((error) => {
				console.error(error);
				const errorReply = { user: 'bot', text: 'Error occurred' }; // 에러 발생 시 에러 메시지
				setChatHistory((prevChat) => [...prevChat, errorReply]);
			})
			.finally(() => setLoading(false)); // 요청 완료 후 로딩 종료
	}

	useEffect(() => {
		if (chatEndRef.current) {
			chatEndRef.current.scrollIntoView({ behavior: 'smooth' }); // 스크롤을 부드럽게 하단으로 이동
		}
	}, [chatHistory]);

	return (
		<Box
			sx={{
				width: '100%',
				maxWidth: '650px',
				height: '840px',
				margin: '20px auto',
				padding: '20px',
				boxSizing: 'border-box',
				backgroundColor: '#f5f5f5',
				borderRadius: '8px',
				boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
			}}
		>
			<Typography variant='h5' gutterBottom>
				Ai 상담
			</Typography>

			{/* 채팅 히스토리 */}
			<Paper
				elevation={3}
				sx={{
					padding: '15px',
					height: '600px', // 고정된 높이로 스크롤 가능하게 설정
					overflowY: 'auto',
					marginBottom: '20px',
				}}
			>
				{chatHistory.map((chat, index) => (
					<Box
						key={index}
						sx={{
							display: 'flex',
							justifyContent: chat.user === 'user' ? 'flex-end' : 'flex-start',
							mb: 1,
						}}
					>
						<Paper
							elevation={2}
							sx={{
								padding: '10px',
								maxWidth: '70%',
								backgroundColor: chat.user === 'user' ? '#e0f7fa' : '#ffffff',
							}}
						>
							<Typography variant='body1' sx={{ whiteSpace: 'pre-wrap' }}>
								{chat.text}
							</Typography>
						</Paper>
					</Box>
				))}
				<div ref={chatEndRef} />
			</Paper>

			{/* 채팅 입력 */}
			<Paper elevation={3} sx={{ padding: '15px', position: 'relative' }}>
				<TextField
					fullWidth
					variant='outlined'
					value={inputText}
					onChange={(event) => setInputText(event.target.value)}
					placeholder='메시지를 입력하세요...'
					sx={{ marginBottom: '10px' }}
					onKeyPress={(e) => {
						if (e.key === 'Enter' && !loading && inputText.trim()) {
							handleSubmit();
						}
					}}
				/>
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
		</Box>
	);
}
