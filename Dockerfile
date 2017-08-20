FROM pieterscheffers/docker-spectron

WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install
RUN npm install 7zip-bin-linux
RUN npm run build
RUN npm run release-local
RUN npm run pree2e

ENV NAME=test
ENV DEBUG=false
ENV PROTONMAIL_LOGIN_URL=https://mail.protonmail.com/login

CMD ["npm", "run", "e2e"]
