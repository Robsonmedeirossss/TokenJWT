import { createSignature } from "./createSignature";

export interface IJwtpayload{
    sub: string;
    iat: number;
    admin: boolean;
    exp: number;
}

interface IOptionsSign{
    data: Omit<IJwtpayload, 'iat'>;
    secret: string;
}

export function sign({ data: { sub, admin, exp  }, secret }: IOptionsSign){

    const header = {
        alg: 'HS256',
        typ: 'JWT',
    }

    const payload = {
        sub,
        admin,
        iat: Date.now(),
        exp,
    }

    const headerEncondedBase64Url = Buffer
        .from(JSON.stringify(header))
        .toString('base64url');

    const payloadEncodedBase64Url = Buffer
        .from(JSON.stringify(payload))
        .toString('base64url');

    const signature = createSignature({
        header: headerEncondedBase64Url,
        payload: payloadEncodedBase64Url,
        secret
    });

    return `${headerEncondedBase64Url}.${payloadEncodedBase64Url}.${signature}`;

}