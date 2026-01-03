import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { Slot } from 'expo-router';
import { tokenCache } from '../utils/tokenCache';
import { SafeAreaView } from 'react-native-safe-area-context';

// .env dosyasından anahtarı çekiyoruz
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env file',
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
          <Slot />
        </SafeAreaView>
      </ClerkLoaded>
    </ClerkProvider>
  );
}