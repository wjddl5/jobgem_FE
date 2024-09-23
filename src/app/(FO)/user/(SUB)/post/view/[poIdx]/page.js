"use client";
import SideMenu from "@/components/sidemenu/SideMenu";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ViewPage(props) {
	useEffect(() => {
		getPosting();
	}, []);
	const [posting, setPosting] = useState(null);
	const [timeLeft, setTimeLeft] = useState("");

	function getPosting() {
		console.log(props.params.poIdx);
		axios
			.get(`/api/posts/${props.params.poIdx}`)
			.then((response) => {
				console.log(response.data);
				setPosting(response.data);
				initTimeLeft(response.data.poDeadline);
			})
			.catch((error) => {
				console.error("Error fetching posting:", error);
			});
	}

	useEffect(() => {
		getPosting();
	}, []);
	useEffect(() => {
		const timer = setInterval(() => {
			updateTimeLeft();
		}, 1000);
		return () => clearInterval(timer);
	}, [posting]);
	function initTimeLeft(poDeadline) {
		const now = new Date();
		const deadline = new Date(poDeadline);
		const difference = deadline - now;
		if (difference > 0) {
			const days = Math.floor(difference / (1000 * 60 * 60 * 24));
			const hours = String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0");
			const minutes = String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0");
			const seconds = String(Math.floor((difference / 1000) % 60)).padStart(2, "0");
			setTimeLeft(`${days}일 ${hours}:${minutes}:${seconds}`);
		}
	}
	function updateTimeLeft() {
		if (posting && posting.poDeadline) {
			const now = new Date();
			const deadline = new Date(posting.poDeadline);
			const difference = deadline - now;
			if (difference > 0) {
				const days = Math.floor(difference / (1000 * 60 * 60 * 24));
				const hours = String(Math.floor((difference / (1000 * 60 * 60)) % 24));
				const minutes = String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0");
				const seconds = String(Math.floor((difference / 1000) % 60)).padStart(2, "0");
				setTimeLeft(`${days}일 ${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`);
			}
		}
	}
	function updateTimeLeft() {
		if (posting && posting.poDeadline) {
			const now = new Date();
			const deadline = new Date(posting.poDeadline);
			const difference = deadline - now;

			if (difference > 0) {
				const days = Math.floor(difference / (1000 * 60 * 60 * 24));
				const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
				const minutes = Math.floor((difference / 1000 / 60) % 60);
				const seconds = Math.floor((difference / 1000) % 60);

				setTimeLeft(`${days}일 ${hours}:${minutes}:${seconds}`);
			} else {
				setTimeLeft("마감됨");
			}
		}
	}
	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='bg-white p-4 rounded-lg flex-1'>
				<h1 className='text-3xl font-bold mb-6'>채용공고 상세보기</h1>
				<div className='bg-white shadow-md rounded-lg p-6 mb-8 flex'>
					<div className='flex-grow w-4/5'>
						<div className='flex justify-between items-center mb-4'>
							<div className='items-center'>
								<div className='flex items-center'>
									<p className=''>{posting && posting.company.coName}</p>
									<button className='border border-red-500 ml-2 text-red-500 text-xs px-1 py-0.5 rounded flex items-center hover:bg-red-50 transition duration-300'>
										<svg xmlns='http://www.w3.org/2000/svg' className='h-4 w-4 mr-1' viewBox='0 0 20 20' fill='currentColor'>
											<path
												fillRule='evenodd'
												d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
												clipRule='evenodd'
											/>
										</svg>
										관심기업
									</button>
								</div>
								<h2 className='text-2xl font-semibold'>{posting && posting.poTitle}</h2>
							</div>
							<div className='flex items-center'>
								<button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>지원하기</button>
							</div>
						</div>
						<hr className='my-4' />
						<div className='grid grid-cols-2 gap-4 '>
							<h3 className='text-xl font-semibold mb-2'>지원자격</h3>
							<h3 className='text-xl font-semibold mb-2'>근무조건</h3>
							<div className='grid grid-cols-2'>
								<p className='text-gray-600'>경력</p>
								<p className='font-medium'>{posting && posting.career && posting.career.map((career) => career.crName).join(", ")}</p>
							</div>
							<div className='grid grid-cols-2'>
								<p className='text-gray-600'>고용형태</p>
								<p className='font-medium'>{posting && posting.hireKind && posting.hireKind.map((hireKind) => hireKind.hkName).join(", ")}</p>
							</div>
							<div className='grid grid-cols-2'>
								<p className='text-gray-600'>스킬</p>
								<p className='font-medium'>{posting && posting.skill && posting.skill.map((skill) => skill.skName).join(", ")}</p>
							</div>
							<div className='grid grid-cols-2'>
								<p className='text-gray-600'>급여</p>
								<p className='font-medium'>{posting && posting.poSalary ? posting.poSalary : "면접후 결정"}</p>
							</div>
						</div>
					</div>
					<div className='ml-8 w-1/5'>
						<div className='bg-gray-100 p-4 rounded-lg h-full'>
							<img src='/img/company-logo.png' alt='Company Logo' className='w-12 h-12 mb-2' />
							<h3 className='text-lg font-semibold mb-2'>{posting && posting.company.coName}</h3>
							<p className='text-sm text-gray-600 mb-2'>기업정보</p>
							<hr className='my-2' />
							<div className='text-sm'>
								<p className='mb-1'>
									<span className='font-medium'>대표자명:</span> {posting && posting.company.coManagerName}
								</p>
								<p className='mb-1'>
									<span className='font-medium'>사원수:</span> {posting && posting.company.coEmployee}
								</p>
								<p className='mb-1'>
									<span className='font-medium'>업종:</span> {posting && posting.company.coType}
								</p>
							</div>
							<div className='mt-4 flex justify-between'>
								<button className='text-blue-500 text-sm'>기업정보</button>
								<button className='text-blue-500 text-sm'>채용정보</button>
							</div>
						</div>
					</div>
				</div>
				<div className='w-1/2 flex mb-4 mx-auto space-x-1 mb-5'>
					<button className='flex-1 py-3 px-4 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50'>
						<span className='mr-2'>✓</span>즉시지원
					</button>
					<button className='flex-1 py-3 px-4 bg-white text-gray-700 font-semibold rounded-md border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50'>
						<span className='mr-2'>☆</span>스크랩
					</button>
				</div>
				<ul className='flex border-t-2 border-black '>
					<li className='flex-grow'>
						<button type='button' className='w-full px-4 py-2 bg-white text-gray-700 hover:bg-gray-200 transition duration-300 border-r  border-gray-300'>
							<span>상세요강</span>
						</button>
					</li>
					<li className='flex-grow'>
						<button
							type='button'
							className='w-full px-4 py-2 bg-gray-150 text-gray-700 hover:bg-gray-50 transition duration-300 border-r border-b border-gray-300 active:bg-white border-b-0'
						>
							<span>접수기간/방법</span>
						</button>
					</li>
					<li className='flex-grow'>
						<button
							type='button'
							className='w-full px-4 py-2 bg-gray-150 text-gray-700 hover:bg-gray-50 transition duration-300 border-r border-b border-gray-300 active:bg-white border-b-0'
						>
							<span>기업정보</span>
						</button>
					</li>
					<li className='flex-grow'>
						<button
							type='button'
							className='w-full px-4 py-2 bg-gray-150 text-gray-700 hover:bg-gray-50 transition duration-300 border-r border-b border-gray-300 active:bg-white border-b-0'
						>
							<span>추천공고</span>
							<span className='ml-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded'>NEW</span>
						</button>
					</li>
				</ul>
				<div className='bg-white shadow-md  p-6 mb-8 '>
					<div dangerouslySetInnerHTML={{ __html: posting && posting.poContent }} />
				</div>
				<h2 className='text-2xl font-bold mb-4'>접수기간/방법</h2>
				<div className='bg-white shadow-md p-6 mb-8 flex '>
					<div className='w-1/4 pr-4 border-r border-gray-200'>
						<div className='flex flex-col items-center mb-4'>
							<svg className='w-6 h-6 mb-2 text-gray-500' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'></path>
							</svg>
							<h3 className='text-xl font-semibold mb-2'>남은시간</h3>
							<div className='text-center'>
								<p className='text-2xl font-bold text-red-500'>{timeLeft}</p>
							</div>
						</div>
						<div className='flex flex-col mb-4'>
							<div className='flex flex-col items-center justify-center mb-2'>
								<div className='text-center mb-2'>
									<p className='text-gray-600'>시작일</p>
									<p className='font-medium'>{posting && posting.poDate}</p>
								</div>
								<div className='text-center'>
									<p className='text-gray-600'>마감일</p>
									<p className='font-medium'>{posting && posting.poDeadline}</p>
								</div>
							</div>
						</div>
					</div>
					<div className='w-3/4 pl-4 border-l border-gray-200'>
						<div className='flex justify-between pl-4 border-b-6  border-black'>
							<div className=''>
								<h3 className='text-xl font-semibold mb-2'>지원방법</h3>
								<p className='text-gray-600'>지원방법: {posting && posting.poSubType}</p>
							</div>
							<button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>바로지원</button>
						</div>

						{posting && posting.poSubType.includes("homepage") && (
							<div className='flex justify-between'>
								<hr className='my-4' />
								<p className='text-gray-600'>홈페이지: {posting && posting.homepageUrl}</p>
								<button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>바로지원</button>
							</div>
						)}
						{posting && posting.poSubType.includes("email") && <p className='text-gray-600'>이메일: {posting && posting.email}</p>}
						{posting && posting.poSubType.includes("fax") && <p className='text-gray-600'>팩스: {posting && posting.fax}</p>}
						{posting && posting.poSubType.includes("post") && <p className='text-gray-600'>우편: {posting && posting.address}</p>}
					</div>
				</div>
				<div className='mt-8 bg-white shadow-md rounded-lg p-6'>
					<h3 className='text-2xl font-semibold mb-4'>기업정보</h3>
					<div className='flex items-start'>
						<img src='/airfirst_logo.png' alt='에어퍼스트 로고' className='w-24 h-24 object-contain mr-6' />
						<div>
							<h4 className='text-xl font-semibold mb-2'>{posting && posting.company.coName}</h4>
							<p className='text-gray-600 mb-2'>대표자명: {posting && posting.company.coManagerName}</p>
							<p className='text-gray-600 mb-2'>업종: {posting && posting.company.coType}</p>
							<p className='text-gray-600 mb-2'>사원수: {posting && posting.company.coEmployee}명</p>
							<p className='text-gray-600 mb-2'>매출액: {posting && posting.company.coSales}억원 (2023년 기준)</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
