# Clerk Auth Uygulaması
Expo (React Native) ve Clerk ile oluşturulmuş kimlik doğrulama örneği.
Authentication example built with Expo (React Native) and Clerk.


### Özellikler
- E-posta ile Kayıt/Giriş
- E-posta kodu doğrulaması
- Expo SecureStore kullanarak güvenli oturum kalıcılığı
- Expo Router tabanlı navigasyon
  

### Features
- Email + password sign up
- Email code verification
- Secure session persistence using Expo SecureStore
- Expo Router based navigation
  

## Mobil Frontend (Görüntü ve Mantık)
Expo: Projenin ana çatısı ve geliştirme araçları.

React Native: Mobil arayüz bileşenleri (View, Text, TextInput).

Expo Router: Dosya tabanlı yönlendirme sistemi (Klasör yapısıyla sayfa yönetimi).

Clerk Auth: Kullanıcı yönetimi ve güvenlik altyapısı.

Expo SecureStore: Cihaz üzerinde şifreli veri saklama.


## Backend ve Servisler (Arka Plan)

Clerk : "Authentication Backend"in Clerk. Kullanıcı doğrulama için Clerk bunu bulutta halleder.

Node.js: Expo'nun çalışması için bilgisayarında yüklü olması gereken runtime (çalışma ortamı)


- ## Kurulum
1. `npm install`      : Bağımlılıkları Yükle 
2. `.env` dosyasını oluştur ve Clerk anahtarlarını ekle.
3. `npx expo start`   : Çalıştır



