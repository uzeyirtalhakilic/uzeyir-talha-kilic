# Base image olarak Node.js kullanıyoruz
FROM node:18-alpine

# Çalışma dizinini belirliyoruz
WORKDIR /app

# package.json ve package-lock.json dosyalarını kopyalıyoruz
COPY package*.json ./

# Bağımlılıkları yüklüyoruz
RUN npm install

# Proje dosyalarını kopyalıyoruz
COPY . .

# Production build alıyoruz
RUN npm run build

EXPOSE 3000

# Uygulamayı çalıştırıyoruz
CMD ["npm", "start"] 