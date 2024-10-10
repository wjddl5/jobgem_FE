"use client";
import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import React, { useEffect, useState } from "react";
import axios from "axios"; // axios 임포트 추가
import { useRouter } from "next/navigation";
import { getToken } from "@/app/util/token/token";

export default function page() {
	const [login, setLogin] = useState(null); // 초기값을 null로 설정
	const [newPwd, setNewPwd] = useState("");
	const [confirmPwd, setConfirmPwd] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const router = useRouter(); // router 사용

	// 비밀번호 변경 요청 함수
	function send() {
		if (login !== null) {
			const API_URL = `/api/jobseeker/password/${login}`;
			axios({
				url: API_URL,
				method: "put",
				params: {
					newPwd: newPwd,
				},
			})
				.then((res) => {
					alert("비밀번호가 변경되었습니다");
					router.push(`/user`); // 비밀번호 변경 후 페이지 이동
				})
				.catch((error) => {
					alert("에러가 발생했습니다.");
				});
		} else {
			alert("로그인이 필요합니다.");
		}
	}

	// 비밀번호 변경 제출 함수
	const handleSubmit = () => {
		if (newPwd !== confirmPwd) {
			setErrorMessage("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
		} else {
			setErrorMessage("");
			send();
		}
	};

	// login 값을 가져오고 설정하는 useEffect
	useEffect(() => {
		getToken().then((res) => {
			setLogin(res.IDX); // login 값 설정
		});
	}, []);

	return (
		<div className='bg-white p-6 rounded-lg shadow-lg flex-1'>
			<h2 className='text-lg font-semibold mb-4'>비밀번호 변경</h2>
			<p className='text-sm text-red-600 mb-4'>비밀번호는 주기적(최소 6개월)으로 변경해 주시기 바랍니다.</p>

			{/* 에러 메시지 출력 */}
			{errorMessage && <p className='text-red-600 mb-4'>{errorMessage}</p>}

			<div className='mb-4'>
				<label htmlFor='new-password' className='block text-sm font-medium text-gray-700'>
					새로운 비밀번호
				</label>
				<Input
					type='password'
					id='newPwd'
					name='newPwd'
					className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
					value={newPwd}
					onChange={(e) => setNewPwd(e.target.value)} // 새로운 비밀번호 입력 핸들러
				/>
			</div>

			<div className='mb-6'>
				<label htmlFor='confirm-password' className='block text-sm font-medium text-gray-700'>
					새로운 비밀번호 확인
				</label>
				<Input
					type='password'
					id='confirmPwd'
					name='confirmPwd'
					className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
					value={confirmPwd}
					onChange={(e) => setConfirmPwd(e.target.value)} // 비밀번호 확인 입력 핸들러
				/>
			</div>

			<div className='flex justify-center'>
				<Button type='submit' text='수정' onClick={handleSubmit} /> {/* 수정 버튼 클릭 시 handleSubmit 호출 */}
				<Button text='취소' />
			</div>
		</div>
	);
}
