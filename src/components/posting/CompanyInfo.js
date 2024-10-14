import { Link, Building2 } from 'lucide-react';
import React from 'react';

const CompanyInfo = React.forwardRef(({ posting }, ref) => {
    return (
        <div ref={ref} className='mb-8 bg-white shadow-md rounded-lg p-6'>
            <h2 className='text-2xl font-bold mb-4'>기업정보</h2>
            <div className='flex items-center mb-4'>
                <Building2 className='w-6 h-6 mr-2' />
                <h3 className='text-xl font-semibold'>{posting?.coName}</h3>
            </div>
            <div className='flex items-start'>
                <img src={`/s3/${posting && posting.company.coThumbimgUrl}`} alt='에어퍼스트 로고' className='w-24 h-24 object-contain mr-6' />
                <div>
                    <h4 className='text-xl font-semibold mb-2'>{posting && posting.company.coName}</h4>
                    <p className='text-gray-600 mb-2'>대표자명: {posting && posting.company.coManagerName}</p>
                    <p className='text-gray-600 mb-2'>업종: {posting && posting.company.coType}</p>
                    <p className='text-gray-600 mb-2'>사원수: {posting && posting.company.coEmployee}명</p>
                    <p className='text-gray-600 mb-2'>
                        매출액: {posting && (
                            `${Math.floor(posting.company.coSales / 100000000) > 0 ? `${Math.floor(posting.company.coSales / 100000000)}억 ` : ''}`
                            + `${Math.floor((posting.company.coSales % 100000000) / 10000) > 0 ? `${Math.floor((posting.company.coSales % 100000000) / 10000)}만 ` : ''}`
                            + `${(posting.company.coSales % 10000) > 0 ? `${posting.company.coSales % 10000}원` : ''}`
                        )} (2023년 기준)
                    </p>

                </div>
            </div>
        </div>
    );
});

CompanyInfo.displayName = 'CompanyInfo';

export default CompanyInfo;