'use client'
import { Alert } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginAction } from "./action/LoginAction";

export default function LoginPage() {
  
  const [type, setType] = useState('personal'); // personal or company

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const onSubmit = async (formdata) => {
    const login_msg = await loginAction(formdata);
    if (login_msg == "로그인 성공") {
      reset();
    } else {
      alert(<Alert variant="outlined" severity="error"> 이메일을 확인해주세요.</Alert>);
    }
  }

  const email_validation = {
    required: "이메일을 입력해주세요.",
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: "올바른 이메일 형태가 아닙니다.",
    }
  }

  const password_validation = {
    required: "비밀번호를 입력해주세요.",
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/5">
      <Image src="/img/logo.png" alt="logo" width={200} height={200} className="mx-auto"/>
        <div className="flex justify-between mb-4">
        <button 
            className={`flex-1 py-2 ${type === 'personal' ? 'border-b-2 border-black font-bold' : ''}`} 
            onClick={() => setType('personal')}
          > 개인회원</button>
           <button 
            className={`flex-1 py-2 ${type === 'company' ? 'border-b-2 border-black font-bold' : ''}`} 
            onClick={() => setType('company')}
          >기업회원</button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <label htmlFor="email" className="mb-1">아이디</label>
          <input
            id="email"
            type="email"
            {...register("email", email_validation)}
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          <label htmlFor="password" className="mb-1">비밀번호</label>
          <input
            id="password"
            {...register("password", password_validation)}
            type="password"
            className="mb-2 p-2 border border-gray-300 rounded"
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-1" />
              로그인 유지
            </label>
          </div>
          <button type="submit" className="py-2 bg-blue-500 text-white rounded">로그인</button>
        </form>
        {type === 'personal' && (
          <div className="flex justify-around mt-4">
            {/* 소셜 로그인으로 변경 예정 */}
            <button className="text-green-500">N</button>
            <button className="text-yellow-500">K</button>
            <button className="text-blue-500">F</button>
            <button className="text-gray-800">G</button>
            <button className="text-black">A</button>
          </div>
        )}
        <div className="flex justify-between mt-4 text-sm">
          <span className="cursor-pointer">아이디 찾기</span>
          <span className="cursor-pointer">비밀번호 찾기</span>
          <Link href="/reg" className="cursor-pointer text-blue-500">회원가입</Link>
        </div>
      </div>
    </div>
  )
}