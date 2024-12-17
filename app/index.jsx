import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput, Image, Text } from 'react-native';
import Button from '../components/Button';
import { Link, useNavigation, useRouter, router } from 'expo-router';
import {z} from "zod";
import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginSchema = z.object({
  email: z.string().email({message: "invalid email address"}),
  password: z.string().min(4, { message : "Must be 4 character or more long"})
});

export default function App() {
  const [form, setForm] = useState({email: "", password: ""});
  const [errorMsg, setErrors] = useState({});
  const[serverError, setServerError] = useState("");

  const router = useRouter();

  const handleInputChange = (key, value) => {
    setForm({...form, [key]: value });

    try{
      LoginSchema.pick({ [key]: true }).parse({ [key]: value });
      setErrors((prev) => ({ ...prev, [key]: "" })); 
    } catch (error) {
      setErrors((prev) => ({ ...prev, [key]: error.errors[0].message })); 
    }
  };

  const handleSubmit = async () => {
    try {
        LoginSchema.parse(form);

        const res = await axios.post("http://192.168.30.41:8080/auth/login", form);

        await AsyncStorage.setItem("token", res.data.data.token);
        router.replace("/(home)")
    } catch (error) {
      if(axios.isAxiosError(error)) {
        if(error.response) {
          setServerError(error.response.data.message || "An error occurred");
        } else if (error.request) {
          setServerError("Network error. Please try again later.");
          console.error("Network error:", error.request);
        } else {
          setServerError("An unexpected error occurred.");
          console.error("Request Setup Error:", error.message);
        }
      } else if(error?.errors) {
        const errors = {};
        err.errors.forEach((item) => {
          const key = item.path[0];
          errors[key] = item.message;
      });
      setErrors(errors);
    } else {
      setServerError("An unknown error occurred.");
      console.error("Unhandled Error:", error);
    }
  }
};

  return (
    <View style={styles.container}>
      {serverError && <Text style={styles.errorMsg}>{serverError}</Text>}

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
