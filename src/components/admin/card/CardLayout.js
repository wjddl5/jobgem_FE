'use client';

import React, {useEffect, useState} from 'react';
import Card from "@/components/admin/card/Card";
import axios from "axios";

function CardLayout({list}) {
    return (
        <div className="relative pt-2 lg:pt-2 min-h-screen">
            <div className="bg-cover w-full flex justify-center items-center">
                <div className="w-full bg-white bg-opacity-40 backdrop-filter backdrop-blur-lg">
                    <div className="w-12/12 mx-auto rounded-2xl bg-white bg-opacity-40 backdrop-filter backdrop-blur-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-center px-2 mx-auto">
                            {
                                list.map((el, idx) => (
                                    <Card item={el} key={idx}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default CardLayout;