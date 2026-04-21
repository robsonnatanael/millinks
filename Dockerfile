## ==========================================
## APP STAGES
## ==========================================

ARG NODE_IMAGE=node:24.15.0-alpine3.22

# [Stage 1/3] building app
FROM ${NODE_IMAGE} AS app-builder

# default environments var
ENV NODE_OPTIONS='--max_old_space_size=2048'

# basic config
WORKDIR /app

# mount dependencies
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY . /app/

# build using secrets (Staging or Production)
RUN --mount=type=secret,id=millinks_stg_webapp_env \
    --mount=type=secret,id=millinks_webapp_env \
    if [ -f /run/secrets/millinks_stg_webapp_env ]; then \
        export $(grep -v '^#' /run/secrets/millinks_stg_webapp_env | xargs); \
    elif [ -f /run/secrets/millinks_webapp_env ]; then \
        export $(grep -v '^#' /run/secrets/millinks_webapp_env | xargs); \
    fi && \
    yarn build

# [Stage 2/3] bundler/dist
FROM ${NODE_IMAGE} AS app-bundle

# basic config
WORKDIR /app

# create dist
COPY --from=app-builder /app/.next /app/.next
COPY --from=app-builder /app/node_modules /app/node_modules
COPY --from=app-builder /app/public /app/public
COPY --from=app-builder /app/next.config.ts /app/next.config.ts
COPY --from=app-builder /app/package.json /app/package.json

# [Stage 3/3] starting webserver
FROM ${NODE_IMAGE} AS app

# labels
LABEL maintainer="millinks" context="landing-page" project="millinks-webapp" "website.name"="MilLinks" "website.url"="https://millinks.com.br"

# default environments var
ARG TIME_ZONE=America/Fortaleza
ENV TZ=$TIME_ZONE

# basic config
RUN apk add --no-cache tzdata
WORKDIR /app

# mount app
COPY --from=app-bundle /app /app/
RUN chown -R node:node /app/.next/
USER node

EXPOSE 3000

CMD ["yarn", "start"]

## ==========================================
## DOCS STAGES
## ==========================================

# [Stage 1/2] building documentation
FROM ${NODE_IMAGE} AS docs-builder

# default environments var
ENV NODE_OPTIONS='--max_old_space_size=2048'

# basic config
WORKDIR /app

# copy root files referenced by docs (@site/../CHANGELOG.md, @site/../package.json)
COPY CHANGELOG.md package.json ./

# mount documentation project
WORKDIR /app/documentation
COPY documentation/package.json documentation/yarn.lock ./

# install dependencies
RUN yarn --frozen-lockfile

# copy documentation source
COPY documentation/ .

# build static site
RUN yarn build

# [Stage 2/2] serving documentation
FROM nginx:1.30.0-alpine3.23 AS docs

# Disable absolute redirects to prevent Nginx from changing HTTPS to HTTP in slash redirects
RUN sed -i 's/http {/http {\n    absolute_redirect off;/' /etc/nginx/nginx.conf

# labels
LABEL maintainer="millinks" context="documentation" project="millinks-docs" "website.name"="MilLinks Doc" "website.url"="https://doc.millinks.com.br"

# copy built site to nginx
COPY --from=docs-builder /app/documentation/build /usr/share/nginx/html/millinks-docs

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
