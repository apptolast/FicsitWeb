# syntax=docker/dockerfile:1.7

# ─── Stage 1: build ─────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@10.23.0 --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

ARG VITE_EMAILJS_SERVICE_ID
ARG VITE_EMAILJS_TEMPLATE_ID
ARG VITE_EMAILJS_PUBLIC_KEY

ENV VITE_EMAILJS_SERVICE_ID=$VITE_EMAILJS_SERVICE_ID \
    VITE_EMAILJS_TEMPLATE_ID=$VITE_EMAILJS_TEMPLATE_ID \
    VITE_EMAILJS_PUBLIC_KEY=$VITE_EMAILJS_PUBLIC_KEY

RUN pnpm build

# ─── Stage 2: serve ─────────────────────────────────────────
FROM nginx:1.27-alpine AS serve

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost/ >/dev/null || exit 1

CMD ["nginx", "-g", "daemon off;"]
