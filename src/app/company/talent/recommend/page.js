'use client'

import React from 'react';
import Select from "@/components/form/Select";
import Button from "@/components/button/Button";
import Input from "@/components/form/Input";
import Table from "@/components/table/Table";
import UserCard from "@/components/card/UserCard";

function Page() {
    return (
        <>
            <div className="flex gap-3 mb-6">
                <Input type="text"/>
                <Select ar={['직무/스킬']} />
                <Select ar={['지역']} />
                <Select ar={['상세검색']} />
                <Button text='검색' type='submit' />
            </div>
            <div>
                <h2 className="text-xl font-semibold mb-4">TOP 인재</h2>
                <div className="grid grid-cols-3 gap-4">
                    {Array(9).fill().map((_, idx) => (
                        <UserCard key={idx}/>
                    ))}
                </div>
            </div>
            <div className="mt-8">
                <div className="mt-4 flex justify-between items-center mb-4">
                    <span className="text-gray-600">전체 1,413,463 건</span>
                </div>
                <div className="overflow-x-auto">
                    <Table headers={['이름', '경력', '직무', '지역', '학력']} list={[{}, {}, {}, {}, {}]} />
                </div>
            </div>
        </>
    );
}

export default Page;