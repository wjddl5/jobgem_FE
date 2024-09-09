"use client";
import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import SideMenu from "@/components/sidemenu/SideMenu";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page(props) {
	const joIdx = props.params.id;
	const [jobseeker, setJobseeker] = useState({});
	const [user, setUser] = useState({});
	const [skillList, setSkillList] = useState([]);
	const [selectedSkills, setSelectedSkills] = useState([]); // To keep track of selected skills
	const router = useRouter();
	const API_URL = `/api/jobseeker?id=${joIdx}`;

	// 데이터 가져오는 함수
	function getData() {
		axios.get(API_URL).then((res) => {
			setJobseeker(res.data);
			setUser(res.data.user);
			setHaveSkill(res.data.skills);
			setSelectedSkills(res.data.skills.map((skill) => skill.id)); // Initialize selectedSkills with haveSkill IDs
			console.log("jobseeker 데이터:", res.data);
		});
	}

	// 스킬 목록 가져오는 함수
	function getSkillList() {
		axios.get("/api/skillList").then((res) => {
			setSkillList(res.data);
			console.log("skillList:", res.data);
		});
	}

	// 데이터 전송 함수
	function send() {
		console.log("보내기 전 jobseeker 상태 확인:", jobseeker);
		console.log("선택된 스킬 목록:", selectedSkills);

		axios({
			url: "/api/updateMypage",
			method: "get",
			params: {
				id: joIdx,
				joName: jobseeker.joName,
				joGender: jobseeker.joGender,
				joBirth: jobseeker.joBirth,
				joTel: jobseeker.joTel,
				joEdu: jobseeker.joEdu,
				joSal: jobseeker.joSal,
				joAddress: jobseeker.joAddress,
				joImgUrl: jobseeker.joImgUrl,
				skillIds: selectedSkills.length > 0 ? selectedSkills : [], // 선택된 스킬이 없으면 빈 배열을 전송
			},
		})
			.then((res) => {
				console.log(res);
				if (res.status == 200) {
					alert("수정 완료");
					router.push(`/user/mypage/${joIdx}`);
				}
			})
			.catch((error) => {
				console.error("에러 발생:", error);
				alert("수정 중 문제가 발생했습니다.");
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

	// 스킬 선택 변경 핸들러
	function handleSkillChange(e) {
		const skillId = Number(e.target.value); // skillId를 숫자로 변환
		if (e.target.checked) {
			setSelectedSkills((prevSkills) => [...prevSkills, skillId]);
		} else {
			setSelectedSkills((prevSkills) => prevSkills.filter((s) => s !== skillId));
		}
	}

	// 컴포넌트가 마운트될 때 데이터 가져오기
	useEffect(() => {
		getSkillList();
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
							<div>
								<label className='block text-sm font-medium text-gray-700' htmlFor='email'>
									이메일
								</label>
								<Input id='usId' name='usId' type='email' value={user.usId || ""} disabled />
							</div>

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
								<Select name='joEdu' ar={["초", "중", "고", "대", "석", "박"]} value={jobseeker.joEdu || ""} onChange={handleInputChange} />
							</div>
							<div>
								<label className='block text-sm font-medium text-gray-700' htmlFor='joTel'>
									전화번호
								</label>
								<Input name='joTel' className='mt-1 block w-full border border-gray-300 rounded p-2' type='tel' value={jobseeker.joTel || ""} onChange={handleInputChange} />
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
								<Input
									id='joAddress'
									name='joAddress'
									className='mt-1 block w-full border border-gray-300 rounded p-2'
									value={jobseeker.joAddress || ""}
									onChange={handleInputChange}
								/>
							</div>

							{/* Skill List */}
							<div className='col-span-2'>
								<h3 className='text-sm font-medium text-gray-700'>보유 기술</h3>
								<div className='mt-2 grid grid-cols-2 gap-2'>
									{skillList.map((skill) => (
										<div key={skill.id} className='flex items-center'>
											<input
												id={`skill-${skill.id}`}
												type='checkbox'
												value={skill.id}
												checked={selectedSkills.includes(skill.id)} // Skill is checked if it's in selectedSkills
												onChange={handleSkillChange}
												className='h-4 w-4 text-blue-600 border-gray-300 rounded'
											/>
											<label htmlFor={`skill-${skill.id}`} className='ml-2 block text-sm text-gray-900'>
												{skill.skName} {/* 객체의 skName 속성만 렌더링 */}
											</label>
										</div>
									))}
								</div>
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
