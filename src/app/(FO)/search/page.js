import JobList from "./component/JobList";
import MyPagination from "./component/MyPagination";
import { searchAction } from "./SearchAction";

export default async function SearchPage({searchParams}){
  const keyword = searchParams.keyword;
  const curPage = searchParams.curPage ? searchParams.curPage : 0;
  const result = await searchAction(keyword, curPage);
  const totalCount = result.totalElements;

  return (
    <div className="max-w-4xl min-w-[320px] mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div>
          <button className="px-4 py-2 border-b-2 border-blue-500">채용정보</button>
        </div>
      </div>
      <div className="flex justify-between items-center border-b pb-4 text-sm text-gray-600 mb-4">
        <div>" <span className="font-bold text-lg">{keyword}</span> " 에 대한 검색 결과 총 <span className="font-bold text-lg">{totalCount > 0 ? totalCount : 0}</span> 건</div>
      </div>
      <div className="space-y-4">
        <JobList jobList={result.content} />
      </div>
      <div>
        <MyPagination keyword={keyword} totalPages={result.totalPages} curPage={parseInt(curPage)+1}/>
      </div>
    </div>
  )
}
