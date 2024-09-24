"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';

export default function ViewPage(props) {
	const login = 1;
	const [location, setLocation] = useState({lat: 37.566826, lng: 126.9786567});
	const [center, setCenter] = useState({lat: 37.566826, lng: 126.9786567});

	useEffect(() => {
		getPosting();
	}, []);
	const [posting, setPosting] = useState(null);
	const [timeLeft, setTimeLeft] = useState("");

	const router = useRouter();
	

	useKakaoLoader({
		appkey: process.env.NEXT_PUBLIC_KAKOMAP_API_JAVASCRIPT_KEY,
		libraries: ["services"]
	});

	useEffect(() => {
		if (posting && posting.poAddr) {
			addressApi();
		}
	}, [posting]);

	function getPosting() {
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

	function send() {
		axios({
			url: "/api/applyment",
			method: "post",
			params: {
				joIdx: login,
				poIdx: props.params.poIdx,
			},
		}).then((res) => {
			console.log(res);
			if (res.data == "0") {
				alert("이미 지원한 공고입니다.");
			} else {
				if (res.status == 200) {
					alert("지원완료");
					router.push(`/user/apply-company`);
				}
			}
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
				const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
				const minutes = Math.floor((difference / 1000 / 60) % 60);
				const seconds = Math.floor((difference / 1000) % 60);

				setTimeLeft(`${days}일 ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
			} else {
				setTimeLeft("마감됨");
			}
		}
	}

	/* 주소 변경 이벤트*/
    const addressApi = () => {
        axios.get('https://dapi.kakao.com/v2/local/search/keyword.json', {
            params: {
                query: `${posting.poAddr}`,
                page: 1,
                size: 1
            },
            headers: {
                Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKOMAP_API_REST_KEY}`
            }
        })
        .then(response => {
            const data = response.data.documents[0];
            setLocation({
                lat: data.y,
                lng: data.x
            });
            setCenter({
                lat: data.y,
                lng: data.x
            });
        })
        .catch(error => {
            console.error('Error fetching address:', error);
        });
    };

	// Add refs for each section
	const detailsRef = useRef(null);
	const applicationRef = useRef(null);
	const companyInfoRef = useRef(null);
	const recommendedRef = useRef(null);

	// Function to scroll to a section
	const scrollToSection = (ref) => {
		ref.current.scrollIntoView({ behavior: 'smooth' });
	};

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
								<button onClick={send} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
									지원하기
								</button>
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
							<img src={`/s3/${posting && posting.company.coThumbimgUrl}`} alt='Company Logo' className='w-12 h-12 mb-2' />
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
					<button
						className='flex-1 py-3 px-4 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50'
						onClick={send}
					>
						<span className='mr-2'>✓</span>즉시지원
					</button>
					<button className='flex-1 py-3 px-4 bg-white text-gray-700 font-semibold rounded-md border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50'>
						<span className='mr-2'>☆</span>스크랩
					</button>
				</div>
				<ul className='flex border-t-2 border-black '>
					<li className='flex-grow'>
						<button 
							type='button' 
							className='w-full px-4 py-2 bg-white text-gray-700 hover:bg-gray-200 transition duration-300 border-r border-gray-300'
							onClick={() => scrollToSection(detailsRef)}
						>
							<span>상세요강</span>
						</button>
					</li>
					<li className='flex-grow'>
						<button
							type='button'
							className='w-full px-4 py-2 bg-gray-150 text-gray-700 hover:bg-gray-50 transition duration-300 border-r border-b border-gray-300 active:bg-white border-b-0'
							onClick={() => scrollToSection(applicationRef)}
						>
							<span>접수기간/방법</span>
						</button>
					</li>
					<li className='flex-grow'>
						<button
							type='button'
							className='w-full px-4 py-2 bg-gray-150 text-gray-700 hover:bg-gray-50 transition duration-300 border-r border-b border-gray-300 active:bg-white border-b-0'
							onClick={() => scrollToSection(companyInfoRef)}
						>
							<span>기업정보</span>
						</button>
					</li>
					<li className='flex-grow'>
						<button
							type='button'
							className='w-full px-4 py-2 bg-gray-150 text-gray-700 hover:bg-gray-50 transition duration-300 border-r border-b border-gray-300 active:bg-white border-b-0'
							onClick={() => scrollToSection(recommendedRef)}
						>
							<span>추천공고</span>
							<span className='ml-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded'>NEW</span>
						</button>
					</li>
				</ul>
				<div ref={detailsRef} className='bg-white shadow-md p-6 mb-8 '>
					<div dangerouslySetInnerHTML={{ __html: posting && posting.poContent }} />
				</div>
				<h2 ref={applicationRef} className='text-2xl font-bold mb-4'>접수기간/방법</h2>
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
						<div className='flex justify-between pl-4 border-b-2 border-black pb-4 mb-4'>
							<div>
								<h3 className='text-xl font-semibold mb-2'>지원방법</h3>
								<p className='text-gray-600'>아래 지원 방법 중 하나를 선택하세요</p>
							</div>
						</div>

						<div className='space-y-4'>
							{posting && posting.poSubType.includes("jobgem") && (
								<div className='flex justify-between items-center p-3 bg-gray-100 rounded'>
									<p className='text-gray-600'>잡잼지원</p>
									<button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600' onClick={send}>
										바로지원
									</button>
								</div>
							)}
							{posting && posting.poSubType.includes("email") && (
								<div className='flex justify-between items-center p-3 bg-gray-100 rounded'>
									<p className='text-gray-600'>이메일: {posting.poEmail}</p>
									<span>
										<button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600' onClick={() => window.location.href = `mailto:${posting.poEmail}`}>
											이메일 지원
										</button>
									</span>
								</div>
							)}
							{posting && posting.poSubType.includes("fax") && (
								<div className='flex justify-between items-center p-3 bg-gray-100 rounded'>
									<p className='text-gray-600'>팩스: {posting.poFax}</p>
								</div>
							)}
							{posting && posting.poSubType.includes("post") && (
								<div className='flex justify-between items-center p-3 bg-gray-100 rounded'>
									<p className='text-gray-600'>우편: {posting.poAddr}</p>
								</div>
							)}
							{posting && posting.poSubType.includes("visit") && (
								<div className='flex flex-col items-start p-3 bg-gray-100 rounded'>
									<p className='text-gray-600 mb-2'>방문: {posting.poAddr}</p>
									<Map // 지도를 표시할 Container
										id="map"
										center={center}
										style={{
										width: "100%",
										height: "350px",
										}}
										level={3} // 지도의 확대 레벨
									>
									<MapMarker position={location} />
									</Map>
								</div>
							)}
						</div>
					</div>
				</div>
				<div ref={companyInfoRef} className='mt-8 bg-white shadow-md rounded-lg p-6'>
					<h3 className='text-2xl font-semibold mb-4'>기업정보</h3>
					<div className='flex items-start'>
						<img src={`/s3/${posting && posting.company.coThumbimgUrl}`} alt='에어퍼스트 로고' className='w-24 h-24 object-contain mr-6' />
						<div>
							<h4 className='text-xl font-semibold mb-2'>{posting && posting.company.coName}</h4>
							<p className='text-gray-600 mb-2'>대표자명: {posting && posting.company.coManagerName}</p>
							<p className='text-gray-600 mb-2'>업종: {posting && posting.company.coType}</p>
							<p className='text-gray-600 mb-2'>사원수: {posting && posting.company.coEmployee}명</p>
							<p className='text-gray-600 mb-2'>매출액: {posting && posting.company.coSales}억원 (2023년 기준)</p>
						</div>
					</div>
				</div>
				<div ref={recommendedRef} className='mt-8 bg-white shadow-md rounded-lg p-6'>
					<h3 className='text-2xl font-semibold mb-4'>추천공고</h3>
					{/* Add recommended job postings content here */}
				</div>
			</div>
		</div>
	);
}
