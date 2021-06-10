FROM node:14.17.0-alpine3.10
WORKDIR /brekkie-backend
COPY package.json /brekkie-backend
RUN npm install
RUN mongoimport --uri mongodb://mongodb:27017/brekkie --collection users --type json --file /seeds/users.json
RUN mongoimport --uri mongodb://mongodb:27017/brekkie --collection shopping_lists --type json --file /seeds/shopping_lists.json
RUN mongoimport --uri mongodb://mongodb:27017/brekkie --collection recipes --type json --file /seeds/recipes.json
RUN mongoimport --uri mongodb://mongodb:27017/brekkie --collection inventories --type json --file /seeds/inventories.json
RUN mongoimport --uri mongodb://mongodb:27017/brekkie --collection food_logs --type json --file /seeds/food_logs.json
RUN mongoimport --uri mongodb://mongodb:27017/brekkie --collection favorites --type json --file /seeds/favorites.json
COPY . /brekkie-backend
EXPOSE 5000:5000
CMD ["npm", "start"]

# mongodb://localhost:27017/kitchen-leader