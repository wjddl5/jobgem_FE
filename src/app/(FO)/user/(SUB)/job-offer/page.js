"use client";
import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import SideMenu from "@/components/sidemenu/SideMenu";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Pagination from "@/components/pagination/Pagination";
import { getToken } from "@/app/util/token/token";

export default function () {
	const [login, setLogin] = useState(null); // 초기값을 null로 설정
	const [totalPages, setTotalPages] = useState("");
	const [curPage, setCurPage] = useState(0);
	const [offers, setOffers] = useState([]);
	const router = useRouter();

	// login 값이 있을 때 API 호출
	useEffect(() => {
		getToken().then((res) => {
			setLogin(res.IDX); // login 값 설정
		});
	}, []);

	// login 값이 설정된 후에 데이터 가져오기
	useEffect(() => {
		if (login !== null) {
			getData(); // login 값이 설정된 후에만 데이터 호출
		}
	}, [login, curPage]); // login과 curPage가 변경될 때마다 호출

	// 데이터 가져오기
	function getData() {
		const API_URL = `/api/jobseeker/offers/${login}?curPage=${curPage}`;
		axios.get(API_URL).then((res) => {
			setOffers(res.data.content);
			setTotalPages(res.data.totalPages);
		});
	}

	// 채팅방 퇴장 이벤트
	function clickNo(offerId) {
		const API_URL = `/api/jobseeker/offers/${offerId}/reject`; // API URL에 offerId 포함
		axios
			.put(API_URL)
			.then(() => {
				alert(`채팅방 퇴장: Offer ID ${offerId}`);
				getData(); // 데이터 업데이트 후 다시 로드
			})
			.catch((error) => {
				console.error("Error during offer rejection:", error);
			});
	}

	return (
		<div className='flex-grow pl-5'>
			<div className='max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8'>
				<h2 className='text-2xl font-bold text-center mb-8'>입사제안</h2> {/* h2를 배경 컨테이너 안으로 이동 */}
				{offers?.length > 0 ? (
					offers.map((offer) => (
						<div key={offer.id} className='bg-gray-50 rounded-lg shadow-md mb-4 p-5 hover:shadow-xl transition-shadow duration-300'>
							<div className='flex justify-between items-center'>
								<div className='flex items-center space-x-4'>
									<div className='w-16 h-16 rounded-full '>
										<img src={`/s3/${offer.company.coThumbimgUrl}`} alt='Profile Picture' width={64} height={64} className='object-cover' />
									</div>

									<div>
										<h3 className='text-lg font-semibold'>{offer.company.coName}</h3>
										<p className='text-gray-500'>{offer.company.coType}</p>
										<p className='text-gray-500'>
											<strong>담당자명:</strong> {offer.company.coManagerName}
										</p>
										<p className='text-gray-500'>
											<strong>담당자 번호:</strong> {offer.company.coManagerTel}
										</p>
									</div>
								</div>
								<div className='flex space-x-2'>
									<Button type='submit' text={"채팅방 입장"} onClick={() => router.push("/user/chat")} className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md' />
									<Button text={"채팅방 나가기"} onClick={() => clickNo(offer.id)} className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md' />
								</div>
							</div>
						</div>
					))
				) : (
					<p className='text-center text-gray-400'>제안된 입사 제안이 없습니다.</p>
				)}
				<Pagination totalPages={totalPages} currentPage={curPage} setLoadPage={setCurPage} />
			</div>
		</div>
	);
}
