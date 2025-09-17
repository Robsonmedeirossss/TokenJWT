import { createHmac } from "crypto";

interface ISignatureOptions{
    header: string;
    payload: string;
    secret: string;
}

export function createSignature({ header, payload, secret }: ISignatureOptions){

    const hash = createHmac('sha256', secret);

    return hash
        .update(`${header}.${payload}`)
        .digest('base64url');
}