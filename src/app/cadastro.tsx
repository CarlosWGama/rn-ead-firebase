import { router } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native";
import { auth, db } from "../config/firebase";

export default function Cadastro() {

  const [ nome, setNome ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ senha, setSenha ] = useState('');
  // ---------------------------------------
  const handleCadastrar = async () => {
    try {
      //Cadastra conta do usuário na autenticação
      const retorno = await createUserWithEmailAndPassword(auth, email, senha);
      
      //Insere no banco de dados
      const usuarioDOC = doc(db, 'usuarios', retorno.user.uid)
      setDoc(usuarioDOC, { nome, email, id: retorno.user.uid });

      ToastAndroid.show('Cadastrado com sucesso', ToastAndroid.LONG);
      router.back();
    } catch (e) {
      Alert.alert('Erro no cadastro')
    }
  }
  // ---------------------------------------
  return (
    <View style={styles.container}>
            <Text style={{fontSize: 20, textAlign: 'center'}}>Crie sua conta</Text>
            <View style={{marginTop: 20}}>
                {/* NOME */}
                <Text>Nome: </Text>
                <TextInput onChangeText={setNome} style={styles.input}/>

                {/* EMAIL */}
                <Text>Email: </Text>
                <TextInput onChangeText={setEmail} keyboardType="email-address" style={styles.input}/>

                {/* Senha */}
                <Text>Senha: </Text>
                <TextInput onChangeText={setSenha} secureTextEntry style={styles.input}/>

                {/* CADASTRAR */}
                <Button title="Cadastrar" onPress={handleCadastrar} />
                <Button title="Voltar" color="green" onPress={() => router.back()} />
            </View>
        </View>
  );
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
      backgroundColor: 'lightgrey',
      padding: 5,
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
