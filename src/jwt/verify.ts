import { createSignature } from "./createSignature";
import { ExpiredToken } from "../errors/ExpiredToken";
import { InvalidToken } from "../errors/InvalidToken";
import type { IJwtpayload } from "./sign";

interface IOptionsVerify{
    token: string;
    secret: string;
}

export function verify({ token, secret }: IOptionsVerify){

    const parts = token.split('.');

    if(parts.length < 3) {
        throw new InvalidToken('JWT must be provided');
    }

    const [ headerSent, payloadSent, signatureSent ] = token.split('.');

    if(!headerSent || !payloadSent || !signatureSent) {
        throw new InvalidToken('JWT malformed: token must consist of 3 parts');
    }

    const signature = createSignature({
        header: headerSent!,
        payload: payloadSent!,
        secret,
    })

    if(signature !== signatureSent) {
        throw new InvalidToken('Invalid signature');
    }


    const decodedPayload: IJwtpayload = JSON.parse(
        Buffer.from(payloadSent!, 'base64url')
        .toString('utf-8')
    );

    if(Date.now() > decodedPayload.exp){
        throw new ExpiredToken('Token expired');
    }

    return decodedPayload;

}