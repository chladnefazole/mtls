### Certificates need to be in different formats according to where they are used:

#### Server cert:
This depends on what your server is running:
- I use .pem with a separate .key file for Apache
- IIS is easy to use with either .pem or .p12
- Depending on the clients, TLS version, etc. you will have to choose the format for you. For example if you need IE support (don't ask) or your client will use a certificate from a card, you may need to adjust the algorithm used to allow compatibility with older versions of TLS.

#### Client cert:
- Firefox, Chrome, etc. use .p12
- For a server connecting to your "main" server, see above

This guide uses easy-rsa package on Ubuntu. By default, the certificates are generated using settings from the OpenSSL package.

**Convert from .crt to .pem:**
````openssl x509 -in mycert.crt -out mycert.pem -outform PEM````

**Convert from .pem to .p12:**
````openssl pkcs12 -export -out mycert.p12 -inkey mykey.pem -in mycert.pem````
