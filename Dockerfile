FROM node

MAINTAINER Immanuel Haag, http://haagim.net

RUN apt-get update -y
RUN apt-get install -y git
RUN apt-get install -y vim
# Clone our private GitHub Repository
RUN git clone https://6c0117f131a928ac638b83202170801a286212ec:x-oauth-basic@github.com/immae1/radcup /home/app

WORKDIR /home/app/src
# Install Dependencies -> From repo package.json
RUN npm install



CMD ["node", "index.js"]
#CMD echo "alias ll='ls -altr" > .bashrc
# Port 3000 for server
EXPOSE 3009
