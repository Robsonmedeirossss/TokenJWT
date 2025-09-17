import { sign } from "./jwt/sign";
import { verify } from "./jwt/verify";

const secret = "secreta";

const token = sign({
    data: {
        sub: "robson.medeiros#123",
        exp: Date.now() + (24 * 60 * 60 * 1000),
        admin: false,
    },
    secret,
});

const payload = verify({token, secret: "secreta"});

console.log(token)
console.log(payload)