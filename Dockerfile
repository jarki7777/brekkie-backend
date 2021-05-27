FROM node:14.17.0-alpine3.10
WORKDIR /backend
COPY package.json /backend
RUN npm install
COPY . /backend
EXPOSE 5000:5000
CMD ["npm", "start"]