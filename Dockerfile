## ==========================================
## APP STAGES
## ==========================================

# [Stage 1/2] building app
FROM node:24.21.0-alpine3.24 AS app-builder

ARG NEXT_PUBLIC_API_AUTH_URL
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_BASE_PATH
ARG NEXT_PUBLIC_FARO_ENVIRONMENT_NAME
ARG NEXT_PUBLIC_FARO_APP_NAME
ARG NEXT_PUBLIC_FARO_COLLECTOR_URL
ARG NEXT_PUBLIC_GA_MEASUREMENT_ID

# default environments var
ENV NODE_OPTIONS='--max_old_space_size=2048'

# basic config
WORKDIR /app

# mount dependencies
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY . /app/

RUN yarn build

# [Stage 2/2] starting webserver
FROM node:24.21.0-alpine3.24 AS app

# default environments var
ENV TZ=America/Fortaleza
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN apk update && apk upgrade --no-cache

# labels
LABEL maintainer="millinks" context="landing-page" project="millinks-webapp" "website.name"="millinks" "website.url"="https://millinks.com.br"

# basic config
RUN apk add --no-cache tzdata \
    && cp /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone
WORKDIR /app

# Set correct permissions for nextjs user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone build and static files
# Next.js standalone output: https://nextjs.org/docs/pages/api-reference/next-config-js/output#standalone
COPY --from=app-builder /app/public ./public
COPY --from=app-builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=app-builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Configure entrypoint to load secrets
COPY --chown=nextjs:nodejs entrypoint.sh ./
RUN chmod +x ./entrypoint.sh

USER nextjs

EXPOSE 3000

ENTRYPOINT ["./entrypoint.sh"]
CMD ["node", "server.js"]

## ==========================================
## DOCS STAGES
## ==========================================

# [Stage 1/2] building documentation
FROM node:24.21.0-alpine3.24 AS docs-builder

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
FROM nginx:1.31.6-alpine3.24 AS docs

# default environments var
ENV TZ=America/Fortaleza

RUN apk update && apk upgrade --no-cache

# Set timezone
RUN apk add --no-cache tzdata \
    && cp /usr/share/zoneinfo/$TZ /etc/localtime \
    && echo $TZ > /etc/timezone

# Disable absolute redirects to prevent Nginx from changing HTTPS to HTTP in slash redirects
RUN sed -i 's/http {/http {\n    absolute_redirect off;/' /etc/nginx/nginx.conf

# labels
LABEL maintainer="millinks" context="documentation" project="millinks-docs" "website.name"="MilLinks Doc" "website.url"="https://doc.millinks.com.br"

# copy built site to nginx
COPY --from=docs-builder /app/documentation/build /usr/share/nginx/html/millinks-docs

# change default port to 8080
RUN sed -i 's/listen       80;/listen 8080;/g' /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
