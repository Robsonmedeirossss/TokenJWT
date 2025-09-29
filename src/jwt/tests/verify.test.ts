import { verify } from '../verify';
import { sign } from '../sign';

const secret = 'seu-segredo-de-teste';
const outroSecret = 'um-segredo-diferente';

describe('verify', () => {

    it('deve verificar um token válido e retornar o payload', () => {
        const payloadData = { sub: '123', admin: true, exp: Date.now() + 5000 };
        const token = sign({ data: payloadData, secret });
        const decodedPayload = verify({ token, secret });
        expect(decodedPayload.sub).toBe(payloadData.sub);
        expect(decodedPayload.admin).toBe(payloadData.admin);
    });

    it('deve lançar um erro se a assinatura for inválida', () => {
        const token = sign({ data: { sub: '123', exp: Date.now() + 5000, admin: false }, secret });
        expect(() => verify({ token, secret: outroSecret })).toThrow('Invalid signature');
    });



    it('deve lançar um erro se o token estiver expirado', () => {
        const tokenExpirado = sign({ data: { sub: '123', exp: Date.now() - 5000, admin: false }, secret });
        expect(() => verify({ token: tokenExpirado, secret })).toThrow('Token expired');
    });
});