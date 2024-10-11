'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'lucide-react';

const ResumePreview = ({params}) => {
	const [resume, setResume] = useState(null);
	const [jobSeeker, setJobSeeker] = useState(null);
	const router = useRouter();

	useEffect(() => {
		getResume();
	}, []);
	

	function getResume() {
		axios.get(`/api/posts/${params.reIdx}/resume`).then((res) => {
			console.log(res.data);
			setResume(res.data.resume);
			setJobSeeker(res.data.jobseeker);
		}).catch(error => {
			console.error("Error fetching resume:", error);
		});
	}

	if (!resume || !jobSeeker) {
		return <div>Loading...</div>;
	}

	function filedownload(){
		axios.get(`/api/files/download/${resume.reFileUrl}`)
	}
	return (
		<div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
			<IconButton
				onClick={() => router.back()}
				aria-label="뒤로 가기"
				className="mb-4"
			>
				<ArrowBackIcon />
			</IconButton>
			
			<h1 className="text-3xl font-bold text-center mb-8 text-gray-800">{resume.reTitle || '제목 없음'}</h1>
			<div className="mb-6">
				<h2 className="text-xl font-semibold mb-2 text-gray-700">이름</h2>
				<p className="text-gray-600">{jobSeeker.joName || '정보 없음'}</p>
			</div>
			<div className="mb-6">
				<h2 className="text-xl font-semibold mb-2 text-gray-700">연락처</h2>
				<p className="text-gray-600">{jobSeeker.joTel || '정보 없음'}</p>
			</div>
			
			<div className="mb-6">
				<h2 className="text-xl font-semibold mb-2 text-gray-700">학력</h2>
				<p className="text-gray-600">{jobSeeker.joEdu || '정보 없음'}</p>
			</div>

			<div className="mb-6">	
				<h2 className="text-xl font-semibold mb-2 text-gray-700">내용</h2>
				<p className="text-gray-600">{resume.reContent || '내용 없음'}</p>
			</div>
			
			<div>
				<h2 className="text-xl font-semibold mb-2 text-gray-700">기술 스택</h2>
				<div className="flex flex-wrap gap-2">
				{jobSeeker.skills && jobSeeker.skills.length > 0 ? (
					jobSeeker.skills.map((skill, index) => (
						<span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
							{skill.skName}
						</span>
					))
				) : (
					<p className="text-gray-600">기술 스택 정보 없음</p>
				)}
				</div>
			</div>
			<div>
			<div className="mt-8">
				<h2 className="text-xl font-semibold mb-2 text-gray-700">포트폴리오</h2>
				{resume.reFileUrl ? (
					<button
						onClick={() => window.open(`/api/files/download/${resume.reFileUrl}`, '_blank', 'noopener,noreferrer')}
						className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
					>
						<svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
						</svg>
						파일 다운로드
					</button>
				) : (
					<p className="text-gray-600">첨부된 파일이 없습니다.</p>
				)}
			</div>
			</div>
		</div>
	);
};

export default ResumePreview;