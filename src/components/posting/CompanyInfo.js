import React from 'react';

const CompanyInfo = React.forwardRef(({ posting }, ref) => {
    return (
        <div ref={ref} className='mt-8 bg-white shadow-md rounded-lg p-6'>
            <h3 className='text-2xl font-semibold mb-4'>기업정보</h3>
            <div className='flex items-start'>
                <img src={`/s3/${posting && posting.company.coThumbimgUrl}`} alt='에어퍼스트 로고' className='w-24 h-24 object-contain mr-6' />
                <div>
                    <h4 className='text-xl font-semibold mb-2'>{posting && posting.company.coName}</h4>
                    <p className='text-gray-600 mb-2'>대표자명: {posting && posting.company.coManagerName}</p>
                    <p className='text-gray-600 mb-2'>업종: {posting && posting.company.coType}</p>
                    <p className='text-gray-600 mb-2'>사원수: {posting && posting.company.coEmployee}명</p>
                    <p className='text-gray-600 mb-2'>매출액: {posting && posting.company.coSales}억원 (2023년 기준)</p>
                </div>
            </div>
        </div>
    );
});

CompanyInfo.displayName = 'CompanyInfo';

export default CompanyInfo;