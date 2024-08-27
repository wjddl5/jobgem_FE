import React from 'react';

function UserCard({key }) {
    return (
        <div key={key} className="p-4 bg-white rounded-md shadow-md">
            <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-gray-400 text-2xl">👤</span>
                </div>
                <div className="ml-4">
                    <h3 className="text-lg font-semibold">최OO (만 54세)</h3>
                    <p className="text-blue-500">29년 2개월</p>
                </div>
            </div>
            <p className="text-gray-700 mb-2">경영지원팀 부장(구 2공장)</p>
            <div className="flex flex-wrap gap-2 mb-2">
                {['CFO', '경리회계', '재무', 'Excel', 'PowerPoint', 'OA'].map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 text-sm rounded-md">{skill}</span>
                ))}
            </div>
            <p className="text-gray-500 text-sm"># 다른 기업이 많이 찾는</p>
        </div>
    );
}

export default UserCard;