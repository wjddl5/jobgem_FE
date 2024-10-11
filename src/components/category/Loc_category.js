'use client';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	Tabs,
	Tab,
	Box,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableContainer,
	TextField,
	Button,
	Checkbox,
	Fab,
	Fade,
	IconButton,
	TableHead,
	Toolbar,
	Tooltip,
	Typography,
	TablePagination,
} from '@mui/material';
import axios from 'axios';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { Delete as DeleteIcon, AddRounded as AddRoundedIcon, Add as AddIcon, Edit as EditIcon } from '@mui/icons-material';
import { alpha } from '@mui/material/styles';

export default function page() {
	// (지역_도) 초기화
	const [value, setValue] = useState(0);
	const [addClick, setAddClick] = useState(false);
	const [addDoClick, setAddDoClick] = useState(false);
	const [loc_do, setLoc_do] = useState([]);
	const [selectDoName, setSelectDoName] = useState('');
	const [addDoName, setAddDoName] = useState('');
	const [editDoName, setEditDoName] = useState('');
	const [editDoRow, setEditDoRow] = useState('');

	function handleChange(event, newValue) {
		setValue(newValue);
		setChkSet(new Set());
		setChkAll(false);
	}

	function getData(sel_do) {
		axios.get('/api/category/loc').then((res) => {
			if (res.data) {
				setLoc_do(res.data);
				if (sel_do == null) {
					getGuSi(res.data[0].id);
					setLdIdx(res.data[0].id);
				} else {
					getGuSi(sel_do);
					setLdIdx(sel_do);
				}
			}
		});
	}

	useEffect(() => {
		getData();
	}, []);

	// (도) 추가
	function addDoItem(addDoClick) {
		switch (addDoClick) {
			case true:
				setAddDoClick(false);
				break;
			case false:
				setAddDoClick(true);
				break;
		}
	}

	function addItem(addClick) {
		switch (addClick) {
			case true:
				setAddClick(false);
				break;
			case false:
				setAddClick(true);
				break;
		}
	}

	function changeAddDoName(event) {
		var n = event.target.value;
		if (n.length > 10) {
			alert('최대 10글자까지 입력할 수 있습니다.');
			event.target.value = n.substring(0, 9);
		} else {
			setAddDoName(n);
		}
	}

	function saveAddDoName() {
		if (addDoName.trim().length < 1) {
			alert('카테고리명을 입력하세요.');
		} else if (addDoName.length > 10) {
			alert('최대 10글자까지 입력할 수 있습니다.');
		} else {
			axios
				.post('/api/category/loc', null, {
					params: {
						itemName: addDoName.trim(),
					},
				})
				.then((res) => {
					if (res.data) {
						alert('저장완료');
						setAddDoName('');
						setAddDoClick(false);
						setValue(0);
						document.getElementById('AddDoNameField').value = '';
						getData();
					} else if (res.data == false) {
						alert('중복된 이름이 존재합니다.');
						document.getElementById('AddDoNameField').focus();
					} else {
						alert('오류가 발생했습니다.\n 다시 시도해주세요.');
					}
				});
		}
	}

	// (도) 수정
	function changeEditDoName(event) {
		var n = event.target.value;
		if (n.length > 10) {
			alert('최대 10글자까지 입력할 수 있습니다.');
			event.target.value = n.substring(0, 9);
		} else {
			setEditDoName(n);
		}
	}

	function saveEditDoName(id) {
		if (editDoName.trim().length < 1) {
			alert('카테고리명을 입력하세요.');
		} else if (editDoName.length > 10) {
			alert('최대 10글자까지 입력할 수 있습니다.');
		} else {
			axios
				.put(`/api/category/loc/${id}`, null, {
					params: {
						editDoName: editDoName.trim(),
					},
				})
				.then((res) => {
					if (res.data) {
						alert('수정완료');
						setEditDoRow('');
						setEditDoName('');
						getData(ldIdx);
					} else if (res.data == false) {
						alert('중복된 이름이 존재합니다.');
						document.getElementById('editDoNameFeild').focus();
					} else {
						alert('오류가 발생했습니다.\n 다시 시도해주세요.');
					}
				});
		}
	}

	// (도) 삭제
	function removeDoName(id) {
		if (confirm('해당 항목에 포함된 하위 항목들도 모두 삭제됩니다.\n삭제하시겠습니까?')) {
			axios.delete(`/api/category/loc/${id}`).then((res) => {
				if (res.data == true) alert('삭제 완료 되었습니다.');
				else alert('오류가 발생했습니다.\n 다시 시도해주세요.');
				getData();
			});
		}
	}
	// ========================
	//
	//
	// (지역_구,시) 초기화
	const [loc_gusi, setLoc_gusi] = useState([]);
	const [editRow, setEditRow] = useState('');
	const [itemName, setItemName] = useState('');
	const [editItemName, setEditItemName] = useState('');
	const [ldIdx, setLdIdx] = useState(0);

	function getGuSi(ldIdx) {
		axios.get(`/api/category/locGuSi/${ldIdx}`).then((res) => {
			setLoc_gusi(res.data);
		});
	}

	//(구,시) 추가
	function addItem(addClick) {
		switch (addClick) {
			case true:
				setAddClick(false);
				break;
			case false:
				setAddClick(true);
				break;
		}
	}

	function changeItemName(event) {
		var n = event.target.value;
		if (n.length > 10) {
			alert('최대 10글자까지 입력할 수 있습니다.');
			event.target.value = n.substring(0, 9);
		} else {
			setItemName(n);
		}
	}

	function saveItem() {
		if (itemName.trim().length < 1) {
			alert('카테고리명을 입력하세요.');
		} else if (itemName.length > 10) {
			alert('최대 10글자까지 입력할 수 있습니다.');
		} else {
			axios
				.post(`/api/category/locGuSi/${ldIdx}`, null, {
					params: {
						itemName: itemName.trim(),
					},
				})
				.then((res) => {
					if (res.data) {
						alert('저장성공');
						setItemName('');
						document.getElementById('itemNameField').value = '';
						getData(ldIdx);
					} else if (res.data == false) {
						alert('중복된 이름이 존재합니다.');
						document.getElementById('itemNameField').focus();
					} else {
						alert('오류가 발생했습니다.\n 다시 시도해주세요.');
					}
				});
		}
	}

	//(구,시) 수정
	function editClick(id) {
		setEditRow(id);
		setAddClick(false);
	}

	function changeEditItemName(event) {
		var n = event.target.value;
		if (n.length > 10) {
			alert('최대 10글자까지 입력할 수 있습니다.');
			event.target.value = n.substring(0, 9);
		} else {
			setEditItemName(n);
		}
	}

	function editItem(id) {
		if (editItemName.trim().length < 1) {
			alert('카테고리명을 입력하세요.');
		} else if (editItemName.length > 10) {
			alert('최대 10글자까지 입력할 수 있습니다.');
		} else {
			axios
				.put(`/api/category/locGuSi/${id}`, null, {
					params: {
						editItemName: editItemName.trim(),
					},
				})
				.then((res) => {
					if (res.data) {
						alert('수정완료');
						setEditItemName('');
						setChkSet(new Set());
						setChkAll(false);
						getData(ldIdx);
					} else if (res.data == false) {
						alert('중복된 이름이 존재합니다.');
						document.getElementById('editField').focus();
					} else {
						alert('오류가 발생했습니다.\n 다시 시도해주세요.');
					}
				});
		}
	}

	//(구,시) 삭제
	function removeItem(chkList) {
		const chkAraay = Array.from(chkList);
		if (confirm('체크한 항목을 삭제하시겠습니까?')) {
			axios
				.delete('/api/category/locGuSi', {
					params: {
						chkList: chkAraay,
					},
				})
				.then((res) => {
					if (res.data == true) alert('삭제 완료 되었습니다.');
					else alert('오류가 발생했습니다.\n 다시 시도해주세요.');
					setChkSet(new Set());
					setChkAll(false);
					getData(ldIdx);
				});
		}
	}
	//===================
	//
	//체크박스
	const [chkSet, setChkSet] = useState(new Set());
	const [chkAll, setChkAll] = useState(false); //false=전체선택해제

	function allCheckChange(event) {
		if (event.target.checked) {
			const chkRow = new Set(loc_gusi.map((row) => row.id));
			setChkSet(chkRow);
			setChkAll(true);
		} else {
			setChkSet(new Set());
			setChkAll(false);
		}
	}

	function checkChange(event, id) {
		const chk = new Set(chkSet); // chkSet 가져와서 set 생성

		if (event.target.checked) {
			// 클릭된 체크박스
			chk.add(id); // 항목 추가
		} else {
			chk.delete(id); // 항목 삭제
		}
		setChkSet(chk); // 상태 업데이트
	}

	//
	// ================
	// 페이지

	return (
		<>
			<Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', flexDirection: 'column', height: 550, boxShadow: 2 }}>
				<Toolbar
					sx={[
						{
							pl: { sm: 2 },
							pr: { xs: 1, sm: 1 },
						},
						chkSet.size > 0 && {
							bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
						},
					]}
				>
					{chkSet.size > 0 ? (
						<Typography sx={{ flex: '1 1 100%' }} color='inherit' variant='subtitle1' component='div'>
							{chkSet.size} selected
						</Typography>
					) : (
						<Typography sx={{ flex: '1 1 100%' }} variant='h6' id='tableTitle' component='div' color='#000000DE'>
							Location
						</Typography>
					)}

					{chkSet.size > 0 ? (
						<Tooltip title='Delete'>
							<IconButton onClick={() => removeItem(chkSet)}>
								<DeleteIcon />
							</IconButton>
						</Tooltip>
					) : (
						''
					)}
				</Toolbar>

				{/* 탭과 테이블을 가로로 정렬하기 위한 컨테이너 */}
				<Box sx={{ display: 'flex', flex: 1, height: '500px', overflow: 'hidden' }}>
					<Tabs
						orientation='vertical'
						variant='scrollable'
						value={value}
						onChange={handleChange}
						aria-label='Vertical tabs example'
						sx={{ borderRight: 1, borderColor: 'divider', width: 300, overflow: 'auto', maxHeight: '100%' }}
					>
						{loc_do.map((row) => (
							<Tab
								label={
									row.id != editDoRow ? (
										row.name
									) : (
										<div style={{ display: 'flex', alignItems: 'center' }}>
											<TextField
												id='editDoNameFeild'
												style={{
													width: '70%',
													marginRight: 'auto',
													minHeight: '46px',
												}}
												defaultValue={row.name}
												onChange={changeEditDoName}
											/>
											<div style={{ display: 'flex', flexDirection: 'column' }}>
												<Button size='small' style={{ marginBottom: '2px', height: '27px' }} onClick={() => saveEditDoName(row.id)}>
													저장
												</Button>
												<Button size='small' style={{ height: '27px' }} color='error' onClick={() => removeDoName(row.id)}>
													삭제
												</Button>
											</div>
										</div>
									)
								}
								key={row.id}
								onClick={() => {
									if (editDoRow != row.id) {
										getGuSi(row.id);
										setAddDoClick(false);
										setSelectDoName(row.name);
										setEditDoRow(row.id);
										setLdIdx(row.id);
									}
								}}
							/>
						))}
						<Tab
							style={{ maxHeight: '50%', color: '#1976d2', fontWeight: 'bold' }}
							onClick={() => {
								addDoItem(false);
								setEditDoRow('');
							}}
							disabled={addDoClick}
							label={addDoClick ? '추가할 카테고리 입력' : <AddIcon />}
						/>
						{addDoClick ? (
							<div style={{ display: 'flex', alignItems: 'center', width: '250px' }}>
								<TextField
									id='AddDoNameField'
									style={{
										width: '140px',
										marginRight: '13px',
										marginLeft: '16px',
										minHeight: '46px',
									}}
									onChange={changeAddDoName}
								/>
								<div style={{ display: 'flex', flexDirection: 'column' }}>
									<Button size='small' style={{ marginBottom: '2px', height: '27px' }} onClick={() => saveAddDoName()}>
										저장
									</Button>
									<Button size='small' style={{ height: '27px' }} color='error' onClick={() => addDoItem(true)}>
										취소
									</Button>
								</div>
							</div>
						) : (
							''
						)}
					</Tabs>

					{/* 지역(구,시) 테이블 컴포넌트 */}
					<TableContainer sx={{ flex: 1, overflow: 'auto', maxHeight: '100%' }}>
						<Table sx={{ width: '100%' }} aria-labelledby='tableTitle' size={'medium'}>
							<TableHead>
								<TableRow>
									<TableCell sx={{ width: '100px' }}>
										<Checkbox color='primary' checked={chkSet.size === loc_gusi.length && chkSet.size > 0} onChange={allCheckChange}></Checkbox>
									</TableCell>
									<TableCell sx={{ width: '150px' }} style={{ fontWeight: 'bold' }}>
										id
									</TableCell>
									<TableCell sx={{ width: '*' }} style={{ fontWeight: 'bold' }}>
										name
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{loc_gusi.map((row) => (
									<TableRow
										key={row.id}
										hover
										style={{ height: '80px' }}
										sx={{ cursor: 'pointer' }}
										onClick={() => {
											editClick(row.id);
										}}
									>
										<TableCell>
											<Checkbox checked={chkSet.has(row.id)} onChange={(event) => checkChange(event, row.id)} onClick={(event) => event.stopPropagation()} />
										</TableCell>
										{editRow != row.id ? (
											<>
												<TableCell component='th' scope='row' padding='12px' sx={{ maxWidth: '50px' }}>
													{row.id}
												</TableCell>
												<TableCell component='th' scope='row' padding='12px' sx={{ minWidth: '150px' }}>
													{row.lgName}
												</TableCell>
											</>
										) : (
											<>
												<TableCell>{row.id}</TableCell>
												<TableCell component='th' scope='row' padding='12px' sx={{ minWidth: '200px' }}>
													<TextField id='editField' style={{ width: '300px' }} onChange={changeEditItemName} defaultValue={row.lgName} />
													<Button
														variant='text'
														size='small'
														style={{ margin: '13px 0 0 7px' }}
														onClick={() => {
															editItem(row.id);
														}}
													>
														저장
													</Button>
												</TableCell>
											</>
										)}
									</TableRow>
								))}
								<TableRow style={{ height: '90px' }}>
									<TableCell colSpan={2} style={{ padding: '12px' }}>
										<Fab
											color='primary'
											size='small'
											aria-label='add'
											onClick={() => {
												addItem(addClick);
												setEditRow('');
											}}
										>
											{addClick ? <RemoveOutlinedIcon /> : <AddIcon />}
										</Fab>
									</TableCell>
									<TableCell>
										<Fade in={addClick}>
											<div>
												<TextField id='itemNameField' onChange={changeItemName} style={{ width: '300px' }} type='' />
												<Button
													variant='outlined'
													size='small'
													style={{ marginLeft: '7px', height: '56px' }}
													onClick={() => {
														saveItem();
													}}
												>
													저장
												</Button>
											</div>
										</Fade>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</Box>
		</>
	);
}
