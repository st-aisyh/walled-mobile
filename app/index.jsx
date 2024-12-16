import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, Image, Text } from 'react-native';
import Button from '../components/Button';
import Input from '../components/input';
import { Link, useNavigation } from 'expo-router';

export default function App() {
  const navigation = useNavigation();
  const handleIndex = () => {
  navigation.navigate('(home)');
  }
  return (
    <View style={styles.container}>

      <Image
      source={require('../assets/logo.png')}
      style={styles.logo}
      resizeMode='stretch'
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        placeholderTextColor="#aaa" 
        keyboardType='email-address'
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        placeholderTextColor="#aaa" 
        secureTextEntry={true}
      />

      {/* <Link href="/(home)" style={styles.linkText}>Masuk</Link> */}
      <Button text = "Login" onPress={handleIndex}/>

      <Text style={{alignSelf: "flex-start", padding: 10}}>Don't have account? <Link href="/register" style={styles.register}>Register here</Link> </Text>

      <StatusBar style="auto" hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 233,
    height: 57,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    fontSize: 16,
  },
  register: {
    color: '#19918F',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    alignSelf: "flex-start"
  },
  linkText: {
    color: '#19918F'
  }
})
