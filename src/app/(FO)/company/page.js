"use client"; // 클라이언트 측 렌더링 활성화

import { useState, useEffect } from "react";
import Button from "@/components/button/Button";
import { DiAptana } from "react-icons/di";
import IconButton from "@/components/button/IconButton";
import Table from "@/components/table/Table";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { getToken } from "@/app/util/token/token";

export default function Page() {
	const router = useRouter();
	const [coId, setCoId] = useState(0);
	const [companyData, setCompanyData] = useState();
	const [isChangeLogo, setIsChangeLogo] = useState(true);
	const [logo, setLogo] = useState(null);
	const [file, setFile] = useState("");
	const [preview, setPreview] = useState(null);

	const fetchToken = async () => {
		const res = await getToken();
		setCoId(res?.IDX);
	};

	useEffect(() => {
		fetchToken();
	}, []);

	useEffect(() => {
		if (coId > 0) getData();
	}, [logo, coId]);

	// 데이터를 가져오는 함수
	const getData = () => {
		axios.get(`/api/company?id=${coId}`).then((res) => {
			setCompanyData(res.data);
			setLogo(res.data.company.coThumbimgUrl);
			console.log(res.data.company);
		});
	};

	const handleLogoChange = (e) => {
		const selectedFile = e.target.files[0];
		if (/\s/.test(selectedFile.name)) {
			alert("파일명에 공백이 존재합니다.");
			e.target.value = null;
			return;
		}
		setFile(selectedFile);
		setIsChangeLogo(false);

		// 선택된 파일이 이미지일 경우 미리보기 URL 생성
		if (selectedFile) {
			const previewUrl = URL.createObjectURL(selectedFile);
			setPreview(previewUrl);
		}
	};

	const handleLogoSave = async () => {
		if (confirm("로고를 수정하시겠습니까?")) {
			const formData = new FormData();
			formData.append("file", file);

			try {
				const uploadRes = await axios.post("/api/files/upload", formData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});

				if (uploadRes.status === 200) {
					const fileName = file.name;

					const updateRes = await axios.put("/api/company/logo", null, {
						params: {
							id: coId,
							coThumbimgUrl: fileName,
						},
					});

					if (updateRes.status === 200) {
						alert("수정되었습니다.");
						setPreview(null);
						setLogo(fileName);
						setIsChangeLogo(true);
					}
				}
			} catch (err) {
				console.error("파일 업로드 중 오류 발생:", err);
			}
		}
	};

	function formatCurrency(value) {
		if (value >= 100000000) {
			return `${Math.floor(value / 100000000)}억`;
		} else if (value >= 10000) {
			return `${Math.floor(value / 10000)}만 원`;
		} else {
			return `${value}원`;
		}
	}

	if (!companyData)
		return (
			<div className='flex justify-center'>
				<img src='/img/loading.gif' alt='로딩' />
			</div>
		);

	// 채팅 시간 관련 함수
	const formatTimeAgo = (dateString) => {
		const messageDate = new Date(dateString);
		const now = new Date();
		const diffMs = now - messageDate;
		const diffMinutes = Math.floor(diffMs / 60000);
		const diffHours = Math.floor(diffMs / 3600000);
		const diffDays = Math.floor(diffMs / 86400000);

		if (diffMinutes < 60) {
			if (diffMinutes === 0) {
				return `방금`;
			}
			return `${diffMinutes}분 전`;
		} else if (diffHours < 24) {
			return `${diffHours}시간 전`;
		} else if (diffDays < 2) {
			return `${diffDays}일 전`;
		} else {
			return messageDate.toLocaleDateString().replaceAll(". ", "-").slice(0, -1); // YYYY-MM-DD 형식
		}
	};

	return (
		<>
			<div className='bg-gray-100'>
				<div className='flex items-center justify-between p-4 bg-white rounded-md shadow-md'>
					<div className='flex gap-6'>
						<img src={`/s3/${logo ? logo : "1.jpg"}`} width='100' height='100' alt='등록된 로고' className='w-12 h-12 rounded-full object-cover border border-gray-300' />
						{preview && <img src={preview} width='100' height='100' className='w-12 h-12 rounded-full object-cover border border-gray-300' alt='수정로고 미리보기' />}
						<div className='flex items-center border border-dashed border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50'>
							<label className='text-gray-600'>
								<input type='file' className='appearance-none hidden' onChange={handleLogoChange} />
								로고 등록 +
							</label>
						</div>
					</div>
					<div>
						<Button text={"로고 저장"} disabled={isChangeLogo} onClick={handleLogoSave} />
					</div>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-1 gap-6 mt-6'>
					<div className='bg-white p-6 rounded-md shadow'>
						<div className='mb-4 flex justify-between'>
							<h2 className='text-lg font-bold mb-4'>기업 정보</h2>
							<Button text={"수정"} onClick={() => router.push("/company/mypage")} />
						</div>
						<div className='flex justify-between'>
							<div className='text-center p-4'>
								<p className='mb-2'>매출액</p>
								<p className='text-2xl font-bold'>{formatCurrency(companyData.company.coSales)}</p>
							</div>
							<div className='text-center p-4'>
								<p className='mb-2'>사원수</p>
								<p className='text-2xl font-bold'>{companyData.company.coEmployee}명</p>
							</div>
							<div className='text-center p-4'>
								<p className='mb-2'>산업</p>
								<p className='text-2xl font-bold'>IT</p>
							</div>
							<div className='text-center p-4'>
								<p className='mb-2'>설립</p>
								<p className='text-2xl font-bold'>{companyData.company.coOpen?.slice(0, 4)}년</p>
							</div>
							<div className='text-center p-4'>
								<p className='mb-2'>기업형태</p>
								<p className='text-2xl font-bold'>{companyData.company.coType}</p>
							</div>
						</div>
					</div>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
					<div className='bg-white p-6 rounded-md shadow'>
						<h2 className='text-lg font-bold mb-4'>일반 채용 현황</h2>
						<div className='flex justify-between mb-4'>
							<div className='text-center'>
								<Link href='/company/posting' className='text-2xl font-bold text-blue-600 underline text-center'>
									{companyData.postCount}
								</Link>
								<p>진행중 공고</p>
							</div>
							<div className='text-center'>
								<Link href='/company/posting' className='text-2xl font-bold text-blue-600 underline text-center'>
									{companyData.noPostCount}
								</Link>
								<p>마감된 공고</p>
							</div>
						</div>
						<div className='bg-gray-50 p-4 rounded-md flex items-center justify-center gap-2'>
							<Link href='/company/posting' className='btn submit'>
								공고목록
							</Link>
							<Link href='/company/posting/write' className='btn'>
								공고등록
							</Link>
						</div>
					</div>

					<div className='bg-white p-6 rounded-md shadow'>
						<h2 className='text-lg font-bold mb-4'>후기 현황</h2>
						<div className='flex justify-between mb-4'>
							<div className='text-center'>
								<Link href='/company/review' className='text-2xl font-bold text-blue-600 underline text-center'>
									{companyData.reviewCount}
								</Link>
								<p>기업 후기</p>
							</div>
							<div className='text-center'>
								<Link href='/company/review/meeting' className='text-2xl font-bold text-blue-600 underline text-center'>
									{companyData.interviewCount}
								</Link>
								<p>면접 후기</p>
							</div>
						</div>
						<div className='bg-gray-50 p-4 rounded-md flex items-center justify-center gap-2'>
							<Link href='/company/review' className='btn submit'>
								기업후기
							</Link>
							<Link href='/company/review/meeting' className='btn'>
								면접 후기
							</Link>
						</div>
					</div>
					<div className='bg-white p-6 rounded-md shadow'>
						<h2 className='text-lg font-bold mb-4'>인재 현황</h2>
						<div className='flex felx-co justify-between mb-4'>
							<div className='text-center'>
								<Link href='/company/talent/fit' className='text-2xl font-bold text-blue-600 underline text-center'>
									{companyData.fitJobseekerCount}
								</Link>
								<p>인재 추천</p>
							</div>
							<div className='text-center'>
								<Link href='/company/talent/wish' className='text-2xl font-bold text-blue-600 underline text-center'>
									{companyData.talentCount}
								</Link>
								<p>찜한 인재</p>
							</div>
						</div>
						<div className='bg-gray-50 p-4 rounded-md flex items-center justify-center gap-2'>
							<Link href='/company/talent/fit' className='btn submit'>
								추천목록
							</Link>
							<Link href='/company/talent/wish' className='btn'>
								찜한목록
							</Link>
						</div>
					</div>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
					<div className='bg-white p-6 rounded-md shadow'>
						<div className='mb-4 flex justify-between'>
							<h2 className='text-lg font-bold'>
								차단 목록<span className='text-xs font-gray-500 font-light'>( 최신순 )</span>
							</h2>
							<div className='hover:rotate-90 transition duration-200 ease-in-out h-6'>
								<Link href='/company/black'>
									<IconButton>
										<DiAptana />
									</IconButton>
								</Link>
							</div>
						</div>
						<Table list={companyData.blockList} headers={["번호", "이름", "차단일자", "내용"]} />
					</div>

					<div className='bg-white p-6 rounded-md shadow'>
						<div className='mb-4 flex justify-between'>
							<h2 className='text-lg font-bold'>
								채팅 목록<span className='text-xs font-gray-500 font-light'>( 최신순 )</span>
							</h2>
							<div className='hover:rotate-90 transition duration-200 ease-in-out h-6'>
								<Link href='/company/chat'>
									<IconButton>
										<DiAptana />
									</IconButton>
								</Link>
							</div>
						</div>
						<table className='border-collapse w-full'>
							<thead>
								<tr>
									<th className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>상대방</th>
									<th className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>마지막 메시지</th>
									<th className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>마지막채팅날짜</th>
								</tr>
							</thead>
							<tbody>
								{companyData.chatList?.map((chat) => (
									<tr key={chat.id} className='bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0'>
										<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static'>{chat.joinUser.usId}</td>
										<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static'>
											{chat.chatList[chat.chatList.length - 1]?.chContent}
										</td>
										<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static'>
											{formatTimeAgo(chat.chatList[chat.chatList.length - 1]?.chDate)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}
