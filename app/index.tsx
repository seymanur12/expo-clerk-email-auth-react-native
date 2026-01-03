import { SignedIn, SignedOut, useUser, useAuth } from '@clerk/clerk-expo';
import { Text, View, Button } from 'react-native';
import { Redirect } from 'expo-router';

export default function Page() {
  const { user } = useUser();
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <SignedIn>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>
          Hoşgeldin, {user?.primaryEmailAddress?.emailAddress}
        </Text>
        <Button title="Çıkış Yap" onPress={() => signOut()} />
      </SignedIn>

      <SignedOut>
        {/* Giriş yapmamışsa direkt giriş sayfasına at */}
        <Redirect href="/sign-in" />
      </SignedOut>
    </View>
  );
}