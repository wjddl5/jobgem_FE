import CompanySidebar from "./CompanySider";
import JobPostingHeader from "./JobPostingHeader";


export default function PostingHeader({ posting, send ,isInterested,handleInterested}) {
    return (
        <div className='bg-white shadow-md rounded-lg p-6 mb-8 flex'>
            <JobPostingHeader posting={posting} send={send} isInterested={isInterested} handleInterested={handleInterested}  />
            <CompanySidebar posting={posting} />
        </div>
    );
}