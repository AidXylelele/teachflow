FROM node:22.13-alpine AS deps
WORKDIR /app
COPY package*.json .npmrc ./
RUN npm ci

FROM node:22.13-alpine AS prod-deps
WORKDIR /app
COPY package*.json .npmrc ./
RUN NODE_ENV=production npm ci --omit=dev --ignore-scripts

FROM node:22.13 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN rm -f .npmrc
RUN npm run build

FROM node:22.13
ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=prod-deps /app/node_modules ./node_modules
CMD ["dist/src/main.js"]