import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Linking, Button, SafeAreaView, ImageBackground } from 'react-native';

export default function App() {

  const dietURL = "https://www.mavikadin.com/10-kilo-vermek-istiyorum-ayda-on-kilo-verdiren-diyet-listesi";
  const nutriURL = "https://www.nefisyemektarifleri.com/blog/kilo-alma-programi-saglikli-kilo-aldiran-4-diyet-listesi/";
  
  const [result, setResult] = useState(0)
  const [resultText, setResultText] = useState('')
  const [massa, setMassa] = useState(0)
  const [altura, setAltura] = useState(0)


  const OpenURLButton = ({ url, children }) => { 
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);
      await Linking.openURL(url);
    }, [url]);
    
    return <Button title={children} style={styles.butshad} color={'lightgreen'} onPress={handlePress} />;
  };

  function calcular() {
    const hegt = altura / 100
    const result = massa / (Math.pow(hegt, 2))
    setResult(result)

    if (result < 17) {
      setResultText('Very Under Weight')
    } else if (result < 18.5) {
      setResultText('Under Weight')
    } else if (result < 25) {
      setResultText('Normal')
    } else if (result < 30) {
      setResultText('Excess Weight')
    } else if (result < 35) {
      setResultText('Obesity')
    } else if (result < 40) {
      setResultText('Extremely Obesity')
    } else if (result >= 40) {
      setResultText('Very Extremely Obesity')
    } else {
      setResultText('')
      setResult(0)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.background}>
        <ImageBackground source={require('./bg.jpg')} resizeMode="cover" style={styles.banners} />
      </View>
      <View style={styles.inputs} >
        <TextInput
          placeholder="Kg"
          placeholderTextColor={'white'}
          selectionColor='white'
          keyboardType="numeric"
          returnKeyType="done"
          style={styles.input}
          onChangeText={(massa) => setMassa(massa)}
        />
        <TextInput
          placeholder="Cm"
          placeholderTextColor={'white'}
          selectionColor='white'
          keyboardType="numeric"
          returnKeyType="done"
          style={styles.input}
          onChangeText={(altura) => { setAltura(altura) }}
        />
      </View>
      <View style={styles.buttoncontainer} >
        <TouchableOpacity onPress={calcular} style={styles.button} activeOpacity={0.6}>
          <Text style={styles.buttonText}>Calcular</Text>
        </TouchableOpacity>
        {result != 0 &&
          <Text style={styles.result}>{result.toFixed(2)}</Text>
        }
        <Text style={[styles.result, { fontSize: 35 }]}> {resultText}</Text>
        {result > 30 &&
          <OpenURLButton url={dietURL}>Do you want to see your diet list?</OpenURLButton>
        }
        {result < 18.5 && result > 1 &&
          <OpenURLButton url={nutriURL}>Do you want to see your nutrition list?</OpenURLButton>
        }
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  butshad:{
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 23,
  },
  background: {
    marginTop: 0,
  },
  buttoncontainer: {
    marginTop: 20,
  },
  banners: {
    height: 250,
  },
  inputs: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dietbutton: {
    alignItems: 'flex-end',
    marginRight: 40,
    marginTop: 5,
  },
  dietbuttontext: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  input: {
    height: 80,
    marginHorizontal: 30,
    borderRadius: 8,
    padding: 10,
    textAlign: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 23,
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'coral',
  },
  button: {
    backgroundColor: 'lightblue',
    marginHorizontal: 80,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,
    elevation: 23,
  },
  buttonText: {
    padding: 30,
    alignSelf: 'center',
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold'
  },
  result: {
    alignSelf: 'center',
    color: 'black',
    fontSize: 80,
  },
});