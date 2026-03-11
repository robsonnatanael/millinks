## ==========================================
## APP STAGES
## ==========================================

# [Stage 1/3] building app
FROM node:24.13.0-alpine3.23 AS app-builder

# default environments var
ENV NODE_OPTIONS='--max_old_space_size=2048'

ARG API_CLIENT_ID
ARG API_CLIENT_SECRET
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_API_AUTH_URL

ENV API_CLIENT_ID=$API_CLIENT_ID
ENV API_CLIENT_SECRET=$API_CLIENT_SECRET
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_AUTH_URL=$NEXT_PUBLIC_API_AUTH_URL

# basic config
WORKDIR /home/node

# mount environment dist
COPY package.json yarn.lock ./

# install dependencies
RUN yarn --frozen-lockfile
COPY . /home/node/

# build
RUN yarn build

# [Stage 2/3] bundler/dist
FROM node:24.13.0-alpine3.23 AS app-bundle

# basic config
WORKDIR /home/node

# create dist
COPY --from=app-builder /home/node/.next /home/node/.next
COPY --from=app-builder /home/node/node_modules /home/node/node_modules
COPY --from=app-builder /home/node/public /home/node/public
COPY --from=app-builder /home/node/LICENSE /home/node/LICENSE
COPY --from=app-builder /home/node/README.md /home/node/README.md
COPY --from=app-builder /home/node/package.json /home/node/package.json

# [Stage 3/3] starting webserver
FROM node:24.13.0-alpine3.23 AS app

# labels
LABEL maintainer="millinks"
LABEL context="landing-page"
LABEL project="millinks-webapp"
LABEL "website.name"="MilLinks"
LABEL "website.url"="https://millinks.com.br"

# default environments var
ARG TIME_ZONE=UTC
ARG API_CLIENT_ID
ARG API_CLIENT_SECRET
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_API_AUTH_URL

ENV TZ=$TIME_ZONE
ENV API_CLIENT_ID=$API_CLIENT_ID
ENV API_CLIENT_SECRET=$API_CLIENT_SECRET
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_AUTH_URL=$NEXT_PUBLIC_API_AUTH_URL

# basic config
RUN apk add --no-cache tzdata
WORKDIR /home/node

# mount app
COPY --from=app-bundle /home/node /home/node/
RUN chown -R node:node /home/node/.next/
USER node

EXPOSE 3000

CMD ["yarn", "start"]

## ==========================================
## DOCS STAGES
## ==========================================

# [Stage 1/2] building documentation
FROM node:24.13.0-alpine3.23 AS docs-builder

# default environments var
ENV NODE_OPTIONS='--max_old_space_size=2048'

# basic config
WORKDIR /home/node

# copy root files referenced by docs (@site/../CHANGELOG.md, @site/../package.json)
COPY CHANGELOG.md package.json ./

# mount documentation project
WORKDIR /home/node/documentation
COPY documentation/package.json documentation/yarn.lock ./

# install dependencies
RUN yarn --frozen-lockfile

# copy documentation source
COPY documentation/ .

# build static site
RUN yarn build

# [Stage 2/2] serving documentation
FROM nginx:1.27-alpine AS docs

# labels
LABEL maintainer="millinks"
LABEL context="documentation"
LABEL project="millinks-docs"
LABEL "website.name"="MilLinks Doc"
LABEL "website.url"="https://doc.millinks.com.br"

# copy built site to nginx
COPY --from=docs-builder /home/node/documentation/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
