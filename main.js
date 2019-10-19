const base64url = source => {
  // Encode in classical base64
  encodedSource = CryptoJS.enc.Base64.stringify(source);

  // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, '');

  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, '-');
  encodedSource = encodedSource.replace(/\//g, '_');

  return encodedSource;
};

const createJwt = ({ header, claims, secret }) => {
  const stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
  const encodedHeader = base64url(stringifiedHeader);

  const stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(claims));
  const encodedData = base64url(stringifiedData);

  const signature = `${encodedHeader}.${encodedData}`;
  const signedSignature = CryptoJS.HmacSHA256(signature, secret.value);
  const finalSignature = secret.base64encoded ? base64url(signedSignature) : signedSignature;

  return `${encodedHeader}.${encodedData}.${finalSignature}`;
};

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

export default createJwt;
