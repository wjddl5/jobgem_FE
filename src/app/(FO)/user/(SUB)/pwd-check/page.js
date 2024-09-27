"use client";
import { getToken } from "@/app/util/token/token";
import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import SideMenu from "@/components/sidemenu/SideMenu";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function page() {
	const [login, setLogin] = useState(null); // 초기값을 null로 설정
	const [usId, setUsId] = useState(null); // 초기값을 null로 설정
	const [user, setUser] = useState({});
	const [chkPwd, setChkPwd] = useState(""); // 비밀번호 상태 추가
	const router = useRouter();

	// 로그인된 사용자의 데이터를 가져오는 함수
	function getData() {
		if (login !== null) {
			const API_URL = `/api/jobseeker/${login}`;
			axios.get(API_URL).then((res) => {
				setUser(res.data);
				console.log(res);
			});
		}
	}

	// 비밀번호 검증 및 페이지 전환 함수
	function send() {
		if (login !== null) {
			axios({
				url: `/api/jobseeker/password-check/${login}`,
				method: "get",
				params: {
					usPw: chkPwd, // 입력된 비밀번호를 전송
				},
			})
				.then((res) => {
					router.push(`/user/pwd-update`); // 비밀번호가 일치하면 페이지 이동
				})
				.catch((error) => {
					alert("비밀번호가 일치하지 않습니다."); // 비밀번호 불일치 시 에러 처리
				});
		} else {
			alert("로그인이 필요합니다.");
		}
	}

	// 비밀번호 입력 핸들러
	function handlePwdChange(e) {
		setChkPwd(e.target.value); // 입력된 비밀번호를 상태로 저장
	}

	// login 값을 가져오고 설정하는 useEffect
	useEffect(() => {
		getToken().then((res) => {
			setLogin(res.IDX); // login 값 설정
			setUsId(res.EMAIL); // user ID 값
			console.log(res);
		});
	}, []);

	// login 값이 설정된 후 데이터를 가져오는 useEffect
	useEffect(() => {
		if (login !== null) {
			getData(); // login 값이 설정된 후에만 데이터를 가져옴
		}
	}, [login]);
	return (
		<div className='bg-gray-100 flex-1'>
			<div className='bg-white p-6 rounded-lg shadow-lg mb-6'>
				<h2 className='text-lg font-semibold mb-4'>비밀번호 확인</h2>
				<p className='text-sm text-gray-600 mb-4'>회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번 입력해 주세요.</p>
				<div className='mb-4 '>
					<label htmlFor='username' className='block text-sm font-medium text-gray-700'>
						아이디
					</label>
					<Input type='text' id='joName' name='joName' value={usId || ""} className='mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100' disabled />
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
