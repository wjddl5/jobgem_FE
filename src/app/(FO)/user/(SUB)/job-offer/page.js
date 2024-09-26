"use client";
import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import SideMenu from "@/components/sidemenu/SideMenu";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Pagination from "@/components/pagination/Pagination";

export default function () {
	const login = 151;
	const [totalPages, setTotalPages] = useState("");
	const [curPage, setCurPage] = useState(0);
	const [offers, setOffers] = useState([]);
	const router = useRouter();
	const API_URL = `/api/jobseeker/offers/${login}?curPage=${curPage}`;

	function getData() {
		axios.get(API_URL).then((res) => {
			console.log(res);
			setOffers(res.data.content);
			setTotalPages(res.data.totalPages);
		});
	}

	function clickNo(offerId) {
		alert(`채팅방 퇴장: Offer ID ${offerId}`);
	}

	useEffect(() => {
		getData();
	}, [curPage]);

	return (
		<div className='flex-grow pl-5'>
			<div className='max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8'>
				<h2 className='text-2xl font-bold text-center mb-8'>입사제안</h2> {/* h2를 배경 컨테이너 안으로 이동 */}
				{offers.length > 0 ? (
					offers.map((offer) => (
						<div key={offer.id} className='bg-gray-50 rounded-lg shadow-md mb-4 p-5 hover:shadow-xl transition-shadow duration-300'>
							<div className='flex justify-between items-center'>
								<div className='flex items-center space-x-4'>
									<div className='w-16 h-16 rounded-full overflow-hidden'>
										<Image src='/default-profile.jpg' alt='Profile Picture' width={64} height={64} className='object-cover' />
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
									<Button type='submit' text={"수락"} onClick={() => router.push("/user/chat")} className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md' />
									<Button text={"거절"} onClick={() => clickNo(offer.id)} className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md' />
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
