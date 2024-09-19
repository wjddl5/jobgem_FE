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
	const [boImage, setBoImage] = useState('');
	const [imageFile, setImageFile] = useState('');

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
					boImage: boImage,
				},
			})
			.then((res) => {
				if (res.data == true) {
					alert('저장완료');
					router.push('/admin/bbs/notice/list');
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

	function handleImageUpload(targetImgElement) {
		console.log(targetImgElement);

		// 이미지 src 속성에서 Base64 데이터를 추출
		const src = targetImgElement.src;

		// src가 Base64인지 확인
		if (src.startsWith('data:image')) {
			// Base64 데이터를 Blob으로 변환
			const base64Data = src.split(',')[1]; // Base64 부분만 추출
			const contentType = src.match(/data:(.*);base64/)[1]; // MIME 타입 추출
			const byteCharacters = atob(base64Data); // Base64 디코딩
			const byteNumbers = new Array(byteCharacters.length);

			for (let i = 0; i < byteCharacters.length; i++) {
				byteNumbers[i] = byteCharacters.charCodeAt(i);
			}

			const byteArray = new Uint8Array(byteNumbers);
			const file = new Blob([byteArray], { type: contentType });

			const formData = new FormData();
			formData.append('file', file, targetImgElement.getAttribute('data-file-name') || 'image.png');

			axios
				.post('/api/files/upload', formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				})
				.then((res) => {
					setBoImage(res.data);
				});
		} else {
			console.error('이미지 src가 Base64 형식이 아닙니다.');
		}
	}

	// 페이지
	return (
		<div className='write_container'>
			<form>
				<h2 className='h2'>공지사항 작성</h2>
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
					onImageUpload={handleImageUpload}
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
