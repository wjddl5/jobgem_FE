'use client';
import { Button, TextField, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import SunEditor from 'suneditor-react';
import sunEditorStyle from 'suneditor/dist/css/suneditor.min.css';
import '/public/css/board.css';
import axios from 'axios';
import { data } from 'autoprefixer';

// qna 게시글 수정
export default function page(props) {
	const router = useRouter();
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [disabled, setDisabled] = useState(true);
	const [vo, setVo] = useState({});
	const API_URL = `/api/bbs/qna/view?id=${props.params.id}`;

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
			.get('/api/bbs/notice/edit', {
				params: {
					boId: props.params.id,
					title: title,
					content: content,
				},
			})
			.then((res) => {
				if (res.data == true) {
					alert('저장완료');
					router.push('/user/bbs-qna-list');
				}
			});
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

	useEffect(() => {
		axios.get(API_URL).then((res) => {
			setVo(res.data.vo);
			setTitle(res.data.vo.boTitle);
			setContent(res.data.vo.boContent);
		});
	}, []);

	// 페이지
	return (
		<div className='write_container'>
			<form>
				<h2 className='h2'>QnA 수정</h2>
				<TextField
					id='boTitle'
					variant='outlined'
					style={{ width: '940px' }}
					defaultValue={vo.boTitle}
					onChange={(event) => {
						setTitle(event.target.value);
					}}
				/>
				<Divider style={{ margin: '10px 0' }} />
				<SunEditor
					sunEditorStyle='height:700px'
					//onImageUploadBefore={handleImageUploadBefore}
					//onImageUpload={handleImageUpload}
					setOptions={{
						buttonList: [
							['undo', 'redo', 'bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
							['font', 'fontSize', 'formatBlock'],
							['fontColor', 'hiliteColor', 'align', 'list', 'table'],
							['link', 'image', 'video'],
							['fullScreen', 'showBlocks', 'codeView'],
						],
					}}
					setContents={vo.boContent}
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
							confirm('작성한 내용은 저장되지 않습니다. \n이동하시겠습니까?') ? router.push('/user/bbs-qna-list') : '';
						}}
					>
						목록
					</Button>
				</div>
			</form>
		</div>
	);
}
