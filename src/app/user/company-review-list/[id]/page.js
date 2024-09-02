"use client";
import Button from "@/components/button/Button";
import IconButton from "@/components/button/IconButton";
import SideMenu from "@/components/sidemenu/SideMenu";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";

export default function page(props) {
	const [page, setPage] = useState(0);
	const [review, setReview] = useState([]);
	const API_URL = `/api/reviewList?id=${props.params.id}&page=${page}&size=5`;

	function getData() {
		axios.get(API_URL).then((res) => {
			setReview(res.data.content); // 데이터를 상태에 저장
			console.log(res);
		});
	}

	useEffect(() => {
		getData();
	}, [page]);
	return (
		<div className='flex gap-2'>
			<SideMenu />
			<div className='bg-gray-100 flex-1 ml-2'>
				<div className='bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto'>
					<div className='flex justify-between items-center'>
						<h1 className='text-2xl font-bold'>회사후기</h1>
						<Button type='submit' text='작성하기' />
					</div>
					{review.length > 0 ? (
						review.map((review, index) => (
							<div key={index} className='flex justify-between items-center mb-6 mt-5'>
								<p className='mr-4 font-bold'>{review.coName}</p>
								<div className='flex gap-2 border-l border-l-gray-300 px-3'>
									<IconButton>
										<FiEdit2 />
									</IconButton>
									<IconButton>
										<FiTrash2 />
									</IconButton>
								</div>
							</div>
						))
					) : (
						<p>회사후기가 없습니다.</p>
					)}
				</div>
			</div>
		</div>
	);
}
