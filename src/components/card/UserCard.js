import React from 'react';
import Button from "@/components/button/Button";

function UserCard({type, jobseeker }) {
    // 안전성을 위해 skills가 정의되어 있는지 확인
    const skills = jobseeker.skills || [];

    const addWish = () => {

    }

    return (
        <div className="p-4 bg-white rounded-md shadow-md">
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-400 text-2xl">👤</span>
                </div>
                <div className="ml-4">
                    <h3 className="text-lg font-semibold">{jobseeker.joName} (만 {jobseeker.joAge}세)</h3>
                    <p className="text-blue-500">{jobseeker.joTel}</p>
                </div>
            </div>
            <p className="text-gray-700 mb-2">{jobseeker.joAddress}</p>
            <p className="text-gray-500 text-sm mb-2">{jobseeker.joEdu}</p>
            <div className="flex flex-wrap gap-2 mb-2">
                {skills.length > 0 ? (
                    skills.map((skill, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-sm rounded-md">{skill.skName}</span>
                    ))
                ) : (
                    <span className="text-gray-500 text-sm">No skills listed</span>
                )}
            </div>
            <div className='flex gap-2 justify-center mt-4'>
                <Button text='1:1 대화' type='submit' />
                {type === 'wish' ? <Button text='찜 삭제' /> : <Button text='인재 찜하기' /> }
            </div>
        </div>
    );
}

export default UserCard;