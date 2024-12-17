import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, Image, Text, Modal, Pressable } from 'react-native';
import Button from '../components/Button';
import { Link } from 'expo-router';
import { useNavigation } from 'expo-router';
import { useState } from 'react';
import Checkbox from 'expo-checkbox';

export default function Register() {
    const [isChecked, setChecked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    // const navigation = useNavigation();
    // const handleRegister = () => {
    //     navigation.navigate('index');
    // }
    
  return (
    <View style={styles.container}>

      <Image
      source={require('../assets/logo.png')}
      style={styles.logo}
      resizeMode='stretch'
      />

      <TextInput 
        style={styles.input} 
        placeholder="Fullname" 
        placeholderTextColor="#aaa" 
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

      <TextInput 
        style={styles.input} 
        placeholder="Avatar url" 
        placeholderTextColor="#aaa" 
        keyboardType='url'
      />
      
      <View style={styles.tnc}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#4630EB' : undefined}
        />

        <Text style={styles.tncText}>
          I have read and agree to the {""}
          <Link href="/tnc">
            <Text style={styles.tncLink}>Terms and Conditions</Text>
          </Link> 
          <Text style={{color:'red'}}> *</Text>
        </Text>
      </View>

      <Button style={styles.button} text = "Register"/>

      <Text style={styles.tncText}> Already have account? <Link href="/" style={styles.tncLink}>Login here</Link> </Text>

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
    color: '#19918F'
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#FAFBFD',
    fontSize: 15,
  },
  tnc: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tncText: {
    alignSelf: "flex-start",
    padding: 10,
    fontSize: 13
  },
  tncLink: {
    color: '#19918F',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    fontSize: 13
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#19918F',
    margin: 20
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    backgroundColor: '#fff',
    alignItems: 'left',
    justifyContent: 'center',
    marginTop: 10,
    // padding: 20,
    width: '100%'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});
