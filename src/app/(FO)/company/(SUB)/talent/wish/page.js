'use client';

import React, { useEffect, useState } from 'react';
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
	const [jobseekerId, setJobseekerId] = useState(0);

	const inputs = [{ label: '메시지', name: 'ofContent', placeholder: '메시지를 입력하세요', type: 'textarea' }];

	const getData = async () => {
		setIsLoading(true);
		const res = await axios(`/api/company/wish?id=${userId}&loadPage=${loadPage}`);
		setJobseekers((prevJobseekers) => [...prevJobseekers, ...res.data.content]);
		setHasMore(!res.data.last);
		setIsLoading(false);
	};
	useEffect(() => {
		getToken().then((res) => {
			setUserId(res.IDX);
		})
	}, []);

	useEffect(() => {
		if (userId > 0)
			getData();
	}, [loadPage, userId]);

	useEffect(() => {
		const handleScroll = () => {
			if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading || !hasMore) return;
			setLoadPage((prevLoadPage) => prevLoadPage + 1);
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, [isLoading, hasMore]);

	const removeWishHandler = (id) => {
		if (confirm('해당 인재를 찜목록에서 삭제하시겠습니까?')) {
			axios
				.delete('/api/company/wish', {
					params: { id },
				})
				.then((res) => {
					alert('삭제 완료했습니다.');
					setJobseekers((prevJobseekers) => prevJobseekers.filter((jobseeker) => jobseeker.id !== id));
				});
		}
	};

	// 만나이 계산
	const calculateAge = (birth) => {
		const birthdate = new Date(birth);
		const today = new Date();
		let age = today.getFullYear() - birthdate.getFullYear();
		const hasBirthdayPassedThisYear = today.getMonth() > birthdate.getMonth() || (today.getMonth() === birthdate.getMonth() && today.getDate() >= birthdate.getDate());
		if (!hasBirthdayPassedThisYear) {
			age--;
		}
		return age;
	};

	// 폼 확인 시 제출
	const handleSubmit = async (formData) => {
		axios
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
	};

	// 제안 버튼 클릭 시
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
					<h2 className='text-2xl sm:text-3xl font-bold text-center text-gray-800 relative z-10'>찜한 인재</h2>
					<div className='absolute left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-1 bg-blue-500 rounded-full mt-2'></div>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{jobseekers.map((item, idx) => (
						<div key={idx} className='flex flex-col p-6 bg-white border border-gray-300 rounded-lg shadow-xl transition-shadow duration-300 hover:shadow-2xl hover:border-cyan-300'>
							<div
								style={{ cursor: 'pointer' }}
								onClick={() => {
									router.push(`/company/jobseeker-view/${item.jobseeker.id}`);
								}}
							>
								<div className='flex items-center mb-4'>
									<div className='w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center'>
										<span className='text-gray-400 text-2xl'>👤</span>
									</div>
									<div className='ml-4'>
										<h3 className='text-lg font-semibold'>
											{item.jobseeker.joName} (만 {calculateAge(item.jobseeker.joBirth)}세)
										</h3>
										<p className='text-blue-500'>{item.jobseeker.joTel}</p>
									</div>
								</div>
								<p className='text-gray-700 mb-2'>{item.jobseeker.joAddress}</p>
								<p className='text-gray-500 text-sm mb-2'>{item.jobseeker.joEdu}</p>
								<div className='flex flex-wrap gap-2 mb-2'>
									{item.jobseeker.skills.length > 0 ? (
										item.jobseeker.skills.map((skill, i) => (
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
								<Button text='입사 제안' type='submit' onClick={() => offerHandler(item.jobseeker.id)} />
								<Button text='찜 삭제' onClick={() => removeWishHandler(item.jobseeker.id)} />
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default Page;
