'use client'

import PostingForm from '@/components/posting/PostingForm';

export default function WritePage() {
    return (
        <PostingForm params={{ mode: 'write' }} />
    );
}
