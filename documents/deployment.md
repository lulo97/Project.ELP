
# Deployment
---

## 1. Purchase a VPS

- Buy a Debian VPS from [id.thuevpsgiare.vn](https://id.thuevpsgiare.vn)  

---

## 2. Set up a Free Domain with DuckDNS

- Register a free subdomain at [DuckDNS.org](https://www.duckdns.org)  
- Domain: `elpprojectlulo97.duckdns.org` point to VPS IP `x.x.x.x`

---

## 3. Connect to VPS through Powershell

```bash
ssh root@x.x.x.x
```

---

## 4. Set up Dynamic DNS Update Script

Add a `duck.sh` file for DuckDNS configuration:

```bash
mkdir -p ~/duckdns

cd ~/duckdns

nano duck.sh

echo url="https://www.duckdns.org/update?domains=elpprojectlulo97&token=TOKEN&ip=" | curl -k -o ~/duckdns/duck.log -K -
```

Add permission to root user to execute script:

```bash
chmod +x ~/duckdns/duck.sh
```

Test the script:

```bash
~/duckdns/duck.sh
cat ~/duckdns/duck.log
```

### Schedule the script with Cron every 5 minutes

```bash
crontab -e

*/5 * * * * ~/duckdns/duck.sh >/dev/null 2>&1
```

---

## 5. Set up Nginx Reverse Proxy for Express App

Install Nginx:

```bash
sudo apt install nginx -y
```

Create a configuration file:

```bash
sudo nano /etc/nginx/sites-available/elpprojectlulo97
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name elpprojectlulo97.duckdns.org;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/elpprojectlulo97 /etc/nginx/sites-enabled/
```

Test the configuration:

```bash
sudo nginx -t
```

Restart Nginx:

```bash
sudo systemctl restart nginx
```

---

## 6. Access

Open in browser: [http://elpprojectlulo97.duckdns.org](http://elpprojectlulo97.duckdns.org)

# 7. Setting network

Create network "elp-network":
```bash
docker network create elp-network
```

Adding this command to every docker run command: 

```bash
--network elp-network
```

**Containers dependency problem:** Application need to run after Redis and PostgreSQL container.

# 8. Service notes
- Application using .env file and loaded in runtime -> If using esbuild then dotenv will failed in runtime -> Using flag --env-file in docker to inject .env.production

