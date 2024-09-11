'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ResumePreview = ({params}) => {
	const [resume, setResume] = useState(null);
	const [jobSeeker, setJobSeeker] = useState(null);
	const router = useRouter();

	useEffect(() => {
		getResume();
	}, []);


	function getResume() {
		axios.get(`/api/post/resume`,{params:{id:params.reIdx}}).then((res) => {
			console.log(res.data);
			setResume(res.data.resume);
			setJobSeeker(res.data.jobseeker);
		});
	}
	if (!resume) {
		return <div>Loading...</div>;
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
			
			<h1 className="text-3xl font-bold text-center mb-8 text-gray-800">{resume.reTitle}</h1>
			<div className="mb-6">
				<h2 className="text-xl font-semibold mb-2 text-gray-700">이름</h2>
				<p className="text-gray-600">{jobSeeker.joName}</p>
			</div>
			<div className="mb-6">
				<h2 className="text-xl font-semibold mb-2 text-gray-700">연락처</h2>
				<p className="text-gray-600">{jobSeeker.joTel}</p>
			</div>
			
			<div className="mb-6">
				<h2 className="text-xl font-semibold mb-2 text-gray-700">학력</h2>
				<p className="text-gray-600">{jobSeeker.joEdu}</p>
			</div>

			<div className="mb-6">	
				<h2 className="text-xl font-semibold mb-2 text-gray-700">내용</h2>
				<p className="text-gray-600">{resume.reContent}</p>
			</div>
			
			<div>
				<h2 className="text-xl font-semibold mb-2 text-gray-700">기술 스택</h2>
				<div className="flex flex-wrap gap-2">
				{jobSeeker.skills.map((skill, index) => (
					<span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
						{skill}
					</span>
				))}
				</div>
			</div>
		</div>
	);
};

export default ResumePreview;