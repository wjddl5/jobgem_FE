import React from 'react';
import Button from "@/components/button/Button";
import Table from "@/components/table/Table";
import Input from "@/components/form/Input";

function Page() {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold mb-6">차단내역</h1>
                    <Button text='차단해제'/>
                </div>
                <table className="border-collapse w-full">
                    <thead>
                    <tr>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                            선택
                        </th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                            이름
                        </th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                            사유
                        </th>
                        <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                            차단일자
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                        <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                            <Input type='checkbox' />
                        </td>
                        <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">

                        </td>
                        <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">

                        </td>
                        <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">

                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className="mt-4 text-gray-600 text-sm">
                    <p>• 차단된 인재는 귀사에서 진행하는 모든 채용공고에 지원하더라도 지원자 목록에 표시되지 않습니다.</p>
                    <p>• 차단해제는 해당 지원자에게 통보되지 않습니다.</p>
                    <p>• 차단에 시, 지원자 관리에서 정상적으로 확인할 수 있습니다.</p>
                    <p>• 프로필 지원자는 최종 학력, 최종경력 연봉까지 노출되지 않습니다.</p>
                </div>
            </div>
        </div>
    );
}

export default Page;