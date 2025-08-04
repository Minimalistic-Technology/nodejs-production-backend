FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY package*.json ./
RUN npm install --production
ENV MONGO_URI=mongodb+srv://goldData:BdVndCvGRtxpW4Vl@cluster0.89h8tyk.mongodb.net/goldData?retryWrites=true&w=majority
ENV PORT=5000
COPY --from=builder app/build ./build
EXPOSE $PORT
CMD ["node", "build/server.js"]
