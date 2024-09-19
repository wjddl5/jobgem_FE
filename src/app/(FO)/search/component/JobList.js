import Link from "next/link";

export default function JobList({ jobList }) {

    const detailCompanyLink = "/company/";
    const detailPostLink = "/company/posting/view/";
    
    const dDay = (deadline) => {
        const today = new Date("2024-01-01");
        const targetDate = new Date(deadline);
        const timeDifference = targetDate.getTime() - today.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        return daysDifference;
    }

    return (
        <>
            {jobList ?( jobList.map((job, index) => (
                <div key={index}>
                    <div className="border-b pb-4 ">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                {/* 회사이름 */}
                                <h1 className="font-bold mb-1 flex flex-col">{job.company.coName}</h1>
                                {/* 공고제목 */}
                                <Link href={detailPostLink + job.id} className="text-blue-600 mb-2 text-lg">{job.poTitle}</Link>
                                {/* 공고 마감일 */}
                                <div className="text-sm text-gray-600 space-x-2">
                                    <span>{job.education[0].edName}</span>
                                    <span>{job.company.coType}</span>
                                    <span>{job.locationGuSi[0].locationDo.ldName}</span>
                                    <span className="text-red-500">D-{dDay(job.poDeadline)}</span>
                                </div>
                                {job.skill && (
                                    <div className="mt-2 space-x-2">
                                        {job.skill.map((skill, index) => (
                                            <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                # {skill.skName}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="flex items-end">
                                <span className="min-w-[50px] text-red-500 text-sm">즉시 지원</span>
                            </div>

                        </div>
                    </div>
                </div>
            ))) : (
                <div className="text-center text-gray-500">검색 결과가 없습니다.</div>
            )}
             
        </>
    );
};
