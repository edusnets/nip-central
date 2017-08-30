FROM webdevops/base:alpine

# Instalar o projeto na pasta
ADD build.tar.gz /app/

# Tornar porta 80 disponivel
EXPOSE 80
