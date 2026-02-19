FROM node:22-alpine AS builder

WORKDIR /app

# Install backend dependencies
COPY package*.json ./
RUN npm install

# Install client dependencies and build
COPY client/package*.json ./client/
RUN npm install --prefix client

COPY . .
RUN npm run build --prefix client

FROM node:22-alpine AS runner

WORKDIR /app

# Install only production backend dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy backend source and built client
COPY server.js ./server.js
COPY routes ./routes
COPY models ./models
COPY middleware ./middleware
COPY seed.js ./seed.js
COPY uploads ./uploads
COPY --from=builder /app/client/dist ./client/dist

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000

CMD ["node", "server.js"]
