"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useKakaoLoader } from 'react-kakao-maps-sdk';
import PostingHeader from '@/components/posting/PostingHeader';
import JobDetails from '@/components/posting/JobDetails';
import ApplicationPeriodMethod from '@/components/posting/ApplicationPeriodMethod';
import CompanyInfo from '@/components/posting/CompanyInfo';
import RecommendedJobs from '@/components/posting/RecommendedJobs';
import NavigationTabs from "@/components/posting/NavigationTabs";

export default function ViewPage(props) {
	const login = 1;
	const [location, setLocation] = useState({lat: 37.566826, lng: 126.9786567});
	const [center, setCenter] = useState({lat: 37.566826, lng: 126.9786567});
	const [posting, setPosting] = useState(null);
	const [timeLeft, setTimeLeft] = useState("");
	const [isInterested, setIsInterested] = useState(false);
	const [isScrap, setIsScrap] = useState(false);
	const router = useRouter();

	useKakaoLoader({
		appkey: process.env.NEXT_PUBLIC_KAKOMAP_API_JAVASCRIPT_KEY,
		libraries: ["services"]
	});

	useEffect(() => {
		getPosting();
	}, []);

	useEffect(() => {
		if (posting && posting.poAddr) {
			addressApi();
			checkInterested();
			checkScrap();
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

	function checkInterested() {
		axios({
			url: `/api/interest/${posting.coIdx}`,
			method: "get",
			params: {
				joIdx: login,
			}
		})
		.then((response) => {
			console.log(response);
			setIsInterested(response.data);
		})
		.catch((error) => {
			console.error("Error checking interested:", error);
		});
	}
	function checkScrap() {
		axios({
			url: `/api/scrap/${posting.id}`,
			method: "get",
			params: {
				joIdx: login,
			}
		})
		.then((response) => {
			console.log(response);
			setIsScrap(response.data);
		})
		.catch((error) => {
			console.error("Error checking scrap:", error);
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

	const handleInterested = () => {
		if (isInterested) {
			setIsInterested(false);
		} else {
			setIsInterested(true);
		}
		axios({
			url: `/api/interest/${posting.coIdx}`,
			method: "post",
			params: {
				joIdx: login,
			}
		})
		.then((response) => {
			console.log(response);
		})
		.catch((error) => {
			console.error("Error interested:", error);
		});
	};

	const handleScrap = () => {
		if (isScrap) {
			setIsScrap(false);
		} else {
			setIsScrap(true);
		}   
		axios({
			url: `/api/scrap/${posting.id}`,
			method: "post",
			params: {
				joIdx: login,
			}
		})
	};

	return (
		<div className='container mx-auto px-4 py-8'>
			<div className='bg-white p-4 rounded-lg flex-1'>
				<h1 className='text-3xl font-bold mb-6'>채용공고 상세보기</h1>
					<PostingHeader posting={posting} send={send} isInterested={isInterested} handleInterested={handleInterested} />
				<div className='w-1/2 flex mb-4 mx-auto space-x-1 mb-5'>
					<button
						className='flex-1 py-3 px-4 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50'
						onClick={send}
					>
						<span className='mr-2'>✓</span>즉시지원
					</button>
					<button 
						className='flex-1 py-3 px-4 bg-white text-gray-700 font-semibold rounded-md border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50'
						onClick={handleScrap}
					>
						<span className='mr-2'>{isScrap ? <span className="text-yellow-400">★</span> : <span className="text-gray-400">☆</span>}</span>
						<span className={isScrap ? "text-black" : "text-gray-400"}>스크랩</span>
					</button>
				</div>
				<NavigationTabs
					scrollToSection={scrollToSection}
					detailsRef={detailsRef}
					applicationRef={applicationRef}
					companyInfoRef={companyInfoRef}
					recommendedRef={recommendedRef}
				/>
				<JobDetails ref={detailsRef} posting={posting} />
				<ApplicationPeriodMethod 
					ref={applicationRef} 
					posting={posting} 
					timeLeft={timeLeft} 
					send={send} 
					location={location} 
					center={center}
				/>
				<CompanyInfo ref={companyInfoRef} posting={posting} />
				<RecommendedJobs ref={recommendedRef} />
			</div>
		</div>
	);
}
