'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import axios from 'axios';
import { TextField } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Home() {
	const router = useRouter();
	const api_url = '/api/admin';
	const [userData, setUserData] = useState([]);
	const [postData, setPostData] = useState([]);
	const [countUser, setCountUser] = useState([]);
	const [countUserout, setCountUserout] = useState([]);
	const [countCompany, setCountCompany] = useState([]);
	const [countPost, setCountPost] = useState([]);
	const [countPostout, setCountPostout] = useState([]);
	const [blackUser, setBlackUser] = useState([]);
	const [blackCompany, setBlackCompany] = useState([]);
	const [noblackUser, setNoblackUser] = useState([]);
	const [noblackCompany, setNoblackCompany] = useState([]);
	const [qna, setQna] = useState([]);
	const [countNoAnswer, setCountNoAnswer] = useState([]);
	const [blackList, setBlackList] = useState([]);
	const [noPro, setNoPro] = useState([]);
	const [answerPercentage, setAnswerPercentage] = useState(0);
	const [blackPercentage, setBlackPercentage] = useState(0);
	const [inputUserCount, setInputUserCount] = useState(countUser.length); // 입력된 회원 수
	const [inputCompanyCount, setInputCompanyCount] = useState(countCompany.length); // 입력된 기업 수
	const [inputPostCount, setInputPostCount] = useState(countPost.length); // 입력된 공고 수
	const [userPercent, setUserPercent] = useState(0);
	const [companyPercent, setCompanyPercent] = useState(0);
	const [postPercent, setPostPercent] = useState(0);
	useEffect(() => {
		axios
			.get(api_url + '/users')
			.then((response) => {
				const currentDate = new Date();
				const lastYear = currentDate.getFullYear() - 1;
				const monthlyUserCount = response.data.reduce((acc, user) => {
					const userJoinDate = new Date(user.usJoinDate);
					if (userJoinDate.getFullYear() >= lastYear) {
						const month = userJoinDate.getMonth() + 1;
						acc[month] = (acc[month] || 0) + 1;
					}
					return acc;
				}, {});
				const completeMonthlyUserCount = Array.from({ length: 12 }, (_, index) => monthlyUserCount[index + 1] || 0);
				setUserData(completeMonthlyUserCount);
				setCountUser(response.data.filter((item) => item.usState === 1));
				setCountUserout(response.data.filter((item) => item.usState === 0));
			})
			.catch((error) => console.error('Error fetching data:', error));

		axios
			.get(api_url + '/companies')

			.then((response) => {
				setCountCompany(response.data.content);
			})
			.catch((error) => console.error('Error fetching data:', error));

		axios
			.get('/api/admin/posts')
			.then((response) => {
				const currentDate = new Date();
				const lastYear = currentDate.getFullYear() - 1;
				const monthlyPostCount = response.data.reduce((acc, post) => {
					const postDate = new Date(post.poDate);
					if (postDate.getFullYear() >= lastYear) {
						const month = postDate.getMonth() + 1;
						acc[month] = (acc[month] || 0) + 1;
					}
					return acc;
				}, {});
				const completeMonthlyPostCount = Array.from({ length: 12 }, (_, index) => monthlyPostCount[index + 1] || 0);
				setPostData(completeMonthlyPostCount);
				setCountPost(response.data.filter((item) => item.poState === 1));
				setCountPostout(response.data.filter((item) => item.poState === 0));
			})
			.catch((error) => console.error('Error fetching data:', error));

		axios
			.get(api_url + '/blocked-jobseekers')
			.then((response) => {
				setBlackUser(response.data.content);
			})
			.catch((error) => console.error('Error fetching data:', error));

		axios
			.get(api_url + '/blocked-companies')
			.then((response) => {
				setBlackCompany(response.data.content);
			})
			.catch((error) => console.error('Error fetching data:', error));

		axios
			.get(api_url + '/unblocked-jobseekers')
			.then((response) => {
				setNoblackUser(response.data);
			})
			.catch((error) => console.error('Error fetching data:', error));

		axios
			.get(api_url + '/unblocked-companies')
			.then((response) => {
				setNoblackCompany(response.data);
			})
			.catch((error) => console.error('Error fetching data:', error));

		axios
			.get(api_url + '/unanswered-questions')
			.then((response) => {
				setQna(response.data);
				setCountNoAnswer(response.data.filter((item) => item.boAnswer === 0));
			})
			.catch((error) => console.error('Error fetching data:', error));

		axios
			.get(api_url + '/pending-blacklist')
			.then((response) => {
				setBlackList(response.data);
				setNoPro(response.data.filter((item) => item.blProcess === 0));
			})
			.catch((error) => console.error('Error fetching data:', error));
	}, []);
	useEffect(() => {
		setAreaChartData((prevData) => ({
			...prevData,
			datasets: [
				{
					...prevData.datasets[0],
					data: userData,
				},
			],
		}));
	}, [userData]);

	const [areaChartData, setAreaChartData] = useState({
		labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		datasets: [
			{
				label: '회원 수',
				lineTension: 0.3,
				backgroundColor: 'rgba(78, 115, 223, 1)', // 배경 투명도 증가
				borderColor: 'rgba(78, 115, 223, 1)',
				pointRadius: 3,
				pointBackgroundColor: 'rgba(78, 115, 223, 1)',
				pointBorderColor: 'rgba(78, 115, 223, 1)',
				pointHoverRadius: 3,
				pointHoverBackgroundColor: 'rgba(78, 115, 223, 1)',
				pointHoverBorderColor: 'rgba(78, 115, 223, 1)',
				pointHitRadius: 10,
				pointBorderWidth: 2,
				data: userData,
			},
		],
	});

	function updateAreaData(data, label) {
		setAreaChartData({
			...areaChartData,
			datasets: [
				{
					...areaChartData.datasets[0],
					label: label,
					data: data,
				},
			],
		});
	}

	const areaChartOptions = {
		maintainAspectRatio: false,
		layout: {
			padding: {
				left: 10,
				right: 25,
				top: 25,
				bottom: 0,
			},
		},
		scales: {
			x: {
				time: {
					unit: 'date',
				},
				grid: {
					display: false,
					drawBorder: false,
				},
				ticks: {
					maxTicksLimit: 12,
				},
			},
			y: {
				ticks: {
					maxTicksLimit: 5,
					padding: 10,
				},
				grid: {
					color: 'rgb(234, 236, 244)',
					zeroLineColor: 'rgb(234, 236, 244)',
					drawBorder: false,
					borderDash: [2],
					zeroLineBorderDash: [2],
				},
			},
		},
		plugins: {
			legend: {
				display: false,
			},
			tooltip: {
				backgroundColor: 'rgb(255,255,255)',
				bodyColor: '#858796',
				titleMarginBottom: 10,
				titleColor: '#6e707e',
				titleFontSize: 14,
				borderColor: '#dddfeb',
				borderWidth: 1,
				xPadding: 15,
				yPadding: 15,
				displayColors: false,
				intersect: false,
				mode: 'index',
				caretPadding: 10,
			},
		},
	};

	useEffect(() => {
		setPieChartData((prevData) => ({
			...prevData,
			datasets: [
				{
					...prevData.datasets[0],
					data: [noblackUser.length, blackUser.length],
				},
			],
			labels: ['회원', '차단 회원'],
		}));
	}, [noblackUser.length, blackUser.length]);

	const [pieChartData, setPieChartData] = useState({
		labels: [],
		datasets: [
			{
				data: [],
				backgroundColor: ['#4e73df', '#ff0000'],

				hoverBackgroundColor: ['#2e59d9', '#cc0000'],
				hoverBorderColor: 'rgba(234, 236, 244, 1)',
			},
		],
	});

	function updatePieData(data, label) {
		setPieChartData({
			...pieChartData,
			labels: label,
			datasets: [
				{
					...pieChartData.datasets[0],
					data: data,
				},
			],
		});
	}

	const pieChartOptions = {
		maintainAspectRatio: false,
		tooltips: {
			backgroundColor: 'rgb(255,255,255)',
			bodyFontColor: '#858796',
			borderColor: '#dddfeb',
			borderWidth: 1,
			xPadding: 15,
			yPadding: 15,
			displayColors: false,
			caretPadding: 10,
		},
		legend: {
			display: false,
		},
		cutout: '80%',
	};
	useEffect(() => {
		if (qna.length === 0) {
			setAnswerPercentage(100);
		} else {
			setAnswerPercentage(((qna.length - countNoAnswer.length) / qna.length) * 100);
		}
	}, [countNoAnswer.length, qna.length]);
	useEffect(() => {
		if (blackList.length === 0) {
			setBlackPercentage(100);
		} else {
			setBlackPercentage(((blackList.length - noPro.length) / blackList.length) * 100);
		}
	}, [noPro.length, blackList.length]);
	useEffect(() => {
		setUserPercent(((countUser.length / inputUserCount) * 100).toFixed(0));
		setCompanyPercent(((countCompany.length / inputCompanyCount) * 100).toFixed(0));
		setPostPercent(((countPost.length / inputPostCount) * 100).toFixed(0));
	}, [inputUserCount, inputCompanyCount, inputPostCount, countUser.length, countCompany.length, countPost.length]);
	useEffect(() => {
		if (userPercent > 100) {
			setUserPercent(100);
		} else if (userPercent < 0) {
			setUserPercent(0);
		}
		if (companyPercent > 100) {
			setCompanyPercent(100);
		} else if (companyPercent < 0) {
			setCompanyPercent(0);
		}
		if (postPercent > 100) {
			setPostPercent(100);
		} else if (postPercent < 0) {
			setPostPercent(0);
		}
	}, [userPercent, companyPercent, postPercent]);
	return (
		<div className='w-full bg-gray-100 min-h-screen'>
			<div className='container mx-auto px-4 py-8'>
				<div className='flex items-center justify-between mb-8'>
					<h1 className='text-3xl font-bold text-gray-800'>대시보드</h1>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
					<div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500'>
						<div className='flex items-center '>
							<div className='flex-grow'>
								<div className='text-sm font-bold text-yellow-500 uppercase mb-1'>현재 회원 수</div>
								<div className='text-2xl font-bold text-gray-800'>{countUser.length}</div>
							</div>
							<div className='border-r border-gray-300 h-12 mx-4'></div>
							<div className='flex-grow'>
								<div className='text-sm font-bold text-yellow-500 uppercase mb-1'>탈퇴한 회원 수</div>
								<div className='text-2xl font-bold text-gray-800'>{countUserout.length}</div>
							</div>
							<div className='flex-shrink-0'>
								<i className='fas fa-calendar fa-2x text-gray-300'></i>
							</div>
						</div>
					</div>
					<div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500'>
						<div className='flex items-center'>
							<div className='flex-grow text-center'>
								<div className='text-sm font-bold text-blue-500 uppercase mb-1'>현재 기업 수</div>
								<div className='text-2xl font-bold text-gray-800'>{countCompany.length}</div>
							</div>
							<div className='flex-shrink-0'>
								<i className='fas fa-dollar-sign fa-2x text-gray-300'></i>
							</div>
						</div>
					</div>
					<div className='bg-white rounded-lg shadow-md p-6 border-l-4 border-cyan-500'>
						<div className='flex items-center'>
							<div className='flex-grow'>
								<div className='text-sm font-bold text-cyan-500 uppercase mb-1'>현재 공고 수</div>
								<div className='flex items-center'>
									<div className='text-2xl font-bold text-gray-800 mr-3'>{countPost.length}</div>
								</div>
							</div>
							<div className='border-r border-gray-300 h-12 mx-4'></div>
							<div className='flex-grow'>
								<div className='text-sm font-bold text-cyan-500 uppercase mb-1'>마감 공고 수</div>
								<div className='flex items-center'>
									<div className='text-2xl font-bold text-gray-800 mr-3'>{countPostout.length}</div>
								</div>
							</div>
							<div className='flex-shrink-0'>
								<i className='fas fa-clipboard-list fa-2x text-gray-300'></i>
							</div>
						</div>
					</div>
				</div>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<div className='bg-white rounded-lg shadow-md'>
						<div className='p-4 border-b flex items-center justify-between'>
							<h6 className='text-lg font-bold text-blue-500'>최근 1년 월별 추이</h6>
							<div className='flex items-center gap-2'>
								<button className='px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none' onClick={() => updateAreaData(userData, '회원 가입 수')}>
									회원
								</button>
								<button className='px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 focus:outline-none' onClick={() => updateAreaData(postData, '공고 모집 수')}>
									공고
								</button>
							</div>
						</div>
						<div className='p-4'>
							<div className='relative h-80'>
								<Bar data={areaChartData} options={areaChartOptions} />
							</div>
						</div>
					</div>
					<div className='bg-white rounded-lg shadow-md'>
						<div className='p-4 border-b flex items-center justify-between'>
							<h6 className='text-lg font-bold text-blue-500'>차단 비율</h6>
							<div className='flex items-center gap-2'>
								<button
									className='px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none'
									onClick={() => updatePieData([noblackUser.length, blackUser.length], ['회원', '차단 회원'])}
								>
									회원
								</button>
								<button
									className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none'
									onClick={() => updatePieData([noblackCompany.length, blackCompany.length], ['기업', '차단 기업'])}
								>
									기업
								</button>
							</div>
						</div>
						<div className='p-4'>
							<div className='relative h-64'>
								<Pie data={pieChartData} options={pieChartOptions} />
							</div>
						</div>
					</div>
				</div>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8'>
					<div className='bg-white rounded-lg shadow-md'>
						<div className='p-4 border-b '>
							<h6 className='text-lg text-center font-bold text-blue-500'>달성 현황</h6>
						</div>
						<div className='font-pl pl-2 p-4 flex items-center gap-2'>
							<TextField
								id='outlined-basic'
								label='회원 목표 수 입력'
								variant='outlined'
								type='number'
								defaultValue={countUser.length}
								onChange={(e) => {
									const value = Math.max(0, parseInt(e.target.value, 10));
									setInputUserCount(value);
								}}
							/>
							<TextField
								id='outlined-basic'
								label='기업 목표 수 입력'
								variant='outlined'
								type='number'
								defaultValue={countCompany.length}
								onChange={(e) => {
									const value = Math.max(0, parseInt(e.target.value, 10));
									setInputCompanyCount(value);
								}}
							/>
							<TextField
								id='outlined-basic'
								label='공고 목표 수 입력'
								variant='outlined'
								type='number'
								defaultValue={countPost.length}
								onChange={(e) => {
									const value = Math.max(0, parseInt(e.target.value, 10));
									setInputPostCount(value);
								}}
							/>
						</div>
						<div className='p-4 flex flex-col gap-4'>
							<div className='mb-4'>
								<div className='flex items-center justify-between mb-1'>
									<span className='text-sm font-bold text-gray-800'>회원</span>
									<span className='text-sm font-bold text-gray-800'>{userPercent}%</span>
								</div>
								<div className='h-2 bg-gray-200 rounded-full'>
									<div className='h-2 bg-yellow-500 rounded-full' style={{ width: `${userPercent}%` }}></div>
								</div>
							</div>
							<div className='mb-4'>
								<div className='flex items-center justify-between mb-1'>
									<span className='text-sm font-bold text-gray-800'>기업</span>
									<span className='text-sm font-bold text-gray-800'>{companyPercent}%</span>
								</div>
								<div className='h-2 bg-gray-200 rounded-full'>
									<div className='h-2 bg-blue-500 rounded-full' style={{ width: `${companyPercent}%` }}></div>
								</div>
							</div>
							<div className='mb-4'>
								<div className='flex items-center justify-between mb-1'>
									<span className='text-sm font-bold text-gray-800'>공고</span>
									<span className='text-sm font-bold text-gray-800'>{postPercent}%</span>
								</div>
								<div className='h-2 bg-gray-200 rounded-full'>
									<div className='h-2 bg-cyan-500 rounded-full' style={{ width: `${postPercent}%` }}></div>
								</div>
							</div>
							<div className='mb-4'>
								<div className='flex items-center justify-between mb-1'>
									<span className='text-sm font-bold text-gray-800'>답변</span>
									<span className='text-sm font-bold text-gray-800'>{answerPercentage.toFixed(0)}%</span>
								</div>
								<div className='h-2 bg-gray-200 rounded-full'>
									<div className='h-2 bg-green-500 rounded-full' style={{ width: `${answerPercentage.toFixed(0)}%` }}></div>
								</div>
								{answerPercentage === 100 && (
									<div className='text-sm text-green-600 mt-1'>모든 질문에 답변이 완료되었습니다!</div>
								)}
								{answerPercentage < 100 && (
									<div className='text-sm text-red-600 mt-1'>답변 대기 중인 질문이 있습니다!</div>
								)}
							</div>
							<div className='mb-4'>
								<div className='flex items-center justify-between mb-1'>
									<span className='text-sm font-bold text-gray-800'>신고 처리</span>
									<span className='text-sm font-bold text-gray-800'>{blackPercentage.toFixed(0)}%</span>
								</div>
								<div className='h-2 bg-gray-200 rounded-full'>
									<div className='h-2 bg-red-500 rounded-full' style={{ width: `${blackPercentage.toFixed(0)}%` }}></div>
								</div>
								{blackPercentage === 100 && (
									<div className='text-sm text-green-600 mt-1'>모든 신고가 처리되었습니다!</div>
								)}
								{blackPercentage < 100 && (
									<div className='text-sm text-red-600 mt-1'>처리 대기 중인 신고가 있습니다!</div>
								)}
							</div>
						</div>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div className='bg-green-500 text-white rounded-lg shadow-md p-4'>
							<strong>답변 {countNoAnswer.length > 0 ? `대기 ${countNoAnswer.length}개` : '대기 없음'}</strong>
							<div className='text-white-50 text-sm mt-10'>
								{countNoAnswer.length > 0 &&
									countNoAnswer.slice(0, 8).map((item, index) => (
										<div key={index} className='mb-2 '>
											<div className='bg-white rounded-lg p-2 cursor-pointer flex justify-between' onClick={() => router.push(`admin/bbs/qna/view/${item.id}`)}>
												<div className='text-black text-sm font-semibold truncate'>{item.boTitle.length > 9 ? `${item.boTitle.slice(0, 9)}...` : item.boTitle}</div>
												<div className='flex flex-col gap-2'>
													<div className='text-gray-500 text-xs'>{item.boWritedate}</div>
													<div className='text-black font-semibold text-xs text-right'>{item.usId}</div>
												</div>
											</div>
										</div>
									))}
							</div>
						</div>
						<div className='bg-red-500 text-white rounded-lg shadow-md p-4'>
							<strong>신고 {noPro.length > 0 ? `대기 ${noPro.length}개` : '대기 없음'}</strong>
							<div className='text-white-50 text-sm mt-10'>
								{noPro.length > 0 &&
									noPro.slice(0, 8).map((item, index) => (
										<div key={index} className='mb-2 '>
											<div className='bg-white rounded-lg p-2 cursor-pointer flex justify-between' onClick={() => router.push(`admin/blackList/view/${item.id}`)}>
												<div className='text-black text-sm font-semibold truncate'>{item.blTitle.length > 9 ? `${item.blTitle.slice(0, 9)}...` : item.blTitle}</div>
												<div className='flex flex-col gapㅣ-2'>
													<div className='text-gray-500 text-xs'>{item.blDate}</div>
													<div className='text-black font-semibold text-xs text-right'>{item.usId}</div>
												</div>
											</div>
										</div>
									))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}