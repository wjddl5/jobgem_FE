"use client";
import SideMenu from "@/components/sidemenu/SideMenu";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Page(props) {
	const joIdx = props.params.id; // URL에서 전달받은 사용자 ID
	const router = useRouter(); // router 사용

	const API_URL = `/api/deleteUser`; // 탈퇴 API URL

	// 회원 탈퇴 요청 함수
	function send() {
		// 탈퇴 확인 경고창
		if (window.confirm("정말 탈퇴하시겠습니까? 탈퇴 후에는 모든 정보가 삭제됩니다.")) {
			axios({
				url: API_URL,
				method: "get",
				params: {
					id: joIdx, // 사용자 ID 전달
				},
			})
				.then((res) => {
					if (res.data == "1") {
						alert("회원 탈퇴가 완료되었습니다.");
						router.push(`/`); // 탈퇴 후 메인 페이지로 이동
					} else {
						alert("회원 탈퇴에 실패했습니다.");
					}
				})
				.catch((error) => {
					console.error("에러 발생:", error);
					alert("탈퇴 처리 중 에러가 발생했습니다.");
				});
		} else {
			// 취소 버튼을 눌렀을 경우 아무 작업도 하지 않음
			alert("회원 탈퇴가 취소되었습니다.");
		}
	}

	return (
		<div className='flex gap-6'>
			<SideMenu />
			<div className='bg-white p-10 rounded-lg shadow-lg flex-1'>
				<h2 className='text-lg font-semibold mb-4'>회원 탈퇴</h2>
				<p className='text-center mb-6 text-gray-600'>
					회원 탈퇴를 진행하시겠습니까? <br />
					<strong className='text-red-600'>탈퇴 후에는 모든 정보가 삭제됩니다.</strong>
				</p>

				{/* 탈퇴 및 취소 버튼 */}
				<div className='flex justify-center gap-4 mt-8'>
					<button onClick={send} className='bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition-colors'>
						탈퇴
					</button>
					<button onClick={() => router.push(`/user/mypage/${joIdx}`)} className='bg-gray-300 text-gray-800 px-6 py-3 rounded-lg shadow-md hover:bg-gray-400 transition-colors'>
						취소
					</button>
				</div>
			</div>
		</div>
	);
}
