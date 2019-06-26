FROM node:10.15-slim
#making a seperate folder for container and this will be inside container only
RUN mkdir -p /mydir/app   
#defining working directory
WORKDIR /mydir/app
#copying package.json first to install all dependencies
COPY package.json ./mydir/app
RUN npm install
#copying the code inside folder which is inside container
COPY . /mydir/app
# Build and optimize react app
RUN npm build

EXPOSE 3000
#defining entrypoint using cmd so that container does not stop immediately
#and make it executable
#ENTRYPOINT [ "node" ]
#CMD [ "app.js" ]
CMD [ "npm","start" ]
