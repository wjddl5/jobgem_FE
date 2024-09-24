'use client';
import { Button, TextField, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
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
	const API_URL = `/api/bbs/${props.params.id}`;
	const editorRef = useRef(null);

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
			.post('/api/bbs/write', {
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

	const getSunEditorInstance = (sunEditor) => {
		editorRef.current = sunEditor; // SunEditor 인스턴스를 ref에 저장
	};

	function toImg(files, info, uploadHandler) {
		const file = files[0];

		const formData = new FormData();
		formData.append('file', file);

		fetch('/api/files/upload', {
			method: 'POST',
			body: formData,
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.text(); // 서버에서 반환된 텍스트(S3 URL)를 처리
			})
			.then((s3Url) => {
				console.log('S3 URL:', s3Url); // S3 URL이 잘 출력되는지 확인

				if (editorRef.current) {
					console.log('에디터에 이미지 삽입');
					// SunEditor 인스턴스에서 이미지 삽입
					editorRef.current.insertHTML(`<img src="${s3Url}" alt="image">`);
					uploadHandler(); // 업로드 완료 후 uploadHandler 호출
				}
			})
			.catch((error) => {
				console.error('Error uploading image:', error);
				uploadHandler(null); // 에러 발생 시 uploadHandler에 null 전달
			});
	}

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
					onImageUploadBefore={toImg}
					getSunEditorInstance={getSunEditorInstance}
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