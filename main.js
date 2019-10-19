import CryptoJS from 'crypto-js/core';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';

const base64url = source => {
  // Encode in classical base64
  let encodedSource = Base64.stringify(source);

  // Remove padding equal characters
  encodedSource = encodedSource.replace(/=+$/, '');

  // Replace characters according to base64url specifications
  encodedSource = encodedSource.replace(/\+/g, '-');
  encodedSource = encodedSource.replace(/\//g, '_');

  return encodedSource;
};

const createJwt = ({ header, claims, secret }) => {
  const stringifiedHeader = Utf8.parse(JSON.stringify(header));
  const encodedHeader = base64url(stringifiedHeader);

  const stringifiedData = Utf8.parse(JSON.stringify(claims));
  const encodedData = base64url(stringifiedData);

  const signature = `${encodedHeader}.${encodedData}`;
  const signedSignature = CryptoJS.HmacSHA256(signature, secret.value);
  const finalSignature = secret.base64encoded ? base64url(signedSignature) : signedSignature;

  return `${encodedHeader}.${encodedData}.${finalSignature}`;
};

export default createJwt;
