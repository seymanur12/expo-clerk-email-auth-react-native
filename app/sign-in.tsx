import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { Text, TextInput, Button, View, Alert } from 'react-native';
import React from 'react';

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/');
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      Alert.alert('Hata', err.errors[0].message);
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View style={{ padding: 20, justifyContent: 'center', flex: 1 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Giriş Yap</Text>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email..."
        onChangeText={(email) => setEmailAddress(email)}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }}
      />
      <TextInput
        value={password}
        placeholder="Şifre..."
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        style={{ borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 }}
      />
      <Button title="Giriş Yap" onPress={onSignInPress} />
      
      <View style={{ marginTop: 20 }}>
        <Button title="Kayıt Ol" onPress={() => router.push('/sign-up')} color="gray" />
      </View>
    </View>
  );
}