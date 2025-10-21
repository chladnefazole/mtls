To make a Node.JS app available online with Apache, you need to complete the following steps:

Apache:
- Install Apache
- Create a new site in Apache config
- Create a directory for the site files
- Adjust Apache config to redirect requests to your site
- Add server cert, key, cert chain to Apache config
- Make sure Apache is listening to port 443 (and 80 if you want to offer it)
- Redirect requests from 443/80 to your NodeJS app port

Firewall:
- Allow access to ports from the web (443 and, optionally, 80)
- Guide for Apache on Ubuntu here: https://www.digitalocean.com/community/tutorials/ufw-essentials-common-firewall-rules-and-commands

Node:
- Create your NodeJS app
- Setup build scripts, to build to the directory you setup during the Apache config (optional but it keeps things nice and neat)
- Run the Node app (pm2 or nodemon are great) - on Linux, make sure the app is running on a port > 1024

DNS:
- Buy a domain name!
- Setup DNS to route traffic to your server's IP

When setting up MTLS, you have a choice where you'd like to do the TLS negotiation. You can use Apache, NGINX, IIS, or you can configure NodeJS directly to negotiate with the client.

I have used Apache here because:
- Apache ModSecurity is a powerful tool for controlling requests to the server. You can check all headers, body, etc. of the request and tailor it to specifically match your application's traffic.
- The MTLS negotiation can'be passed through, your client must authenticate to the server directly. This means that if you want to run multiple apps on the same server, they will have to close the session and reopen it every time they want to reconnect (ex. during redirects between website.com and forum.website.com, for instance). The user will have to close the browser and reopen it! With MTLS in Apache, your Apache server will act as a proxy to your site. Apache will negotiate with the client, and once the client is authenticated their requests can be forwarded to whichever app Apache determines is the correct destination, without renegotiating the TLS connection.
