import React from 'react';

const RecommendedJobs = React.forwardRef((props, ref) => {
    return (
        <div ref={ref} className='mt-8 bg-white shadow-md rounded-lg p-6'>
            <h3 className='text-2xl font-semibold mb-4'>추천공고</h3>
            {/* Add recommended job postings content here */}
        </div>
    );
});

RecommendedJobs.displayName = 'RecommendedJobs';

export default RecommendedJobs;