'use client'

import PostingForm from '@/components/posting/PostingForm';

export default function EditPostingPage({ params }) {
    return <PostingForm params={{ ...params, mode: 'edit' }} />;
}
