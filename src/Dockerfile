# Let's use the official Passenger container.
FROM    centos:centos7

#RUN     yum install -y npm
COPY . /src
#RUN cd /src; npm install
RUN yum install -y git 
RUN yum install -y vim
# Clone our private GitHub Repository
RUN git clone https://6c0117f131a928ac638b83202170801a286212ec:x-oauth-basic@github.com/immae1/straussi1 /src/app
EXPOSE 8080
CMD ["node", "/src/index.js"]
