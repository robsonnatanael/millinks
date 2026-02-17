# building app
FROM node:24.13.0-alpine3.23 AS builder

# default environments var
ENV NODE_OPTIONS='--max_old_space_size=2048'

ARG API_CLIENT_ID
ARG API_CLIENT_SECRET
ARG API_BASE_URL
ARG API_AUTH_URL
ARG NEXT_PUBLIC_API_BASE_URL

ENV API_CLIENT_ID=$API_CLIENT_ID
ENV API_CLIENT_SECRET=$API_CLIENT_SECRET
ENV API_BASE_URL=$API_BASE_URL
ENV API_AUTH_URL=$API_AUTH_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# baisc config
WORKDIR /home/node

# mount environment dist
COPY package.json yarn.lock ./

# install dependencies
RUN yarn --frozen-lockfile
COPY . /home/node/

# build
RUN yarn build

# bundler/dist
FROM node:24.13.0-alpine3.23 AS app-bundle

# basic config
WORKDIR /home/node

# create dist
COPY --from=builder /home/node/.next /home/node/.next
COPY --from=builder /home/node/node_modules /home/node/node_modules
COPY --from=builder /home/node/public /home/node/public
COPY --from=builder /home/node/LICENSE /home/node/LICENSE
COPY --from=builder /home/node/README.md /home/node/README.md
COPY --from=builder /home/node/package.json /home/node/package.json

# starting webserver
FROM node:24.13.0-alpine3.23

# labels
LABEL maintainer="robsonnatanael"
LABEL context="landing-page"
LABEL project="millinks"
LABEL "website.name"="Millinks"
LABEL "website.url"="https://millinks.robsonnatanael.com.br"

# default environments var
ARG TIME_ZONE=UTC
ARG API_CLIENT_ID
ARG API_CLIENT_SECRET
ARG API_BASE_URL
ARG API_AUTH_URL
ARG NEXT_PUBLIC_API_BASE_URL

ENV TZ=$TIME_ZONE
ENV API_CLIENT_ID=$API_CLIENT_ID
ENV API_CLIENT_SECRET=$API_CLIENT_SECRET
ENV API_BASE_URL=$API_BASE_URL
ENV API_AUTH_URL=$API_AUTH_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

# basic config
RUN apk add --no-cache tzdata
WORKDIR /home/node

# mount app
COPY --from=app-bundle /home/node /home/node/
# RUN mkdir -p /home/node/.next/cache/ && \
RUN chown -R node:node /home/node/.next/
USER node

EXPOSE 3000

CMD ["yarn", "start"]
