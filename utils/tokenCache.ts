//Mantık: Kullanıcı uygulamayı kapattığında oturumun kapanmaması gerekir. 
// Clerk, kullanıcının oturum anahtarını (token) güvenli bir yerde saklamalıdır. 
// React Native'de localStorage yoktur, bu yüzden şifreli depolama sağlayan
//                 SecureStore kullanılır.


import * as SecureStore from 'expo-secure-store'; // Güvenli depolama kütüphanesi
import { Platform } from 'react-native';

export const tokenCache = { // Token okuma fonksiyonu

  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key); // Anahtarı kullanarak veriyi çek

      if (item) {
        // ... loglama işlemleri ...
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log('No values stored under key: ' + key);
      }//...........................

      return item;
    } catch (error) {
      // Hata olursa (örn: anahtar bozuksa) sil ve null dön
      console.error('SecureStore get item error: ', error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },

  // Token kaydetme fonksiyonu
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value); // Anahtar ve token'ı şifreli kaydet
    } catch (err) {
      return;
    }
  },
};