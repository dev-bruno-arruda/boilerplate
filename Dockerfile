# Use a imagem base do Node.js
FROM node:20-alpine

# Defina o diretório de trabalho no container
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json (se existir)
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Instale nodemon para reiniciar automaticamente o servidor ao detectar mudanças no código
RUN npm install -g nodemon

# Copie todo o código da aplicação para o diretório de trabalho
COPY . .

# Comando para construir a aplicação (ajustado para Windows)
#RUN npm run build && move .build/src dist && rd /s /q src
# Comando para mac e linux
#RUN npm run build && mv .build/src dist && rm -rf src

# Exponha a porta que a aplicação vai rodar (opcional)
EXPOSE 3000

# Comando para iniciar a aplicação usando nodemon
CMD ["nodemon", "dist/main.js"]
