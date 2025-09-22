import { sign } from "./jwt/sign";
import { verify } from "./jwt/verify";



const acessToken = sign({
    data: {
        sub: "robson.medeiros#123",
        exp: Date.now() + (24 * 60 * 60 * 1000),
        admin: false,
    },
    secret: process.env.SECRET_KEY!,
});

const payload = verify({token: acessToken, secret: process.env.SECRET_KEY!});

console.log({ acessToken })
console.log({ payload })