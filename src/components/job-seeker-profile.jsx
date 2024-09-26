'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function JobSeekerProfileJsx() {
  return (
    (<Card className="w-full max-w-3xl mx-auto bg-white shadow-lg">
      <CardHeader className="bg-blue-600 text-white">
        <div className="flex items-center space-x-4">
          <Avatar className="w-24 h-24 border-4 border-white">
            <AvatarImage src="/placeholder.svg?height=96&width=96" alt="구직자 프로필 사진" />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl font-bold">홍길동</CardTitle>
            <p className="text-blue-100">웹 개발자</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-blue-600">생년월일</h3>
            <p>1990년 1월 1일</p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-600">주소</h3>
            <p>서울특별시 강남구</p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-600">연락처</h3>
            <p>010-1234-5678</p>
          </div>
          <div>
            <h3 className="font-semibold text-blue-600">이메일</h3>
            <p>hong@example.com</p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-blue-600 mb-2">학력</h3>
          <p>서울대학교 컴퓨터공학과 졸업 (2013년)</p>
        </div>
        <div>
          <h3 className="font-semibold text-blue-600 mb-2">희망연봉</h3>
          <p>5,000만원 ~ 6,000만원</p>
        </div>
        <div>
          <h3 className="font-semibold text-blue-600 mb-2">보유스킬</h3>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-200">React</Badge>
            <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-200">JavaScript</Badge>
            <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-200">Node.js</Badge>
            <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-200">Python</Badge>
            <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-200">SQL</Badge>
          </div>
        </div>
      </CardContent>
    </Card>)
  );
}