# Implementação JWT em TypeScript

## Visão Geral

Este projeto é uma implementação didática do JSON Web Token (JWT) a partir do zero, utilizando TypeScript e o módulo nativo crypto do Node.js.

O objetivo principal é demonstrar o funcionamento interno do protocolo JWT (RFC 7519), incluindo a criação e validação de tokens com o algoritmo HMAC-SHA256, sem o uso de bibliotecas externas.

## Funcionalidades

- **Criação de Tokens (sign):** Gera um token JWT no formato header.payload.signature.
- **Verificação de Tokens (verify):** Valida a autenticidade e a integridade de um token.
- **Validação de Assinatura:** Garante que o token não foi adulterado, usando HMAC-SHA256.
- **Checagem de Tempo de Expiração:** Valida a claim exp para rejeitar tokens expirados.
- **Tratamento de Erros:** Utiliza classes de erro customizadas para falhas de validação.

## Utilização

### Configuração do Ambiente

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
```

Navegue até o diretório e instale as dependências:

```bash
cd seu-repositorio
yarn install
```

Crie um arquivo `.env` na raiz do projeto e defina a chave secreta:

```env
SECRET_KEY="sua-chave-secreta"
```

### Exemplo de Código

```typescript
import { sign } from "./jwt/sign";
import { verify } from "./jwt/verify";

const secret = process.env.SECRET_KEY!;
const expiresIn = 60 * 60 * 1000; // 1 hora

// Gerando o token
const token = sign({
    data: {
        sub: "user-id-123",
        admin: false,
        exp: Date.now() + expiresIn,
    },
    secret: secret,
});

console.log('Token:', token);

// Verificando o token
try {
    const payload = verify({ token: token, secret: secret });
    console.log('Payload:', payload);
} catch (error) {
    console.error('Erro de validação:', error.message);
}
```

## Testes

Para executar os testes, rode no seu terminal o comando `yarn jest` ou `yarn test`, o script já foi adicionado no package.json, o jest já irá procurar dentro do seu diretório um arquivo de testes, quando encontrar irá executar.

## Aviso de Segurança

Esta implementação foi desenvolvida exclusivamente para fins de estudo. Não utilize este código em ambientes de produção. Para aplicações reais, recorra a bibliotecas auditadas e mantidas pela comunidade, como jsonwebtoken.