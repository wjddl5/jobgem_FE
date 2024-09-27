'use client';
import CardLayout from '@/components/card/CardLayout';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import './globals.css';
import Header from '@/components/common/header/Header';
import Footer from '@/components/common/footer/Footer';
import { getToken } from './util/token/token';
export default function () {
	const [loadPage, setLoadPage] = useState(0);
	const [post, setPost] = useState([]);
	const [hasMore, setHasMore] = useState(true);

	const fetchData = async () => {
		try {
			const res = await axios(`/api/jobseeker/posts/main?loadPage=${loadPage}`);
			setPost((prevPost) => [...prevPost, ...res.data.content]);
			console.log(res);

			setHasMore(!res.data.last);
		} catch (error) {
			console.error('Failed to fetch post:', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [loadPage]);

	const handleScroll = () => {
		if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || !hasMore) return;
		setLoadPage((prevLoadPage) => prevLoadPage + 1);
	};

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);
	return (
		<div>
			<div style={{ backgroundColor: 'rgb(98, 119, 141)' }}>
				<img src='/img/top_banner.jpg' style={{ margin: 'auto' }} />
			</div>
			<Header />
			<main className='main'>
				<div>
					<img src='/img/banner.png' alt='d' />
				</div>
				<div>
					<CardLayout list={post} />
				</div>
			</main>
			<Footer />
		</div>
	);
}
