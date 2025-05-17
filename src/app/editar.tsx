import { router, useLocalSearchParams } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native";
import { db } from "../config/firebase";

export default function Editar() {
  const [ nome, setNome ] = useState('');
  const { usuarioID } = useLocalSearchParams();
  // ---------------------------------------
  const handleEditar = async () => {
    if (nome != '' ) {
      await updateDoc(doc(db, 'usuarios', usuarioID), { nome }) 


      ToastAndroid.show('Editado com sucesso', ToastAndroid.LONG);
      router.back();
    } else {
      Alert.alert('Erro no cadastro')
    }
  }
  // --------------
  const handleBuscar = async () => {
    console.log('ID', usuarioID);
    if (usuarioID) {
      const snapshot = await getDoc(doc(db, 'usuarios', usuarioID));
      if (snapshot.exists()) {
        const dados = snapshot.data();
        setNome(dados?.nome);
      }
    }
  }
  // ------------
  useEffect(() => {
    handleBuscar();
  }, [])
  // ---------------------------------------
  return (
    <View style={styles.container}>
            <Text style={{fontSize: 20, textAlign: 'center'}}>Crie sua conta</Text>
            <View style={{marginTop: 20}}>
                {/* NOME */}
                <Text>Nome: </Text>
                <TextInput onChangeText={setNome} value={nome} style={styles.input}/>

                {/* CADASTRAR */}
                <Button title="Editar" onPress={handleEditar} />
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
