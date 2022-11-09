FROM node:16-bullseye as builder
WORKDIR /builder
COPY ./package.json ./package-lock.json ./
RUN npm install --omit=dev


FROM node:16-bullseye-slim as runner
WORKDIR /app
COPY --from=builder  /builder/node_modules ./node_modules
COPY . ./
EXPOSE 8080
CMD [ "npm" , "start"]