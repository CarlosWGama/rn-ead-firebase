import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, Touchable, View } from "react-native";
import { Link, router } from "expo-router";
import { GestureHandlerRootView, ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export default function listar() {

    const [ usuarios, setUsuarios ] = useState<any[]>([]);
    // ------------------------------
    const handleBuscar = async () => {
        const consulta: any = [];
        //Busca usuários
        const snapshots = await getDocs(collection(db, 'usuarios'))
        //Insere no vetor
        snapshots.forEach(snap => {
            consulta.push(snap.data())
        })

        setUsuarios(consulta)
    }
    // -------------------
    const handleExcluir = async (usuario: {id: string, nome: string, email: string}) => {
        Alert.alert('Excluir usuário', `Você deseja realmente excluir usuário ${usuario.nome}?`, [
            {text: 'Cancelar'},
            {text: 'Confirmar', onPress: async () => {
                try {
                    await deleteDoc(doc(db, 'usuarios', usuario.id))
                } catch(e) {
                    console.log(e)
                }
                handleBuscar();
            }}
        ]);
    }
    // -----------------
    useEffect(() => {
        handleBuscar()
    }, [])
    // ------------------------------
    return (<GestureHandlerRootView style={styles.container}>
        <Text style={styles.h1}>Usuários cadastrados</Text>

        <ScrollView>
            {usuarios.map(usuario => (
                <View key={usuario.id} style={styles.item}>
                    <Text style={styles.nome}>{usuario.nome} ({usuario.email})</Text>

                    <View style={styles.btns}>
                        <Link href={{pathname: '/editar', params: {usuarioID: usuario.id}}} style={{marginHorizontal: 10}}>Editar</Link>

                        <TouchableOpacity onPress={() => handleExcluir(usuario)}>
                            <Text>Excluir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </ScrollView>

        <Button title="Sair" color="tomato" onPress={() => {
            auth.signOut();
            router.replace('/')
        }}/>
    </GestureHandlerRootView>)
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'stretch',
      padding: 20
  },
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20
  }, 
  item: {
    flexDirection: 'row',
  },
  nome: {
    flex: 1,
    fontWeight: 'bold'
  },
  btns: {
    flexDirection: 'row'
  }
  
});
