FROM debian:wheezy

# Instalar dependencias
RUN apt-get update && apt-get upgrade -y && apt-get install -y lighttpd php5-cgi php5-mysql

# Instalar o projeto
ADD build.tar.gz /

EXPOSE 4445

ENTRYPOINT ["lighttpd","-D","-f","/etc/lighttpd/lighttpd.conf"]
