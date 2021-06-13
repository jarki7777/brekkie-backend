FROM node:14.17.0-alpine3.10
WORKDIR /brekkie-backend
COPY package.json /brekkie-backend
RUN npm install
COPY . /brekkie-backend
EXPOSE 5000:5000
CMD ["npm", "start"]