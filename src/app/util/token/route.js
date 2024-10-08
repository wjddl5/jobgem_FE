import { cookies } from "next/headers";
import { NextResponse } from 'next/server';
import { decode } from "js-base64";

export async function GET() {
    const cookie = cookies();
    const token = cookie.get('accessToken')?.value;

    if (!token) {
        return NextResponse.json(null);
    }

    const payload = token.split('.')[1];
    const decodedPayload = decode(payload);
    const payloadObject = JSON.parse(decodedPayload);

    return NextResponse.json(payloadObject);
}
