# ---- Base Node ----
FROM node:18-alpine AS base
# set working directory
WORKDIR /app
# copy project files
COPY package.json pnpm-*.yaml ./
#install pnpm
RUN npm install -g pnpm@

# ---- Build ----
FROM base AS builder
RUN pnpm install --frozen-lockfile --prefer-offline --no-optional
COPY . .
RUN pnpm build

# ---- Dependencies ----
FROM base AS dependencies
# install node packages
RUN pnpm install --prod

# ---- Release ----
FROM base AS release
WORKDIR /app

RUN apk --no-cache add curl

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}


COPY --from=builder /app/dist ./dist
COPY --from=dependencies /app/node_modules ./node_modules

# expose port and define CMD
EXPOSE 3000
CMD ["node", "dist"]
