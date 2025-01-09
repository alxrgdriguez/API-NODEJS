FROM node:22.12.0-alpine AS back-dev-deps
WORKDIR /app
COPY backend/package.json .
RUN npm install

FROM node:22.12.0-alpine AS back-dev
WORKDIR /app
COPY --from=back-dev-deps /app/node_modules ./node_modules
CMD ["npm", "run dev"]
