FROM node:16-alpine
# prepare workdir
WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn install
# copy config files
COPY . .
ENV NODE_ENV=production
# build app
RUN yarn build
# run app
CMD ["yarn", "start"]