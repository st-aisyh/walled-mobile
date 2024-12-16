import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, Image, Text } from 'react-native';
import Button from '../components/Button';
import { Link, useNavigation } from 'expo-router';
import {z} from "zod";
import { useState } from 'react';

const LoginSchema = z.object({
  email: z.string().email({message: "invalid email address"}),
  password: z.string().min(8, { message : "Must be 8 character or more long"})
});

export default function App() {
  const [form, setForm] = useState({email: "", password: ""});
  const [errorMsg, setErrors] = useState({});

  const handleInputChange = (key, value) => {
    setForm({...form, [key]: value });
    try{
      LoginSchema.pick({ [key]: true }).parse({ [key]: value });
      setErrors((prev) => ({ ...prev, [key]: "" })); 
    } catch (error) {
      setErrors((prev) => ({ ...prev, [key]: error.errors[0].message })); 
    }
  };

  const handleSubmit = () => {
    try {
        LoginSchema.parse(form);
    } catch (error) {
      const errors = {};
      err.errors.forEach((item) => {
        const key = item.path[0];
        errors[key] = item.message;
      });
      setErrors(errors);
    }
  };

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
        onChangeText={(text) => handleInputChange('email', text)}
      />

      {errorMsg.email ? <Text style={styles.errorMsg}>{errorMsg.email}</Text> : null}

      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        placeholderTextColor="#aaa" 
        secureTextEntry={true}
        onChangeText={(text) => handleInputChange('password', text)}
        value={form.password}
      />

      {errorMsg.password ? <Text style={styles.errorMsg}>{errorMsg.password}</Text> : null}

      {/* <Link href="/(home)" style={styles.linkText}>Masuk</Link> */}
      <Button handlePress = {handleSubmit} text = "Login"/>

      <Text style={{alignSelf: "flex-start", padding: 10}}>
        Don't have account? {""}
        <Link href="/register" style={styles.register}>
        Register here</Link>
      </Text>

      <StatusBar style="auto" hidden />
    </View>
  );
};

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
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 15,
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
  },
  errorMsg: {
    color: 'red',
    width: '100%'
  }
})
