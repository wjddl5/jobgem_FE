'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Button, Paper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function page(props) {
	const api_url = '/api/posts/' + props.params.pid;
	const [ar, setAr] = useState([]);
	const [education, setEducation] = useState([]);
	const [career, setCareer] = useState([]);
	const [skill, setSkill] = useState([]);
	useEffect(() => {
		getPost();
	}, []);

	function getPost() {
		axios.get(api_url).then((res) => {
			console.log(res.data);
			setAr(res.data);
			setEducation(res.data.education.map((el) => el.edName));
			setCareer(res.data.career.map((el) => el.crName));
			setSkill(res.data.skill.map((el) => el.skName));
		});
	}
	console.log(career);
	return (
		<Paper sx={{ p: 4, maxWidth: 800, mx: 'auto', mt: 5, boxShadow: 3, mb: 5, fontFamily: 'pl,sans-serif' }}>
			<Button startIcon={<ArrowBackIcon />} sx={{ mb: 3, fontFamily: 'pl,sans-serif' }} onClick={() => window.history.back()} color='primary'>
				뒤로 가기
			</Button>

			<Typography variant='h4' gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2', mb: 3, fontFamily: 'pl,sans-serif' }}>
				공고 상세 정보
			</Typography>

			<Card sx={{ mb: 4, boxShadow: 2, fontFamily: 'pl,sans-serif' }}>
				<CardContent>
					<Typography variant='h5' gutterBottom sx={{ fontWeight: 'bold', color: '#333', fontFamily: 'pl,sans-serif' }}>
						{ar.poTitle}
					</Typography>
					<Typography variant='subtitle1' gutterBottom sx={{ color: '#666', mb: 2, fontFamily: 'pl,sans-serif' }}>
						회사명: {ar.company?.coName}
					</Typography>
					<Typography variant='body1' paragraph sx={{ mb: 3, fontFamily: 'pl,sans-serif' }} dangerouslySetInnerHTML={{ __html: ar.poContent }}></Typography>
					<Typography variant='body2' sx={{ mb: 1, fontFamily: 'pl,sans-serif' }}>
						<strong>등록일:</strong> {ar.poDate} | <strong>마감일:</strong> {ar.poDeadline}
					</Typography>
					<Typography variant='body2' sx={{ mb: 1, fontFamily: 'pl,sans-serif' }}>
						<strong>급여:</strong> {ar.poSal} | <strong>근무시간:</strong> {ar.poWorkhour}
					</Typography>
					<Typography variant='body2' sx={{ mb: 1, fontFamily: 'pl,sans-serif' }}>
						<strong>고용형태:</strong> {ar.poSubType} | <strong>근무지:</strong> {ar.poAddr}
					</Typography>
					<Typography variant='body2' sx={{ mb: 1, fontFamily: 'pl,sans-serif' }}>
						<strong>이메일:</strong> {ar.poEmail} | <strong>팩스:</strong> {ar.poFax}
					</Typography>
				</CardContent>
			</Card>

			<Card sx={{ mb: 4, boxShadow: 2, fontFamily: 'pl,sans-serif' }}>
				<CardContent>
					<Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold', color: '#1976d2', fontFamily: 'pl,sans-serif' }}>
						회사 정보
					</Typography>
					<Typography variant='body2' sx={{ mb: 1, fontFamily: 'pl,sans-serif' }}>
						<strong>사업자등록번호:</strong> {ar.company?.coNumber}
					</Typography>
					<Typography variant='body2' sx={{ mb: 1, fontFamily: 'pl,sans-serif' }}>
						<strong>주소:</strong> {ar.company?.coAddress}
					</Typography>
					<Typography variant='body2' sx={{ mb: 1, fontFamily: 'pl,sans-serif' }}>
						<strong>전화번호:</strong> {ar.company?.coTel} | <strong>기업형태:</strong> {ar.company?.coType}
					</Typography>
					<Typography variant='body2' sx={{ mb: 1, fontFamily: 'pl,sans-serif' }}>
						<strong>설립일:</strong> {ar.company?.coOpen} | <strong>직원 수:</strong> {ar.company?.coEmployee}명
					</Typography>
					<Typography variant='body2' sx={{ mb: 1, fontFamily: 'pl,sans-serif' }}>
						<strong>매출액:</strong> {ar.company?.coSales} | <strong>기업 평점:</strong> {ar.company?.coScore}
					</Typography>
					<Typography variant='body2' sx={{ mb: 1, fontFamily: 'pl,sans-serif' }}>
						<strong>담당자:</strong> {ar.company?.coManagerName} | <strong>담당자 연락처:</strong> {ar.company?.coManagerTel}
					</Typography>
				</CardContent>
			</Card>
			{education.length > 0 && (
				<Card sx={{ mb: 4, boxShadow: 2, fontFamily: 'pl,sans-serif' }}>
					<CardContent>
						<Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold', color: '#1976d2', fontFamily: 'pl,sans-serif' }}>
							필요 학력
						</Typography>
						<Typography variant='body2' sx={{ mb: 1, fontFamily: 'pl,sans-serif' }}>
							<strong>{education}</strong>
						</Typography>
					</CardContent>
				</Card>
			)}
			{career.length > 0 && (
				<Card sx={{ mb: 4, boxShadow: 2, fontFamily: 'pl,sans-serif' }}>
					<CardContent>
						<Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold', color: '#1976d2', fontFamily: 'pl,sans-serif' }}>
							필요 경력
						</Typography>
						<Typography variant='body2' sx={{ mb: 1, fontFamily: 'pl,sans-serif' }}>
							<strong>{career}</strong>
						</Typography>
					</CardContent>
				</Card>
			)}
			{skill.length > 0 && (
				<Card sx={{ mb: 4, boxShadow: 2, fontFamily: 'pl,sans-serif' }}>
					<CardContent>
						<Typography variant='h6' sx={{ mb: 2, fontWeight: 'bold', color: '#1976d2', fontFamily: 'pl,sans-serif' }}>
							필요 스킬
						</Typography>
						<Typography variant='body2' sx={{ mb: 1, fontFamily: 'pl,sans-serif' }}>
							<strong>{skill.join(', ')}</strong>
						</Typography>
					</CardContent>
				</Card>
			)}
		</Paper>
	);
}
