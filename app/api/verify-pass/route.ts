import {prisma} from '@/lib/prisma'
import { NextResponse } from 'next/server'
import crypto from "crypto"

export async function POST(req: Request){
    const body = await req.json();
    const { shortId , password } = body;


if(!shortId || !password){
    return NextResponse.json({error: "Missing fields"},{status: 400});
}

const hash = crypto.createHash('sha256').update(password).digest("hex");

const file = await prisma.file.findUnique({
    where: { shortId },
})

if (!file){
    return NextResponse.json({error: "File not found"},{status: 404});
}

if(file.password !== hash){
    return NextResponse.json({error: "Wrong Password"},{status: 401});
}

return NextResponse.json({success: true});
}