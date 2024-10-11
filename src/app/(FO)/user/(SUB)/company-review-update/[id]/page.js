"use client";
import React, { useEffect, useState } from "react";
import Input from "@/components/form/Input";
import { useRouter } from "next/navigation";
import axios from "axios";
import { getToken } from "@/app/util/token/token";

export default function Page(props) {
	const [login, setLogin] = useState("0");
	useEffect(() => {
		getToken().then((res) => {
			setLogin(res.IDX);
		});
	}, []);
	const router = useRouter();
	const [coIdx, setCoIdx] = useState("");
	const [company, setCompany] = useState([]);
	const [reTitle, setReTitle] = useState("");
	const [reContent, setReContent] = useState("");
	const [selectedStars, setSelectedStars] = useState(1);

	function getCompany() {
		axios.get("/api/jobseeker/companies").then((res) => {
			setCompany(res.data); // 받아온 데이터를 상태에 저장
		});
	}

	function getReview() {
		axios.get(`/api/jobseeker/review/${props.params.id}`).then((res) => {
			getCompany();
			const data = res.data;
			setCoIdx(data.coIdx); // 회사 ID 설정
			setReTitle(data.reTitle); // 리뷰 제목 설정
			setReContent(data.reContent); // 리뷰 내용 설정
			setSelectedStars(data.reScore); // 별점 설정
			setCompany(res.data.companyList); // 회사 목록을 상태에 설정
		});
	}

	useEffect(() => {
		getReview(); // 컴포넌트가 마운트될 때 한 번만 실행
	}, []);

	function send() {
		if (!coIdx) {
			alert("회사명을 선택해 주세요.");
			return;
		}
		axios({
			url: "/api/jobseeker/review",
			method: "put", // 업데이트를 위한 PUT 요청
			params: {
				id: props.params.id,
				joIdx: login,
				coIdx: coIdx,
				reTitle: reTitle,
				reContent: reContent,
				reScore: selectedStars, // 선택된 별점 값을 보냄
			},
		}).then((res) => {
			if (res.status === 200) {
				alert("수정 완료");
				router.push(`/user/company-review-list`);
			}
		});
	}

	function handleStarClick(index) {
		setSelectedStars(index);
	}

	return (
		<div className='bg-gray-100 flex-1 ml-2 '>
			<div className='bg-white p-8 rounded-lg '>
				<h2 className='text-2xl font-bold text-center mb-6'>회사후기 수정하기</h2>

				<div className='mb-4'>
					<label htmlFor='coIdx' className='block text-sm font-medium text-gray-700'>
						회사명
					</label>
					<select
						value={coIdx}
						onChange={(e) => setCoIdx(e.target.value)}
						className='w-full rounded py-3 px-[14px] text-body-color text-base border border-[f0f0f0] outline-none focus-visible:shadow-none focus:border-primary'
					>
						<option value=''>회사선택</option>
						{company && company.length > 0 ? (
							company.map((companyItem) => (
								<option key={companyItem.id} value={companyItem.id}>
									{companyItem.coName}
								</option>
							))
						) : (
							<option value=''>회사 정보가 없습니다</option>
						)}
					</select>
				</div>
				<div className='mb-4'>
					<label htmlFor='reTitle' className='block text-sm font-medium text-gray-700'>
						후기 제목
					</label>
					<Input
						type='text'
						id='reTitle'
						name='reTitle'
						placeholder='제목을 입력하세요'
						className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						value={reTitle}
						onChange={(e) => setReTitle(e.target.value)}
					/>
				</div>

				<div className='mb-4'>
					<label htmlFor='reContent' className='block text-sm font-medium text-gray-700'>
						리뷰 내용
					</label>
					<textarea
						id='reContent'
						name='reContent'
						rows='4'
						placeholder='내용을 입력하세요'
						className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
						value={reContent}
						onChange={(e) => setReContent(e.target.value)}
					></textarea>
				</div>

				<div className='mb-6'>
					<label className='block text-sm font-medium text-gray-700'>별점 선택</label>
					<div className='flex items-center justify-center mt-2 space-x-1'>
						{[1, 2, 3, 4, 5].map((star) => (
							<svg
								key={star}
								className={`w-8 h-8 cursor-pointer ${selectedStars >= star ? "text-yellow-500" : "text-gray-300"}`}
								fill='currentColor'
								viewBox='0 0 24 24'
								onClick={() => handleStarClick(star)}
							>
								<path d='M12 .587l3.668 7.431 8.167 1.184-5.894 5.741 1.389 8.091L12 18.897l-7.33 3.853 1.389-8.091L.167 9.202l8.167-1.184z' />
							</svg>
						))}
					</div>
				</div>

				<div className='flex justify-center'>
					<button className='w-full px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600' onClick={send}>
						리뷰 제출하기
					</button>
				</div>
			</div>
		</div>
	);
}
