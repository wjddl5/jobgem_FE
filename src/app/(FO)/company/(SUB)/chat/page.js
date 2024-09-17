'use client';
import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Stomp } from "@stomp/stompjs";

function Page() {
    const usId = 1;
    const stompClient = useRef(null);
    const [chatRooms, setChatRooms] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [selectedChat, setSelectedChat] = useState(null);
    const [chatList, setChatList] = useState([]);

    // 채팅방 목록을 서버에서 불러오는 함수
    const fetchChatRooms = () => {
        axios.get("/api/chatroom", { params: { id: usId } }).then((res) => {
            setChatRooms(res.data);
        })
    };

    const fetchChatList = (chatroomId) => {
        axios.get(`/api/chatroom/${chatroomId}/chat`).then((res)=>{
            setChatList(res.data);
        })
    }

    // 웹소켓 연결 설정
    const connect = (chatRoomId) => {
        stompClient.current = Stomp.over(function(){
            return new WebSocket('ws://localhost:8080/ws')
        });
        stompClient.current.connect({}, () => {
            stompClient.current.subscribe(`/sub/chatroom/${chatRoomId}`, (message) => {
                const newMessage = JSON.parse(message.body);
                newMessage.chDate = new Date().toLocaleDateString().replaceAll(".", "-");
                setChatList((prevMessages) => [...prevMessages, newMessage]);
            });
        }, (error) => {
            console.error('STOMP connection error:', error);
        });
    };

    // 웹소켓 연결 해제
    const disconnect = () => {
        if (stompClient.current) {
            stompClient.current.disconnect();
        }
    };

    // 메시지 전송
    const sendMessage = () => {
        if (stompClient.current && inputValue && selectedChat) {
            const body = {
                chContent: inputValue,
                cmIdx: selectedChat.id,
                usIdx: usId,
            };
            stompClient.current.send(`/pub/chat`, {}, JSON.stringify(body));
            setInputValue('');
            fetchChatList(selectedChat.id);
        }
    };

    // 컴포넌트 로드 시 채팅방 목록 불러오기
    useEffect(() => {
        fetchChatRooms();
    }, []);

    // 선택된 채팅방이 변경될 때마다 메시지와 웹소켓 연결 설정
    useEffect(() => {
        if (selectedChat) {
            connect(selectedChat.id);
        }
        return () => {
            disconnect(); // 선택된 채팅방이 변경되면 기존 웹소켓 연결 해제
        };
    }, [selectedChat]);

    const selectedChatRoom = (chat) => {
        setSelectedChat(chat);
        setChatList(chat.chatList);
    }

    return (
        <>
        {
            chatRooms.length > 0 ? <div className="flex h-screen">
                <div className="w-1/4 bg-gray-100 border-r border-gray-300 pr-1">
                    <div className="space-y-2">
                        {chatRooms.map((chat) => (
                            <div
                                key={chat.id}
                                className={`p-3 rounded-lg ${selectedChat?.id === chat.id ? 'bg-yellow-100' : 'bg-white'} cursor-pointer`}
                                onClick={() => selectedChatRoom(chat)}
                            >
                                <div className="flex justify-between">
                                    <span className="font-semibold">{chat.joinUser.usId}</span>
                                    <span
                                        className="text-sm text-gray-500">{chat.chatList[chat.chatList.length - 1]?.chDate}</span>
                                </div>
                                <p className="text-sm text-gray-600 truncate">{chat.chatList[chat.chatList.length - 1]?.chContent}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-3/4 flex flex-col bg-white">
                    {chatList ? (
                        <div className="flex flex-col justify-between h-full p-6">
                            <div className="flex-grow space-y-4">
                                {chatList?.map((chat, index) => (
                                    <div key={index}
                                         className={`flex ${chat.usIdx === usId ? 'justify-end' : 'justify-start'}`}>
                                        <div
                                            className={`rounded-lg p-3 ${chat.usIdx === usId ? 'bg-yellow-100' : 'bg-gray-200'}`}>
                                            <p className="text-sm">{chat.chContent}</p>
                                            <div className="text-xs text-gray-400 text-right">{chat.chDate}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-2 border-t border-gray-300 mt-4">
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="메시지를 입력하세요. (Enter: 줄바꿈)"
                                className="w-full px-4 py-3 border-none focus:outline-none resize-none"
                            />
                                <button className="flex-shrink-0 px-4 py-2 bg-blue-500 text-white rounded-lg"
                                        onClick={sendMessage}>전송
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p>채팅방을 선택하세요</p>
                    )}
                </div>
            </div> : <p>채팅방이 없습니다.</p>
        }
        </>
    );
}

export default Page;
