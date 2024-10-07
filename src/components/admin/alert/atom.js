"use client";
import { atom } from 'recoil';

export const qnaState = atom({
    key: 'qnaState',
    default: [],
});
export const blacklistState = atom({
    key: 'blacklistState',
    default: [],
});