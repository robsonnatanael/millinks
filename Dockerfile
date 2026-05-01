## ==========================================
## APP STAGES
## ==========================================

ARG NODE_IMAGE=node:24.15.0-alpine3.22

# [Stage 1/2] building app
FROM ${NODE_IMAGE} AS app-builder

# default environments var
ENV NODE_OPTIONS='--max_old_space_size=2048'

# basic config
WORKDIR /app

# mount dependencies
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY . /app/

ARG BUILD_ENV=production

# build using secrets (Staging or Production)
RUN --mount=type=secret,id=millinks_stg_webapp_env,required=false \
    --mount=type=secret,id=millinks_webapp_env,required=false \
    if [ "$BUILD_ENV" = "staging" ]; then \
        export $(grep -v '^#' /run/secrets/millinks_stg_webapp_env | xargs) && yarn build; \
    else \
        export $(grep -v '^#' /run/secrets/millinks_webapp_env | xargs) && yarn build; \
    fi

# [Stage 2/2] starting webserver
FROM ${NODE_IMAGE} AS app

# labels
LABEL maintainer="millinks" context="landing-page" project="millinks-webapp" "website.name"="MilLinks" "website.url"="https://millinks.com.br"

# default environments var
ARG TIME_ZONE=America/Fortaleza
ENV TZ=$TIME_ZONE
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# basic config
RUN apk add --no-cache tzdata
WORKDIR /app

# Set correct permissions for nextjs user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone build and static files
# Next.js standalone output: https://nextjs.org/docs/pages/api-reference/next-config-js/output#standalone
COPY --from=app-builder /app/public ./public
COPY --from=app-builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=app-builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]

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
FROM nginx:1.30.0-alpine3.23-slim AS docs

# Disable absolute redirects to prevent Nginx from changing HTTPS to HTTP in slash redirects
RUN sed -i 's/http {/http {\n    absolute_redirect off;/' /etc/nginx/nginx.conf

# labels
LABEL maintainer="millinks" context="documentation" project="millinks-docs" "website.name"="MilLinks Doc" "website.url"="https://doc.millinks.com.br"

# copy built site to nginx
COPY --from=docs-builder /app/documentation/build /usr/share/nginx/html/millinks-docs

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
