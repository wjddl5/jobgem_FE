'use client';
import { Button, Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

export default function AdminDashboard() {
	ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Tooltip, Legend, ArcElement);
	const api_url = '/api/admin/posts';
	const [post, setPost] = useState([]);
	const [date, setDate] = useState([]);
	const [type, setType] = useState([]);
	const [location, setLocation] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(api_url);
				const posts = response.data;
				setPost(posts);
				setDate(posts.map((item) => ({ poDate: item.poDate })));
				setType(posts.map((item) => ({ type: item.poSubType })));
				setLocation(posts.map((item) => ({ location: item.poAddr })));
				getFilteredPosts("week", posts);
			} catch (error) {
				console.error('데이터 가져오기 오류:', error);
			}
		};
		fetchData();
	}, []);

	const getWeeklyData = () => {
		const weeklyCount = [0, 0, 0, 0, 0, 0, 0];
		date.forEach((item) => {
			const date = new Date(item.poDate);
			const dayOfWeek = date.getDay();
			weeklyCount[dayOfWeek]++;
		});
		return weeklyCount;
	};

	const getMonthlyData = () => {
		const monthlyCount = Array(12).fill(0);
		date.forEach((item) => {
			const date = new Date(item.poDate);
			const month = date.getMonth();
			monthlyCount[month]++;
		});
		return monthlyCount;
	};

	const getYearlyData = () => {
		const yearlyCount = {};
		date.forEach((item) => {
			const year = new Date(item.poDate).getFullYear();
			yearlyCount[year] = (yearlyCount[year] || 0) + 1;
		});
		return Object.values(yearlyCount);
	};

	const getIndustryData = () => {
		const industryCount = {};
		type.forEach((item) => {
			const industry = item.type;
			industryCount[industry] = (industryCount[industry] || 0) + 1;
		});
		return Object.values(industryCount);
	};

	const getLocationData = () => {
		const locationCount = {};
		location.forEach((item) => {
			const location = item.location;
			locationCount[location] = (locationCount[location] || 0) + 1;
		});
		return Object.values(locationCount);
	};

	const weeklyData = {
		labels: ['일', '월', '화', '수', '목', '금', '토'],
		datasets: [
			{
				label: '주간 공고 수',
				data: getWeeklyData(),
				backgroundColor: '#8884d8',
			},
		],
	};

	const monthlyData = {
		labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		datasets: [
			{
				label: '월간 공고 수',	
				data: getMonthlyData(),
				backgroundColor: '#8884d8',
			},
		],
	};

	const yearlyData = {
		labels: Object.keys(
			date.reduce((acc, item) => {
				const year = new Date(item.poDate).getFullYear();
				acc[year] = true;
				return acc;
			}, {})
		),
		datasets: [
			{
				label: '연간 공고 수', // 추가된 label 속성
				data: getYearlyData(),
				backgroundColor: '#8884d8',
			},
		],
	};

	const industryData = {
		labels: Object.keys(
			type.reduce((acc, item) => {
				const industry = item.type;
				acc[industry] = true;
				return acc;
			}, {})
		),
		datasets: [
			{
				label: '업종별 공고 수', // 추가된 label 속성
				data: getIndustryData(),
				backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
			},
		],
	};

	const locationData = {
		labels: Object.keys(
			location.reduce((acc, item) => {
				const location = item.location;
				acc[location] = true;
				return acc;
			}, {})
		),
		datasets: [
			{
				label: '지역별 공고 수', 
				data: getLocationData(),
				backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			tooltip: {
				enabled: true,
			},
			datalabels: {
				color: '#ffffff', // 라벨 색상
				anchor: 'end', // 라벨 위치
				align: 'top', // 라벨 정렬
			},
		},
	};

	const handlePeriodChange = (e) => {
		getFilteredPosts(e.target.value);
	};

	function getFilteredPosts(date, posts = post) {
		const period = date === 'week' ? 7 : date === 'month' ? 30 : 365;
		const startDate = new Date();
		const endDate = new Date();
		startDate.setDate(endDate.getDate() - period);
		const filteredPosts = posts.filter((post) => {
			const postDate = new Date(post.poDate);
			return postDate >= startDate && postDate <= endDate;
		});
		setFilteredPosts(filteredPosts);
	}

	return (
		<Paper className='max-w-screen-2xl mx-auto p-4 space-y-6 '>
			<Typography sx={{fontFamily: 'pl,sans-serif',fontSize: 30, fontWeight: 'bold', ml: 2}}>공고통계</Typography>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-6 ' >
				<Card className='flex flex-col justify-between p-20'>
					<Typography variant='h5' sx={{fontFamily: 'pl,sans-serif',fontSize: 20, fontWeight: 'bold'}}>주간 공고 수</Typography>
					<CardContent>
						<Bar data={weeklyData} options={options} />
					</CardContent>
					<Typography variant='h5' sx={{fontFamily: 'pl,sans-serif',fontSize: 20, fontWeight: 'bold'}}>월간 공고 수</Typography>
					<CardContent>
						<Bar data={monthlyData} options={options} />
					</CardContent>
					<Typography variant='h5' sx={{fontFamily: 'pl,sans-serif',fontSize: 20, fontWeight: 'bold'}}>연간 공고 수</Typography>
					<CardContent>
						<Line data={yearlyData} options={options} />
					</CardContent>
				</Card>

				<Card className='p-20'>
					<Typography variant='h5' sx={{fontFamily: 'pl,sans-serif',fontSize: 20, fontWeight: 'bold'}}>업종별 분류</Typography>
					<div className='flex justify-center items-center mt-5'>
						<Typography variant='body2' sx={{fontFamily: 'pl,sans-serif',fontSize: 15, fontWeight: 'bold'}}>업종별 공고 분포</Typography>
					</div>
					<CardContent>
						<Pie data={industryData} options={options} />
					</CardContent>
					<Typography variant='h5' sx={{fontFamily: 'pl,sans-serif',fontSize: 20, fontWeight: 'bold'}}>지역별 분류</Typography>
					<div className='flex justify-center items-center mt-5'>
						<Typography variant='body2' sx={{fontFamily: 'pl,sans-serif',fontSize: 15, fontWeight: 'bold'}}>지역별 공고 분포</Typography>
					</div>
					<CardContent>
						<Pie data={locationData} options={options} />
					</CardContent>
				</Card>
			</div>

			<Card className='p-2'>
				<div className='flex justify-between items-center p-3'>
					<Typography variant='h5' sx={{fontFamily: 'pl,sans-serif',fontSize: 20, fontWeight: 'bold'}}>최근 공고 목록</Typography>
					<div className='flex items-center space-x-2 '>
						<FormControl size='small' sx={{ width: '15ch' }}>
							<InputLabel sx={{fontFamily: 'pl,sans-serif',fontSize: 15, fontWeight: 'bold'}} id='week'>기간</InputLabel>
							<Select labelId='period-select-label' id='period-select' label='기간' defaultValue='week' onChange={handlePeriodChange} sx={{fontFamily: 'pl,sans-serif'}}>
								<MenuItem value='week' sx={{fontFamily: 'pl,sans-serif'}}>최근 1주일</MenuItem>
								<MenuItem value='month' sx={{fontFamily: 'pl,sans-serif'}}>최근 1개월</MenuItem>
								<MenuItem value='year' sx={{fontFamily: 'pl,sans-serif'}}>최근 1년</MenuItem>
							</Select>
						</FormControl>
					</div>
				</div>
				<CardContent>
					<Table >
						<TableHead>
							<TableRow>
								<TableCell sx={{fontFamily: 'pl,sans-serif', fontWeight: 'bold', textAlign: 'center'}}>ID</TableCell>
								<TableCell sx={{fontFamily: 'pl,sans-serif', fontWeight: 'bold', textAlign: 'center'}}>제목</TableCell>
								<TableCell sx={{fontFamily: 'pl,sans-serif', fontWeight: 'bold', textAlign: 'center'}}>회사</TableCell>
								<TableCell sx={{fontFamily: 'pl,sans-serif', fontWeight: 'bold', textAlign: 'center'}}>등록일</TableCell>
								<TableCell sx={{fontFamily: 'pl,sans-serif', fontWeight: 'bold', textAlign: 'center'}}>마감일</TableCell>
								<TableCell sx={{fontFamily: 'pl,sans-serif', fontWeight: 'bold', textAlign: 'center'}}>급여</TableCell>
								<TableCell sx={{fontFamily: 'pl,sans-serif', fontWeight: 'bold', textAlign: 'center'}}>업종</TableCell>
								<TableCell sx={{fontFamily: 'pl,sans-serif', fontWeight: 'bold', textAlign: 'center'}}>지역</TableCell>
								<TableCell sx={{fontFamily: 'pl,sans-serif', fontWeight: 'bold', textAlign: 'center'}}>이메일</TableCell>
								<TableCell sx={{fontFamily: 'pl,sans-serif', fontWeight: 'bold', textAlign: 'center'}}>팩스</TableCell>
								<TableCell sx={{fontFamily: 'pl,sans-serif', fontWeight: 'bold', textAlign: 'center'}}>출근 시간</TableCell>
								<TableCell sx={{fontFamily: 'pl,sans-serif', fontWeight: 'bold', textAlign: 'center'}}>퇴근 시간</TableCell>
								<TableCell sx={{fontFamily: 'pl,sans-serif', fontWeight: 'bold', textAlign: 'center'}}>상태</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{filteredPosts.map((post, index) => (
								<TableRow key={index}>
									<TableCell sx={{fontFamily: 'pl,sans-serif', textAlign: 'center'}}>{index + 1}</TableCell>
									<TableCell sx={{fontFamily: 'pl,sans-serif', textAlign: 'center'}}>{post.poTitle}</TableCell>
									<TableCell sx={{fontFamily: 'pl,sans-serif', textAlign: 'center'}}>{post.company.coName}</TableCell>
									<TableCell sx={{fontFamily: 'pl,sans-serif', textAlign: 'center'}}>{post.poDate}</TableCell>
									<TableCell sx={{fontFamily: 'pl,sans-serif', textAlign: 'center'}}>{post.poDeadline}</TableCell>
									<TableCell sx={{fontFamily: 'pl,sans-serif', textAlign: 'center'}}>{post.poSal}</TableCell>
									<TableCell sx={{fontFamily: 'pl,sans-serif', textAlign: 'center'}}>{post.poSubType}</TableCell>
									<TableCell sx={{fontFamily: 'pl,sans-serif', textAlign: 'center'}}>{post.poAddr}</TableCell>
									<TableCell sx={{fontFamily: 'pl,sans-serif', textAlign: 'center'}}>{post.poEmail}</TableCell>
									<TableCell sx={{fontFamily: 'pl,sans-serif', textAlign: 'center'}}>{post.poFax}</TableCell>
									<TableCell sx={{fontFamily: 'pl,sans-serif', textAlign: 'center'}}>{post.wsStartTime === null ? '미지정' : post.wsStartTime}</TableCell>
									<TableCell sx={{fontFamily: 'pl,sans-serif', textAlign: 'center'}}>{post.wsEndTime === null ? '미지정' : post.wsEndTime}</TableCell>
									<TableCell sx={{fontFamily: 'pl,sans-serif', textAlign: 'center'}}>{post.poState === 0 ? '모집중' : post.poState === 1 ? '모집완료' : '종료'}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</Paper>
	);
}
