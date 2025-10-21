### A few other things you should consider when using mTLS:

#### Certificate renewal:
- Every cert you issue will expire. You will need to reissue leaf certificates to all servers/clients on a regular basis.
A good way to handle this is to automatically request a new certificate from the CA before it expires.
That way, the CA server can still create a secure connection to the client to transfer the new certificate.
If you are putting certificates on a card or similar, you can automatically generate the certs and install them on the cards.

#### Certificate revocation:
- If a certificate has been compromised, or a user deletes their account, you will have to make sure this cert can't be used for connection.
In a local setting or small app you can just delete the certificate from the CA (the PKI directory).
