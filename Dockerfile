FROM ubuntu:latest
LABEL authors="aomatibe"

ENTRYPOINT ["top", "-b"]
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY pnpm-lock.yaml package.json ./

RUN pnpm install --frozen-lockfile

COPY prisma ./prisma

RUN pnpm prisma generate

COPY . .

RUN pnpm run build

FROM node:20-alpine

WORKDIR /usr/src/app

RUN npm install -g pnpm

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/pnpm-lock.yaml ./pnpm-lock.yaml

CMD ["sh", "-c", "pnpm prisma migrate deploy && pnpm run start"]

EXPOSE 6000