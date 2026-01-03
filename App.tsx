import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { ClerkProvider, SignedIn, SignedOut, useSignUp, useSignIn } from "@clerk/clerk-expo";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

function AuthScreen() {
  const { isLoaded: signUpLoaded, signUp, setActive: setSignUpActive } = useSignUp();
  const { isLoaded: signInLoaded, signIn, setActive: setSignInActive } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  // Kayıt Olma Fonksiyonu
  const onSignUpPress = async () => {
    if (!signUpLoaded) return;
    try {
      await signUp.create({ emailAddress, password });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  // OTP Doğrulama Fonksiyonu
  const onVerifyPress = async () => {
    if (!signUpLoaded) return;
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });
      await setSignUpActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <Text>Maile gelen kodu girin:</Text>
        <TextInput value={code} style={styles.input} onChangeText={(code) => setCode(code)} />
        <Button title="Kodu Doğrula" onPress={onVerifyPress} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="E-posta..."
        style={styles.input}
        onChangeText={(email) => setEmailAddress(email)}
      />
      <TextInput
        value={password}
        placeholder="Şifre..."
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(pw) => setPassword(pw)}
      />
      <Button title="Kayıt Ol" onPress={onSignUpPress} />
    </View>
  );
}

export default function App() {
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <View style={styles.container}>
        <SignedIn>
          <Text>Hoş geldiniz! Giriş yapıldı.</Text>
        </SignedIn>
        <SignedOut>
          <AuthScreen />
        </SignedOut>
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, padding: 10 },
});