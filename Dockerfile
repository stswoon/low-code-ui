FROM node:22.11.0
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY src ./src
COPY public ./public
COPY db ./db
COPY index.html tsconfig.app.json tsconfig.json tsconfig.node.json vite.config.ts eslint.config.js ./
RUN npm run prod

EXPOSE 3000
EXPOSE 4173

CMD npm run start

# docker build . -t low-code-ui
# docker run --rm --name low-code-ui-container -p 8220:4173 -p 8221:3000 low-code-ui