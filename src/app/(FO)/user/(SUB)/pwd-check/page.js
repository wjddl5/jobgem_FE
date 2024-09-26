"use client";
import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import SideMenu from "@/components/sidemenu/SideMenu";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
	const login = 1;
	const [user, setUser] = useState({});
	const [chkPwd, setChkPwd] = useState(""); // 비밀번호 상태 추가
	const router = useRouter();

	const API_URL = `/api/jobseeker/${login}`;

	function getData() {
		axios.get(API_URL).then((res) => {
			setUser(res.data);
			console.log(res);
		});
	}

	function send() {
		axios({
			url: `/api/jobseeker/password-check/${login}`,
			method: "get",
			params: {
				usPw: chkPwd, // 입력된 비밀번호를 전송
			},
		})
			.then((res) => {
				router.push(`/user/pwd-update`);
			})
			.catch((error) => {
				alert("비밀번호가 일치하지 않습니다.");
			});
	}

	// 비밀번호 입력 핸들러
	function handlePwdChange(e) {
		setChkPwd(e.target.value); // 입력된 비밀번호를 상태로 저장
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className='bg-gray-100 flex-1'>
			<div className='bg-white p-6 rounded-lg shadow-lg mb-6'>
				<h2 className='text-lg font-semibold mb-4'>비밀번호 확인</h2>
				<p className='text-sm text-gray-600 mb-4'>회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 입력해 주세요.</p>
				<div className='mb-4 '>
					<label htmlFor='username' className='block text-sm font-medium text-gray-700'>
						아이디
					</label>
					<Input type='text' id='joName' name='joName' value={user.joName || ""} className='mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100' disabled />
				</div>
				<div className='mb-6'>
					<label htmlFor='password' className='block text-sm font-medium text-gray-700'>
						비밀번호
					</label>
					<Input type='password' id='chkPwd' name='chkPwd' value={chkPwd} onChange={handlePwdChange} className='mt-1 block w-full p-2 border border-gray-300 rounded-md' />
				</div>
				<div className='flex justify-center'>
					<Button type='submit' text={"확인"} onClick={send} />
					<Button text={"취소"} />
				</div>
			</div>
		</div>
	);
}
