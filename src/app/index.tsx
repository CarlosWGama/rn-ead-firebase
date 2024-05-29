import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Link, router } from "expo-router";

export default function listar() {

  const [ email, setEmail ] = useState('')
  const [ senha, setSenha ] = useState('')
  // ------------------------------------
  const handleLogin = async () => {
    if (email == 'teste@teste.com' && senha == '123456') {
      router.replace('/listar')
    } else {
      Alert.alert('Login ou senha incorreta!');
    }
  }
  // ------------------------------------
  return (<View style={styles.container}>
          <Text style={styles.header}>Login</Text>
          <TextInput onChangeText={setEmail} style={[styles.input, styles.borderBottom]} placeholder="EMAIL:"/>
          <TextInput onChangeText={setSenha}  style={styles.input} secureTextEntry placeholder="SENHA:"/>
          <Button title="Logar" onPress={handleLogin}/>    

          <Link href="/cadastro" style={styles.cadastro}>
            Caso não possua conta? {"\n"} Então clique aqui para se cadastrar
          </Link>

    </View>)
}
//============================
const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'stretch',
      padding: 20
  },
  header: {
      fontSize: 20,
      textAlign: 'center'
  },
  input: {
      backgroundColor: 'white',
      padding: 5
  },
  borderBottom: {
      borderBottomColor: 'black',
      borderBottomWidth: 2
  },
  cadastro: {
      marginTop: 30,
      fontSize: 15,
      textAlign: 'center',

  }
});
