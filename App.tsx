import React, {useState, useEffect} from 'react';
import { StyleSheet, Switch, Text, View, TextInput, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {

  const[darkTema, setDarkTema] = useState(false);

  useEffect(() => {
    carregarTema();
  }, []);
  
  const carregarTema = async () => {
    try{
      const stored = await AsyncStorage.getItem('@tema');
      if (stored !== null){
      setDarkTema(JSON.parse(stored));
      }
    } catch (error){
        console.log("ERRO", error);
    }
  };

  const salvarTema = async (isDark: boolean) => {
    try {
      await AsyncStorage.setItem('@theme', JSON.stringify(isDark));
    } catch (error) {
        console.log('Erro ao salvar tema:', error);
    }
  };

  const trocarTema = () => {
    setDarkTema(!darkTema);
    salvarTema(!darkTema);
  };


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      marginTop: 40,
      backgroundColor: darkTema ? '#121212' : '#f2f2f2'
    },
    titulo: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: darkTema ? '#fff' : '#000'
    },
    temaContainer: {
      flexDirection:'row',
      alignItems: 'center',
      marginBottom: 15
    },
    temaText: {
      fontSize: 16,
      marginRight: 10,
      color: darkTema ? '#fff' : '#000'
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.temaContainer}>
        <Text style={styles.temaText}>{darkTema ? "Modo Escuro" : "Modo Claro"}</Text>
        <Switch value={darkTema} onValueChange={trocarTema} />
        </View>

        <Text style={styles.titulo} >Minhas Notas</Text>
    </View>
  );
}


