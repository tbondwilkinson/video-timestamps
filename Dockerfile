# Use the base App Engine Docker image, based on Ubuntu 16.0.4.
FROM gcr.io/google-appengine/nodejs

RUN apt-get update -y && \
    apt-get install --no-install-recommends -y -q \
      ffmpeg && \
      apt-get clean 

COPY . /app/

RUN npm install --unsafe-perm

# Set common env vars
ENV NODE_ENV production
ENV PORT 8080

# start
CMD ["npm", "start"]