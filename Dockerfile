FROM node:carbon as builder
RUN mkdir /app
WORKDIR /app
COPY . .

RUN yarn install --quiet
RUN export REACT_APP_OAUTH_URL="__REACT_APP_OAUTH_URL_PLACEHOLDER__"; yarn build

FROM nginx:1.13.9
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/run.sh /root/run.sh

EXPOSE 80
CMD /bin/sh /root/run.sh
