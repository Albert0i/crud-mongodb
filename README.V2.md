## Dockerization on Windows container

<div style="text-align: right; color:white; background-color:black; font-size: small;">
Have you ever been tempted to try on unorthodox or even unethical things in early adolescence? 
</div>


### Prologue
Previously, we've dockerized [crud-mongodb](https://github.com/Albert0i/crud-mongodb) on linux container. Dockerizing on Windows container is such a challenging task due to intrinsic deficiency and subtle incompatibility, is a far more difficult way to deploy our app.

Few of us ever try or even know of `Windows container`, ie. a kind of container inside which  windows compatible binaries are run. Windows container is such a *niche market* that scarcely no useful resource could be found without tremendous endeavour. Enjoy this fantastic voyage if you are a windows maniac (like me)... 


### I. [Output Options](https://nextjs.org/docs/pages/api-reference/next-config-js/output#automatically-copying-traced-files)
The whole thing hinges on standalone mode as described in official documentations. 

> Next.js can automatically create a standalone folder that copies only the necessary files for a production deployment including select files in node_modules.

> To leverage this automatic copying you can enable it in your next.config.js:
next.config.js
```
module.exports = {
  output: 'standalone',
}
```
> This will create a folder at .next/standalone which can then be deployed on its own without installing node_modules.

> Additionally, a minimal server.js file is also output which can be used instead of next start. 

> This minimal server does not copy the public or .next/static folders by default as these should ideally be handled by a CDN instead, although these folders can be copied to the standalone/public and standalone/.next/static folders manually, after which server.js file will serve these automatically.


### II. Dockerfile
Based on [With Docker](https://github.com/vercel/next.js/tree/canary/examples/with-docker), I mimic the steps carefully. The base OS is either `nanoserver:20H2` or `servercore:20H2`. I am in favor of nanoserver for it's smaller in size. 

The elaborated version of our manuscript is like this: 

```
FROM mcr.microsoft.com/windows/nanoserver:20H2 as builder

WORKDIR /app
COPY *.json *.js node-v18.16.1-win-x64.zip ./

# Add NodeJS to search path 
ENV PATH="C:\Windows\system32;C:\Windows;C:\app\node-v18.16.1-win-x64;"
 
# Because we don't have PowerShell, we will install using CURL and TAR
RUN tar.exe -xf node-v18.16.1-win-x64.zip && \
    del node-v18.16.1-win-x64.zip 

COPY actions ./actions 
COPY app ./app
COPY components ./components
COPY libs ./libs 
COPY models ./models 
COPY viewModels/ ./viewModels

RUN npm ci && \
    npm run build 

### 
FROM mcr.microsoft.com/windows/nanoserver:20H2 as runner 

WORKDIR /app
COPY node-v18.16.1-win-x64.zip  ./

# Add NodeJS to search path 
ENV PATH="C:\Windows\system32;C:\Windows;C:\app\node-v18.16.1-win-x64;"

# Because we don't have PowerShell, we will install using CURL and TAR
RUN tar.exe -xf node-v18.16.1-win-x64.zip && \
    del node-v18.16.1-win-x64.zip 

COPY --from=builder /app/.next/standalone .next/standalone
COPY --from=builder /app/.next/static .next/standalone/.next/static
COPY public .next/standalone/public

EXPOSE 3000
ENTRYPOINT ["node", ".next/standalone/server.js"]
```
As you can see, a two stage built is used 


![alt yrunner-build](img/yrunner-build-1.JPG)

![alt yrunner-history](img/yrunner-history-1.JPG)

![alt load-failed](img/yrunner-logs-1.JPG)


### II. docker-compose.yml
To leverage our docker image, we need a `docker-compose` and `Makefile` file, so as to bring up the entire *ecology circle*. 

```
version: "3"
services:

  nginx:
    image: 
      ${NGINX_IMAGE_NAME}:${NGINX_IMAGE_VERSION}
    ports:
      - "8989:8989"
    volumes:
      - ${NGINX_CONF_DIR}:C:\nginx\conf
    depends_on:
      - yrunner

  yrunner:
    build: 
      context: .
    image: 
      ${IMAGE_NAME}:${IMAGE_VERSION}
    volumes:
      - ${DATA_DIR}:C:\app\data
      - ${LOG_DIR}:C:\app\logs
    deploy:
      replicas: 2
    env_file: .env
```

As you can see, we run [Nginx](https://www.nginx.com/) as reverse proxy and two copies of `yrunner` as backend server. 

![alt make-up](img/yrunner-up.JPG)


### III. Docker in action 
All setting are done in one *.env* file.

```
# image name 
NGINX_IMAGE_NAME=nginx
# image version 
NGINX_IMAGE_VERSION=1.24.0-servercore-20H2
# config direcgory
NGINX_CONF_DIR=C:\Docker\yrunner-on-node\nginx.conf

# image name
IMAGE_NAME=albert0i/yrunner-on-node
# image version
IMAGE_VERSION=1.0

# data directory
DATA_DIR=C:\Docker\yrunner-on-node\src\data
# logs direcgory
LOG_DIR=C:\Docker\yrunner-on-node\src\logs
```

![alt yrunner-logs-2](img/yrunner-logs-2.JPG)


### IV. Summary 
NodeJS is best known for it's ease to host because of small, fast and swift. Whereas the code size here, which includes libraries and packages, is around 226KB, but the output image is 6.11GB! 

"**What's the point ?!**" you may ask. 

Well, whether it's worthwhile or worthless to dockerize in this way is completely up to you... at your disposal... at your own risk... I don't know.

PS:
As a finisning touch, I deliberately add a funny home page to server.js. Upon visiting: 
```
http://localhost:8989/
```
Refresh a few times by pressing F5:

![alt hostnames](img/hostnames.JPG)

Which match exactly to the container id. Which proves that load balancing is working fine. 

![alt containernames](img/containernames.JPG)


### V. Reference
1. [Oracle Instant Client Downloads for Microsoft Windows (x64) 64-bit](https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html)
2. [Microsoft Visual C++ Redistributable latest supported downloads](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170)
3. [How to install Visual C++ 2015 Redistributable to this image?](https://github.com/microsoft/dotnet-framework-docker/issues/15)
4. [Running a Node / Angular Application in a container based on Windows Nano Server](https://kevinsaye.wordpress.com/2019/08/06/running-a-node-angular-application-in-a-container-based-on-windows-nano-server/)
5. [Dockerfiles for node-oracledb are Easy and Simple](https://blogs.oracle.com/opal/post/dockerfiles-for-node-oracledb-are-easy-and-simple)
6. [The Angel of the Odd](https://poemuseum.org/the-angel-of-the-odd/)


### Epilogue 
<div style="text-align: left;">
“The avenues to death are numerous and strange. A London paper mentions the decease of a person from a singular cause. He was playing at ‘puff the dart,’ which is played with a long needle inserted in some worsted, and blown at a target through a tin tube. He placed the needle at the wrong end of the tube, and drawing his breath strongly to puff the dart forward with force, drew the needle into his throat. It entered the lungs, and in a few days killed him.”
<br /><br />
The Angel of the Odd<br />
Edgar Allan Poe
</div>


### EOF (2023/06/01)
