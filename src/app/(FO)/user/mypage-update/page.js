"use client";
import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import SideMenu from "@/components/sidemenu/SideMenu";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
	const joIdx = 1;
	const [jobseeker, setJobseeker] = useState({});
	const [user, setUser] = useState({});
	const router = useRouter();
	const API_URL = `/api/jobseeker?id=${joIdx}`;

	function getData() {
		axios.get(API_URL).then((res) => {
			setJobseeker(res.data);
			setUser(res.data.user);
			console.log(res);
		});
	}

	function send() {
		axios({
			url: "/api/updateJobseeker",
			method: "get",
			params: {
				id: joIdx,
				joName: joName,
				joGender: joGender,
				joBirth: joBirth,
				joTel: joTel,
				joEdu: joEdu,
				joSal: joSal,
				skills: skills,
				jo_img_url: jo_img_url,
			},
		}).then((res) => {
			console.log(res);
			if (res.status == 200) {
				alert("수정완료");
				router.push(`/user/mypage/${joIdx}`);
			}
		});
	}

	// 생년월일 변경 핸들러
	function handleDateChange(e) {
		setJobseeker((prevState) => ({
			...prevState,
			joBirth: e.target.value,
		}));
	}

	// 기타 입력 필드 변경 핸들러
	function handleInputChange(e) {
		const { name, value } = e.target;
		setJobseeker((prevState) => ({
			...prevState,
			[name]: value,
		}));
	}

	useEffect(() => {
		getData();
	}, []);

	return (
		<div className='bg-gray-100'>
			<div className='flex gap-2'>
				<SideMenu />
				<div className='flex-1 bg-white p-8 rounded-lg shadow-lg'>
					<section className='mb-8'>
						<h2 className='text-lg font-semibold text-gray-700 mb-4'>회원정보 수정</h2>

						<div className='col-span-1 flex flex-col items-center mb-5'>
							<div className='relative'>
								<Image id='profilePreview' className='w-32 h-32 rounded-full border border-gray-300 object-cover' src='' alt='Profile Preview' />
								<Input id='profilePic' type='file' name='joImgUrl' className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer' accept='image/*' />
							</div>
						</div>

						<div className='grid grid-cols-2 gap-4'>
							{/* 이메일 필드 비활성화 */}
							<div>
								<label className='block text-sm font-medium text-gray-700' htmlFor='email'>
									이메일
								</label>
								<Input id='usId' name='usId' type='email' value={user.usId || ""} disabled />
							</div>

							{/* 나머지 필드는 수정 가능 */}
							<div>
								<label className='block text-sm font-medium text-gray-700' htmlFor='name'>
									이름
								</label>
								<Input
									id='name'
									type='text'
									name='joName'
									className='mt-1 block w-full border border-gray-300 rounded p-2'
									value={jobseeker.joName || ""}
									onChange={handleInputChange}
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700' htmlFor='dob'>
									생년월일
								</label>
								<Input
									id='dob'
									type='date'
									name='joBirth'
									className='mt-1 block w-full border border-gray-300 rounded p-2'
									value={jobseeker.joBirth || ""}
									onChange={handleDateChange}
								/>
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700' htmlFor='gender'>
									성별
								</label>
								<Select name='joGender' ar={["M", "F"]} value={jobseeker.joGender || ""} onChange={handleInputChange} />
							</div>

							<div>
								<label className='block text-sm font-medium text-gray-700' htmlFor='edu'>
									학력
								</label>
								<Select name='joGender' ar={["초", "중", "고", "대", "석", "박"]} value={jobseeker.joEdu || ""} onChange={handleInputChange} />
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700' htmlFor='phone'>
									전화번호
								</label>
								<Input name='joTel' className='mt-1 block w-full border border-gray-300 rounded p-2' value={jobseeker.joTel || ""} onChange={handleInputChange} />
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700' htmlFor='phone'>
									희망연봉
								</label>
								<Input name='joSal' className='mt-1 block w-full border border-gray-300 rounded p-2' value={jobseeker.joSal || ""} onChange={handleInputChange} />
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700' htmlFor='address'>
									주소
								</label>
								<Input id='address' name='joAddress' className='mt-1 block w-full border border-gray-300 rounded p-2' value={jobseeker.joAddress || ""} onChange={handleInputChange} />
							</div>
						</div>
					</section>

					<div className='text-center'>
						<Button type='submit' text='수정' onClick={send} />
						<Button text='취소' onClick={() => router.push(`/user/resume-list/${joIdx}`)} />
					</div>
				</div>
			</div>
		</div>
	);
}
