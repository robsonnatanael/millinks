# Building app
FROM node:22.20.0-trixie-slim AS builder
# default environments var
ENV NODE_OPTIONS='--max_old_space_size=2048'
# baisc config
USER node
WORKDIR /home/node
# mount environment dist
COPY package.json yarn.lock ./
# install dependencies
RUN yarn --frozen-lockfile
COPY . /home/node/
# build
RUN yarn build

# Bundler/Dist
FROM node:22.20.0-trixie-slim AS app-bundle
# basic config
USER node
WORKDIR /home/node
# create dist
COPY --from=builder /home/node/.next /home/node/.next
COPY --from=builder /home/node/node_modules /home/node/node_modules
COPY --from=builder /home/node/public /home/node/public
COPY --from=builder /home/node/LICENSE /home/node/LICENSE
COPY --from=builder /home/node/README.md /home/node/README.md
COPY --from=builder /home/node/package.json /home/node/package.json

# Starting webserver
FROM node:22.20.0-trixie-slim
# labels
LABEL maintainer="robsonnatanael"
LABEL context="landing-page"
LABEL project="millinks"
LABEL "website.name"="Millinks"
LABEL "website.url"="https://millinks.robsonnatanael.com.br"
# default environments var
ENV TZ="America/Fortaleza"
# basic config
USER node
WORKDIR /home/node
# mount app
COPY --from=app-bundle /home/node /home/node/
CMD ["yarn", "start"]
