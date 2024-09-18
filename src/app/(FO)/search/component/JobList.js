"use client"

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from 'react';


export default function JobList({ job }) {
    const [isFavorite, setIsFavorite] = useState(false);

    return (
        <div>
            <div className="border-b pb-4 ">
                <div className="flex justify-between items-start">
                    <div>
                            {/* 회사이름 */}
                        <h2 className="font-bold text-lg mb-1">{job.company.coName}</h2>
                            {/* 공고제목 */}
                        <h3 className="text-blue-600 mb-2">{job.poTitle}</h3>
                            {/* 공고조건 */}
                        <div className="text-sm text-gray-600 space-x-2">
                        </div>
                            {/* 공고스킬 */}
                    </div>
                </div>
            </div>
        </div>

    );
};
