FROM node:latest as base

WORKDIR /ndse-nestjs

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY ./src/ ./src/
COPY ./tsconfig.json ./
COPY ./tsconfig.build.json ./
COPY ./nodemon.json ./

EXPOSE 80

# Production stage

FROM base as production

ENV NODE_PATH=./build

RUN npm run build