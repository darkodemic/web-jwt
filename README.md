# web-jwt
Simple package to create JWT tokens in browser.

Package is WIP.

TODO:

- [ ] Support more then one algorithm

- [ ] Support decoding the jwt tokens

Example:

```javascript
const token = createJwt({
  header: {
    alg: 'HS256',
    typ: 'JWT'
  },
  claims: {
    id: 42,
    name: 'Darko'
  },
  secret: {
    value: 'secret-key-string',
    base64encoded: true
  }
});
```
