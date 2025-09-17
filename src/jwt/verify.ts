import { createSignature } from "./createSignature";
import type { IJwtpayload } from "./sign";

interface IOptionsVerify{
    token: string;
    secret: string;
}

export function verify({ token, secret }: IOptionsVerify){

    const parts = token.split('.');

    if(parts.length < 3) throw new Error('Token JWT invalid, incorrect format');

    const [ headerSent, payloadSent, signatureSent ] = token.split('.');

    if(!headerSent || !payloadSent || !signatureSent) throw new Error('Token JWT invalid');

    const signature = createSignature({
        header: headerSent!,
        payload: payloadSent!,
        secret,
    })

    if(signature !== signatureSent) throw new Error('Token JWT invalid');


    const decodedPayload: IJwtpayload = JSON.parse(Buffer.from(payloadSent!, 'base64url').toString('utf-8'));

    if(Date.now() > decodedPayload.exp){
        throw new Error('Token expired');
    }

    return decodedPayload;

}