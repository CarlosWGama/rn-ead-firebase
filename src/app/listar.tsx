import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, Touchable, View } from "react-native";
import { Link, router } from "expo-router";
import { GestureHandlerRootView, ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export default function listar() {

    const [ usuarios, setUsuarios ] = useState<any[]>([]);
    // ------------------------------
    const handleBuscar = async () => {
        setUsuarios([
            {nome: 'Teste', email: 'teste@teste.com', id: '123'},
            {nome: 'Carlos', email: 'carlos@teste.com', id: '456'},
        ])
    }
    // -------------------
    const handleExcluir = async (usuario: {id: string, nome: string, email: string}) => {
        Alert.alert('Excluir usuário', `Você deseja realmente excluir usuário ${usuario.nome}?`, [
            {text: 'Cancelar'},
            {text: 'Confirmar', onPress: () => {

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

        <Button title="Sair" color="tomato" onPress={() => router.replace('/')}/>
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
