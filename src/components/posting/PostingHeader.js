import CompanySidebar from "./CompanySider";
import JobPostingHeader from "./JobPostingHeader";


export default function PostingHeader({ posting, send }) {
    return (
        <div className='bg-white shadow-md rounded-lg p-6 mb-8 flex'>
            <JobPostingHeader posting={posting} send={send} />
            <CompanySidebar posting={posting} />
        </div>
    );
}