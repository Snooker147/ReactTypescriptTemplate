@ECHO OFF
mkdir certs
cd certs
openssl req -nodes -new -x509 -keyout serverkey.pem -out servercert.pem