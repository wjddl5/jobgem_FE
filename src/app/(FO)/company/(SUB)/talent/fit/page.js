'use client';

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import Button from '@/components/button/Button';
import InputPopup from '@/components/popup/InputPopup';
import { useRouter } from 'next/navigation';
import {getToken} from "@/app/util/token/token";

function Page() {
	const [userId, setUserId] = useState(0);
	const router = useRouter();
	const [jobseekers, setJobseekers] = useState([]);
	const [loadPage, setLoadPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const [isPopupOpen, setPopupOpen] = useState(false);
	const [jobseekerId, setJobseekerId] = useState(null);

	const inputs = [{ label: '메시지', name: 'ofContent', placeholder: '메시지를 입력하세요', type: 'textarea' }];

	useEffect(() => {
		getToken().then((res) => {
			setUserId(res.IDX);
		})
	}, []);

	// 최초 데이터 패칭 및 페이징
	const fetchData = useCallback(async () => {
		setIsLoading(true);
		try {
			const res = await axios(`/api/company/fit?id=${1}&loadPage=${loadPage}`);
			setJobseekers((prevJobseekers) => [...prevJobseekers, ...res.data.content]);
			setHasMore(!res.data.last);
		} catch (error) {
			console.error('Failed to fetch jobseekers:', error);
		} finally {
			setIsLoading(false);
		}
	}, [loadPage]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	// 무한 스크롤 구현
	const handleScroll = useCallback(() => {
		if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading || !hasMore) return;
		setLoadPage((prevLoadPage) => prevLoadPage + 1);
	}, [isLoading, hasMore]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	// 찜 하기
	const addWishHandler = (id) => {
		if (confirm('해당 인재를 찜목록에 저장하시겠습니까?')) {
			axios
				.post('/api/company/wish', {
						coIdx: userId,
						joIdx: id,
				})
				.then((res) => {
					alert('저장완료되었습니다');
					setJobseekers((prevJobseekers) => prevJobseekers.filter((jobseeker) => jobseeker.id !== id));
				});
		}
	};

	const sendAlert = async () => {
		const data = "입사 제안이 도착했습니다";
		await axios.get(`${process.env.NEXT_PUBLIC_SPRINGBOOT_URL}/api/alert/send/${jobseekerId}/${data}`);
	}

	// 폼 확인 시 제출
	const handleSubmit = async (formData) => {
		await axios
			.post('/api/company/offer', {
					coIdx: userId,
					joIdx: jobseekerId,
					ofContent: formData.ofContent,
			})
			.then((res) => {
				if (confirm('채팅방으로 이동하시겠습니까?')) {
					router.push('/company/chat');
				}
			});
		await sendAlert();
	};

	const offerHandler = (id) => {
		setPopupOpen(true);
		setJobseekerId(id);
	};

	return (
		<>
			<InputPopup
				isOpen={isPopupOpen}
				onClose={() => setPopupOpen(false)}
				title='입사제안 메시지를 입력하세요'
				inputs={inputs} // 여러 개의 입력 필드 전달
				onSubmit={handleSubmit}
			/>
			<div className='flex flex-col p-4 sm:p-8 bg-white min-h-screen rounded-lg'>
				<div className='relative mb-6'>
					<h2 className='text-2xl sm:text-3xl font-bold text-center text-gray-800 relative z-10'>인재 추천</h2>
					<div className='absolute left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-1 bg-blue-500 rounded-full mt-2'></div>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{jobseekers.map((jobseeker, idx) => (
						<div key={idx} className='flex flex-col p-6 bg-white border border-gray-300 rounded-lg shadow-xl transition-shadow duration-300 hover:shadow-2xl hover:border-cyan-300'>
							<div
								style={{ cursor: 'pointer' }}
								onClick={() => {
									router.push(`/company/jobseeker-view/${jobseeker.id}`);
								}}
							>
								<div className='flex items-center mb-4'>
									<div className='w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center'>
										<span className='text-gray-400 text-2xl'>👤</span>
									</div>
									<div className='ml-4'>
										<h3 className='text-lg font-semibold'>
											{jobseeker.joName} (만 {jobseeker.joAge}세)
										</h3>
										<p className='text-blue-500'>{jobseeker.joTel}</p>
									</div>
								</div>
								<p className='text-gray-700 mb-2'>{jobseeker.joAddress}</p>
								<p className='text-gray-500 text-sm mb-2'>{jobseeker.joEdu}</p>
								<div className='flex flex-wrap gap-2 mb-2'>
									{jobseeker.skills.length > 0 ? (
										jobseeker.skills.map((skill, i) => (
											<span key={i} className='px-2 py-1 bg-gray-100 text-sm rounded-md'>
												{skill.skName}
											</span>
										))
									) : (
										<span className='text-gray-500 text-sm'>No skills listed</span>
									)}
								</div>
							</div>
							<div className='flex gap-2 justify-center mt-auto'>
								<Button text='입사 제안' onClick={() => offerHandler(jobseeker.id)} type='submit' />
								<Button text='인재 찜하기' onClick={() => addWishHandler(jobseeker.id)} />
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default Page;
