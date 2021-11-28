FROM node:12.16.3

ENV PORT=3000
ARG MODD_VERSION=0.8

WORKDIR /tmp

# Installing mmod
RUN wget -q "https://github.com/cortesi/modd/releases/download/v$MODD_VERSION/modd-$MODD_VERSION-linux64.tgz" \
  && tar -xzvf modd-$MODD_VERSION-linux64.tgz \
  && mv "modd-$MODD_VERSION-linux64/modd" /usr/bin

WORKDIR /home/node
COPY . .

RUN npm install

USER node
EXPOSE $PORT

CMD [ "/usr/bin/modd" ]
