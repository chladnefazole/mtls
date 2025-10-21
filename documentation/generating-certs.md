#### You need the following certs to configure MTLS:
- Certificate Authority (CA) cert
- **Server cert:** basically the same as the SSL cert you use on any website
- **Client cert:** 1 for each client (user/server) that wants to connect to the "main" server

#### To setup a CA, these steps must be completed:
- Setup CA config
- Issue root certificate
- Import CA to anywhere certs issued by this CA will be used:
    - "main" server
    - Each client

#### To create server/client certificates, complete these steps:
- Create certificate signing request (CSR) for each server & client
    - "main" server
    - Each client
- Sign each CSR with your CA

This guide will tell you how to complete these steps: https://linuxconfig.org/how-to-configure-certificate-authority-on-ubuntu-debian
How to install a root CA on Ubuntu: https://documentation.ubuntu.com/server/how-to/security/install-a-root-ca-certificate-in-the-trust-store/
