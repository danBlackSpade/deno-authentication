
# FROM alpine:3.12
# # LABEL maintainer=Daniel Yab <djun44@gmail.com>

# CMD ["/bin/sh"]
# ENV LANG=C.UTF-8
# ARG DENO_VERSION
# ENV DENO_VERSION=1.4.0

# # CMD ["/bin/sh -c apk add --virtual .download --no-cache curl  && curl -fsSL https://github.com/denoland/deno/releases/download/v${DENO_VERSION}/deno-x86_64-unknown-linux-gnu.zip  --output deno.zip  && unzip deno.zip  && rm deno.zip  && chmod 755 deno  && mv deno /bin/deno  && apk del .download"]

# RUN apk update && apk add unzip curl
# # RUN apk update  && apk install unzip curl

# RUN curl -fsSL https://deno.land/x/install/install.sh | sh -s v${DENO_VERSION}

# # COPY $HOME/.deno/bin /bin/  

# # ENV PATH="/$HOME/.deno:${PATH}"
# ENV PATH="${PATH}:/$HOME/.deno/bin"

# ENV DENO_DIR=/app/
# RUN export DENO_INSTALL="/$HOME/.deno"
# RUN export PATH="$DENO_INSTALL/bin:$PATH"
# # RUN source ~/.bashrc
# # CMD ["/bin/sh -c addgroup -g 1993 -S deno  && adduser -u 1993 -S deno -G deno  && mkdir ${DENO_DIR}  && chown deno:deno ${DENO_DIR}"]

# WORKDIR /app/
# # ENTRYPOINT ["deno"]

# # CMD ["run" "https://deno.land/std/examples/welcome.ts"]




FROM ubuntu:20.04

WORKDIR /install

ENV DENO_VERSION=1.3.3

RUN apt-get update && apt-get install curl unzip -y

RUN curl -fsSL https://deno.land/x/install/install.sh | sh -s v${DENO_VERSION}


ENV DENO_INSTALL="/root/.deno"
ENV PATH="$DENO_INSTALL/bin:$PATH"

WORKDIR /app

RUN deno install --allow-read --allow-run --allow-write --allow-net -f -q --unstable https://deno.land/x/denon@2.4.0/denon.ts

ENTRYPOINT ["deno"]

# CMD ["run" "https://deno.land/std/examples/welcome.ts"]