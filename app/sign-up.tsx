import * as React from 'react';
import { Text, TextInput, Button, View, Alert } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState('');

  // 1. Adım: Kayıt Başlatma
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // E-posta doğrulama kodunu gönder
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // Doğrulama ekranını aç
      setPendingVerification(true);
    } catch (err: any) {
      Alert.alert('Hata', err.errors[0].message);
    }
  };

  // 2. Adım: Kodu Doğrulama
  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        // Oturumu aktif et
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace('/'); // Ana sayfaya yönlendir
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      Alert.alert('Hata', 'Kod yanlış veya süresi dolmuş.');
    }
  };

  return (
    <View style={{ padding: 20, justifyContent: 'center', flex: 1 }}>
      {!pendingVerification ? (
        <>
          <Text style={{ fontSize: 20, marginBottom: 20 }}>Kayıt Ol</Text>
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
          <Button title="Kayıt Ol" onPress={onSignUpPress} />
          
          {/* Giriş sayfasına geçiş butonu */}
          <View style={{ marginTop: 20 }}>
            <Button title="Zaten hesabın var mı? Giriş Yap" onPress={() => router.push('/sign-in')} color="gray" />
          </View>
        </>
      ) : (
        <>
          <Text style={{ fontSize: 20, marginBottom: 20 }}>Doğrulama Kodu</Text>
          <Text style={{ marginBottom: 10 }}>{emailAddress} adresine gelen kodu giriniz.</Text>
          <TextInput
            value={code}
            placeholder="Kod..."
            onChangeText={(code) => setCode(code)}
            style={{ borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 }}
          />
          <Button title="Doğrula" onPress={onPressVerify} />
        </>
      )}
    </View>
  );
}