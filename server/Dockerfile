FROM node:20-alpine
WORKDIR /srv
COPY package.json package-lock.json* ./
RUN npm ci --production --silent
COPY . .
ENV PORT=4242
EXPOSE 4242
CMD ["node", "index.js"]
