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

	const saveBbs = (event) => {
		event.preventDefault();
		// 여기서 content를 서버로 전송하거나 다른 작업을 수행할 수 있습니다.
		console.log('Post content:', content);
	};

	// function uHyoSungCheck() {
	// 	if(){

	// 	}else{
	// 		saveBbs();
	// 	}
	// }

	// 페이지
	return (
		<div className='write_container'>
			<form>
				<h2 className='h2'>공지사항 작성</h2>
				<input type='text' />
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
					<Button
						variant='contained'
						type='submit'
						onClick={() => {
							confirm('저장하시겠습니까?') ? { uHyoSungCheck } : '';
						}}
					>
						저장
					</Button>
					<Button
						variant='outlined'
						onClick={() => {
							confirm('작성한 내용은 저장되지 않습니다. \n이동하시겠습니까?') ? router.push('/admin/bbs/notice/list') : '';
						}}
					>
						목록
					</Button>
				</div>
			</form>
		</div>
	);
}
