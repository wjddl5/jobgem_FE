FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./ ./

#nodemon 사용 
CMD ["npm", "run", "build"]

#FROM nginx
#EXPOSE 3000
#COPY ./default.conf /etc/nginx/conf.d/default.conf 
#COPY --from=builder /usr/src/app/.next  /usr/share/nginx/html
