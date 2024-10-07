import Link from "next/link";


export default function CompanySidebar({ posting }) {
    return (
        <div className='ml-8 w-1/5'>
            <div className='bg-gray-100 p-4 rounded-lg h-full'>
                <img src={`/s3/${posting && posting.company.coThumbimgUrl}`} alt='Company Logo' className='w-12 h-12 mb-2' />
                <h3 className='text-lg font-semibold mb-2'>{posting && posting.company.coName}</h3>
                <Link href='/com-info'><p className='text-sm text-gray-600 mb-2'>기업정보</p></Link>
                <hr className='my-2' />
                <div className='text-sm'>
                    <p className='mb-1'>
                        <span className='font-medium'>대표자명:</span> {posting && posting.company.coManagerName}
                    </p>
                    <p className='mb-1'>
                        <span className='font-medium'>사원수:</span> {posting && posting.company.coEmployee}
                    </p>
                    <p className='mb-1'>
                        <span className='font-medium'>업종:</span> {posting && posting.company.coType}
                    </p>
                </div>
                <div className='mt-4 flex justify-between'>
                    <Link href={`/com-info/${posting && posting.company.id}`}><button className='text-blue-500 text-sm'>기업정보</button></Link>
                    <button className='text-blue-500 text-sm'>채용정보</button>
                </div>
            </div>
        </div>
    );
}