FROM node:16.13.0
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
COPY tsconfig.json ./
RUN npm ci --silent
COPY . .
RUN npm run build
CMD [ "npm", "start" ]
EXPOSE 3000
EXPOSE 6006