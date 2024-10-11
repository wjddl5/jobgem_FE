"use client";
import { getToken } from "@/app/util/token/token";
import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
	const [login, setLogin] = useState(null); // 초기값을 null로 설정
	const [jobseeker, setJobseeker] = useState({});
	const [user, setUser] = useState({});
	const [skillList, setSkillList] = useState([]);
	const [selectedSkills, setSelectedSkills] = useState([]);
	const [selectedFile, setSelectedFile] = useState(null); // 파일이 선택되었는지 추적
	const [previewUrl, setPreviewUrl] = useState(""); // 이미지 미리보기 URL 저장
	const router = useRouter();

	// 데이터 가져오는 함수
	function getData() {
		if (login !== null) {
			const API_URL = `/api/jobseeker/${login}`;
			axios.get(API_URL).then((res) => {
				setJobseeker(res.data);
				setUser(res.data.user);
				setSelectedSkills(res.data.skills.map((skill) => skill.id));
			});
		}
	}

	// 스킬 목록 가져오는 함수
	function getSkillList() {
		axios.get("/api/jobseeker/skills").then((res) => {
			setSkillList(res.data);
		});
	}

	// 파일 업로드 함수
	async function uploadFile(file) {
		const formData = new FormData();
		formData.append("file", file);

		try {
			const res = await axios.post("/api/files/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			// 업로드된 파일의 URL에서 파일 이름만 추출
			const fileUrl = res.data;
			const fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1); // '/' 마지막 위치부터 끝까지 잘라내기

			return fileName; // 추출한 파일 이름 반환
		} catch (error) {
			console.error("파일 업로드 실패:", error);
			alert("파일 업로드 중 문제가 발생했습니다.");
			return null;
		}
	}

	// 파일 선택 핸들러
	function handleFileChange(e) {
		const file = e.target.files[0];
		if (file) {
			setSelectedFile(file); // 선택된 파일 상태 저장

			// 미리보기 이미지 URL 생성
			const newPreviewUrl = URL.createObjectURL(file);
			setPreviewUrl(newPreviewUrl); // 미리보기 이미지 URL 업데이트
		}
	}

	// 데이터 전송 함수
	async function send() {
		try {
			// 파일이 선택된 경우, 파일 업로드 후 jobseeker 정보 업데이트
			if (selectedFile) {
				const fileName = await uploadFile(selectedFile);
				if (fileName) {
					// 파일 업로드가 성공하면 jobseeker의 joImgUrl을 업데이트
					jobseeker.joImgUrl = fileName; // 상태 업데이트 대신 직접 변경
				}
			}

			const res = await axios({
				url: `/api/jobseeker/mypage/${login}`,
				method: "put",
				params: {
					joName: jobseeker.joName,
					joGender: jobseeker.joGender,
					joBirth: jobseeker.joBirth,
					joTel: jobseeker.joTel,
					joEdu: jobseeker.joEdu,
					joSal: jobseeker.joSal,
					joAddress: jobseeker.joAddress,
					joImgUrl: jobseeker.joImgUrl, // 업로드된 이미지 URL 전송
					skillIds: selectedSkills.length > 0 ? selectedSkills : [], // 선택된 스킬이 없으면 빈 배열을 전송
				},
			});

			if (res.status === 200) {
				alert("수정 완료");
				router.push(`/user`);
			}
		} catch (error) {
			console.error("에러 발생:", error);
			alert("수정 중 문제가 발생했습니다.");
		}
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
		const skillId = Number(e.target.value);
		if (e.target.checked) {
			setSelectedSkills((prevSkills) => [...prevSkills, skillId]);
		} else {
			setSelectedSkills((prevSkills) => prevSkills.filter((s) => s !== skillId));
		}
	}

	// 컴포넌트가 마운트될 때 데이터 가져오기
	useEffect(() => {
		getToken().then((res) => {
			setLogin(res.IDX); // login 값 설정
			console.log(res);
		});
	}, []);

	useEffect(() => {
		if (login !== null) {
			getSkillList();
			getData();
		}
	}, [login]); // login 값이 설정된 후에만 호출
	return (
		<div className='bg-gray-100'>
			<div className='flex-1 bg-white p-8 rounded-lg shadow-lg'>
				<section className='mb-8'>
					<h2 className='text-lg font-semibold text-gray-700 mb-4'>회원정보 수정</h2>

					<div className='col-span-1 flex flex-col items-center mb-5'>
						<div className='relative'>
							{/* 미리보기 이미지가 있으면 해당 이미지 사용, 없으면 서버에서 가져온 이미지 사용 */}
							<img
								src={previewUrl || (jobseeker.joImgUrl ? `/s3/${jobseeker.joImgUrl}` : "/s3/profile.png")}
								alt='프로필 사진'
								className='w-28 h-28 rounded-full object-cover border border-gray-300'
								style={{ maxWidth: "150px" }}
							/>
							<input
								id='profilePic'
								type='file'
								name='joImgUrl'
								className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
								accept='image/*'
								onChange={handleFileChange} // 파일 선택 시 핸들러
							/>
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
							<Input id='name' type='text' name='joName' className='mt-1 block w-full border border-gray-300 rounded p-2' value={jobseeker.joName || ""} onChange={handleInputChange} />
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700' htmlFor='dob'>
								생년월일
							</label>
							<Input id='dob' type='date' name='joBirth' className='mt-1 block w-full border border-gray-300 rounded p-2' value={jobseeker.joBirth || ""} onChange={handleDateChange} />
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
								희망연봉 (만원)
							</label>
							<Input name='joSal' className='mt-1 block w-full border border-gray-300 rounded p-2' value={jobseeker.joSal || ""} onChange={handleInputChange} />
						</div>
						<div>
							<label className='block text-sm font-medium text-gray-700' htmlFor='address'>
								주소
							</label>
							<Input id='joAddress' name='joAddress' className='mt-1 block w-full border border-gray-300 rounded p-2' value={jobseeker.joAddress || ""} onChange={handleInputChange} />
						</div>

						{/* Skill List */}
						<div className='col-span-2'>
							<h3 className='text-sm font-medium text-gray-700 mb-2'>보유 기술</h3>
							<div className='grid grid-cols-5 gap-2'>
								{skillList.map((skill) => (
									<div key={skill.id} className='flex items-center'>
										<input
											id={`skill-${skill.id}`}
											type='checkbox'
											value={skill.id}
											checked={selectedSkills.includes(skill.id)} // Skill is checked if it's in selectedSkills
											onChange={handleSkillChange}
											className='hidden' // 기본 체크박스 숨기기
										/>
										<label
											htmlFor={`skill-${skill.id}`}
											className={`flex items-center cursor-pointer px-3 py-2  text-sm rounded-full border ${
												selectedSkills.includes(skill.id) ? "bg-blue-500 text-white border-transparent" : "bg-white text-gray-700 border-gray-300"
											}`}
										>
											{skill.skName}
										</label>
									</div>
								))}
							</div>
						</div>
					</div>
				</section>

				<div className='text-center'>
					<Button type='submit' text='수정' onClick={send} />
					<Button text='취소' onClick={() => router.push(`/user/`)} />
				</div>
			</div>
		</div>
	);
}
