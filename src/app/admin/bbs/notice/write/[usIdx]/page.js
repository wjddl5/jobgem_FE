'use client';
import { Button, TextField, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SunEditor from 'suneditor-react';
import sunEditorStyle from 'suneditor/dist/css/suneditor.min.css';
import '/public/css/board.css';
import axios from 'axios';
import { data } from 'autoprefixer';

// (관리자) 공지사항 게시글 작성
export default function page(props) {
	const router = useRouter();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [disabled, setDisabled] = useState(true);

	function changeContent(content) {
		setContent(content);
	}

	function uHyoSungCheck() {
		if (
			title.trim().length > 0 &&
			content
				.replace(/<\/?p>/g, '')
				.replace(/<br>/g, '')
				.replace(/&nbsp;/g, '')
				.trim().length > 0
		) {
			saveBbs(title, content);
		} else {
			alert('제목과 내용이 모두 입력되어야 합니다.');
		}
	}

	function saveBbs(title, content) {
		axios
			.get('/api/bbs/notice/write', {
				params: {
					boType: 1, // 1: 공지사항
					usIdx: 1, //로그인한 유저 idx로 변경 (!)
					title: title,
					content: content,
				},
			})
			.then((res) => {
				if (res.data == true) {
					alert('저장완료');
					router.push('/admin/bbs/notice/list');
				}
			});
	}

	function handleImageUploadBefore(files, info, uploadHandler) {
		// uploadHandler is a function
		console.log(files, info);
	}

	function handleImageUpload(targetImgElement, index, state, imageInfo, remainingFilesCount) {
		console.log(targetImgElement, index, state, imageInfo, remainingFilesCount);
	}

	useEffect(() => {
		if (
			title.trim().length > 0 &&
			content
				.replace(/<\/?p>/g, '')
				.replace(/<br>/g, '')
				.replace(/&nbsp;/g, '')
				.trim().length > 0
		) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [title, content]);

	// 페이지
	return (
		<div className='write_container'>
			<form>
				<h2 className='h2'>공지사항 작성</h2>
				<input type='hidden' value={props.params.usIdx} />
				<TextField
					id='boTitle'
					label='제목'
					variant='outlined'
					style={{ width: '940px' }}
					onChange={(event) => {
						setTitle(event.target.value);
					}}
				/>
				<Divider style={{ margin: '10px 0' }} />
				<SunEditor
					sunEditorStyle='height:700px'
					//onImageUploadBefore={handleImageUploadBefore}
					onImageUpload={handleImageUpload}
					setOptions={{
						buttonList: [
							['undo', 'redo', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
							['font', 'fontSize', 'formatBlock'],
							['fontColor', 'hiliteColor', 'align', 'list', 'table'],
							['link', 'image', 'video'],
							['fullScreen', 'showBlocks', 'codeView'],
						],
					}}
					onChange={changeContent}
				/>
				<div className='btn_group'>
					<Button
						disabled={disabled}
						variant='contained'
						onClick={() => {
							if (confirm('저장하시겠습니까?')) {
								uHyoSungCheck();
							}
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
