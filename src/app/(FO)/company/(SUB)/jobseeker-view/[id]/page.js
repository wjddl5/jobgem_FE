'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import { useRouter } from 'next/navigation';

export default function JobSeekerProfile(props) {
	const API_URL = `/api/jobseeker/${props.params.id}`;
	const [jobseeker, setJobseeker] = useState({});
	const [skills, setSkills] = useState([]);
	const router = useRouter();

	useEffect(() => {
		getData();
	}, []);

	function getData() {
		axios.get(API_URL).then((res) => {
			setJobseeker(res.data);
			setSkills(res.data.skills);
		});
	}

	return (
		<Card className='w-full max-w-4xl mx-auto bg-white shadow-lg'>
			<CardHeader className='bg-blue-600 text-white relative'>
				<div className='flex items-center justify-between'>
					<div className='flex items-center space-x-4'>
						<Avatar className='w-24 h-24 border-4 border-white'>
							<AvatarImage src={`/s3/${jobseeker.joImgUrl}`} alt={jobseeker.joName} />
							<AvatarFallback></AvatarFallback>
						</Avatar>
						<div>
							<CardTitle className='text-2xl font-bold'>{jobseeker.joName}</CardTitle>
							<p className='text-blue-100'>구직자</p>
						</div>
					</div>
					<button
						className='text-white absolute top-2 right-2 mt-2 mr-2'
						onClick={() => {
							router.back();
						}}
					>
						<ExitToAppRoundedIcon />
					</button>
				</div>
			</CardHeader>
			<CardContent className='grid gap-4 p-6'>
				<div className='grid grid-cols-2 gap-4'>
					<div>
						<h3 className='font-semibold text-blue-600'>생년월일</h3>
						<p>{jobseeker.joBirth}</p>
					</div>
					<div>
						<h3 className='font-semibold text-blue-600'>성별</h3>
						<p>{jobseeker.joGender == 'M' ? '남성' : '여성'}</p>
					</div>
					<div>
						<h3 className='font-semibold text-blue-600'>주소</h3>
						<p>{jobseeker.joAddress}</p>
					</div>
					<div>
						<h3 className='font-semibold text-blue-600'>연락처</h3>
						<p>{jobseeker.joTel}</p>
					</div>
				</div>
				<div>
					<h3 className='font-semibold text-blue-600 mb-2'>학력</h3>
					<p>{jobseeker.joEdu}</p>
				</div>
				<div>
					<h3 className='font-semibold text-blue-600 mb-2'>희망연봉</h3>
					<p>{jobseeker.joSal}</p>
				</div>
				<div>
					<h3 className='font-semibold text-blue-600 mb-2'>보유스킬</h3>
					<div className='flex flex-wrap gap-2'>
						{skills
							? skills.map((skill) => (
									<Badge key={skill.id} className='bg-blue-100 text-blue-600 hover:bg-blue-100'>
										{skill.skName}
									</Badge>
							  ))
							: '-'}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
