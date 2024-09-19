"use client";
import CardLayout from "@/components/card/CardLayout";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

export default function () {
	const [loadPage, setLoadPage] = useState(0);
	const [post, setPost] = useState([]);
	const [hasMore, setHasMore] = useState(true);

	const fetchData = async () => {
		try {
			const res = await axios(`/api/postList?loadPage=${loadPage}`);
			setPost((prevPost) => [...prevPost, ...res.data.content]);
			console.log(res);

			setHasMore(!res.data.last);
		} catch (error) {
			console.error("Failed to fetch post:", error);
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
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);
	return (
		<div>
			<CardLayout list={post} />
		</div>
	);
}
