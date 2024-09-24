import React from 'react';

const JobDetails = React.forwardRef(({ posting }, ref) => {
    return (
        <div ref={ref} className='bg-white shadow-md p-6 mb-8 '>
            <div dangerouslySetInnerHTML={{ __html: posting && posting.poContent }} />
        </div>
    );
});

JobDetails.displayName = 'JobDetails';

export default JobDetails;