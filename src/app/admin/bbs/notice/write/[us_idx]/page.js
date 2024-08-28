'use client';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import SunEditor from 'suneditor-react';
import sunEditorStyle from 'suneditor/dist/css/suneditor.min.css';
import '/public/css/board.css';

// (관리자) 공지사항 게시글 작성
export default function page(props) {
	const router = useRouter();
	const [content, setContent] = useState('');

	const handleChange = (content) => {
		setContent(content);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// 여기서 content를 서버로 전송하거나 다른 작업을 수행할 수 있습니다.
		console.log('Post content:', content);
	};
	return (
		<div className='write_container'>
			<form onSubmit={handleSubmit}>
				<h2 className='h2'>공지사항 작성</h2>
				<SunEditor
					sunEditorStyle='height:700px'
					setOptions={{
						//height: 700,
						buttonList: [
							['undo', 'redo', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
							['font', 'fontSize', 'formatBlock'],
							['fontColor', 'hiliteColor', 'align', 'list', 'table'],
							['link', 'image', 'video'],
							['fullScreen', 'showBlocks', 'codeView'],
						],
					}}
					onChange={handleChange}
				/>
				<div className='btn_group'>
					<Button variant='contained' type='submit'>
						저장
					</Button>
					<Button variant='outlined' onClick={() => router.push('/admin/bbs/notice/list')}>
						목록
					</Button>
				</div>
			</form>
		</div>
	);
}
