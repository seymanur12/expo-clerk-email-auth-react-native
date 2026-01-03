import { registerRootComponent } from 'expo';

import App from './App';

// Bu satır, Expo'nun uygulamanın başlangıç noktasını (App bileşeni)
// tanımasını sağlar. Native (Android/iOS) veya Web fark etmeksizin 
// uygulamanın buradan başlamasını garanti eder.
registerRootComponent(App);
