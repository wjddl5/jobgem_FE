"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/card/Card";
import axios from "axios";
import Link from "next/link";

function CardLayout({ list }) {
	return (
		<div className='relative pt-2 lg:pt-2 min-h-screen'>
			<div className='bg-cover w-full flex justify-center items-center'>
				<div className='w-full  bg-opacity-40 backdrop-filter backdrop-blur-lg'>
					<h2 style={{ fontFamily: "BM", fontSize: "20px", color: "#515467", padding: "20px 0", display: "inline-block" }}>모집공고</h2>
					<Link href='/recruit' style={{ fontFamily: "BM", fontSize: "20px", color: "#515467", padding: "20px 0", float: "right" }}>
						+더보기
					</Link>
					<div className='w-12/12 mx-auto rounded-2xl bg-opacity-40 backdrop-filter backdrop-blur-lg'>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-center mx-auto'>
							{list.map((el, idx) => (
								<Card item={el} key={idx} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CardLayout;
