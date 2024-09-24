"use client";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Page() {
    const usId = 1;
    const router = useRouter();
    const API_URL = `/api/company/leave`;

    const handlesubmit = () => {
        if (confirm("정말 탈퇴하시겠습니까? 탈퇴 후에는 모든 정보가 삭제됩니다.")) {
            axios.delete(API_URL,{params: {
                    id: usId,
                },}
            ).then((res) => {
                    if (res.data === usId) {
                        alert("회원 탈퇴가 완료되었습니다.");
                        router.push(`/`);
                    } else {
                        alert("회원 탈퇴에 실패했습니다.");
                    }
                })
                .catch((error) => {
                    console.error("에러 발생:", error);
                    alert("탈퇴 처리 중 에러가 발생했습니다.");
                });
        } else {
            alert("회원 탈퇴가 취소되었습니다.");
        }
    }

    return (
        <div className='bg-white p-10 rounded-lg shadow-lg flex-1'>
            <h2 className='text-lg font-semibold mb-4'>회원 탈퇴</h2>
            <p className='text-center mb-6 text-gray-600'>
                회원 탈퇴를 진행하시겠습니까? <br />
                <strong className='text-red-600'>탈퇴 후에는 모든 정보가 삭제됩니다.</strong>
            </p>

            <div className='flex justify-center gap-4 mt-8'>
                <button onClick={handlesubmit} className='bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition-colors'>
                    탈퇴
                </button>
                <button onClick={() => router.push(`/company/mypage`)} className='bg-gray-300 text-gray-800 px-6 py-3 rounded-lg shadow-md hover:bg-gray-400 transition-colors'>
                    취소
                </button>
            </div>
        </div>
    );
}
