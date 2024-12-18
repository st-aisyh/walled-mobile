import Checkbox from "expo-checkbox";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  Text,
  Modal,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";
import Button from "../components/Button";
import { Link } from "expo-router";
import axios from "axios";
import { z } from "zod";
import { useNavigation, router, useRoute } from "expo-router";

export default function Register() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar_url, setAvatarurl] = useState("");
  const [isChecked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [errorMsg, setErrors] = useState({});
  const [form, setForm] = useState({});

  const termsandcondition = `
  1. To use the App, you must be at least 18 years old or the legal age in your jurisdiction. By agreeing to these Terms, you confirm that you are eligible to use the App.

  2. You must register for an account to use the App. During registration, you will provide accurate and complete information and update it as necessary. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.

  3. The App offers various services, including but not limited to storing funds, transferring money, making payments, and purchasing goods and services. We reserve the right to change or discontinue any service at our discretion.

  4. Some services provided by the App may involve fees, which will be disclosed to you before completing a transaction. By using the App, you agree to pay any applicable fees as described.

  5. Obligations You agree to:

  6. Transactions made through the App are processed according to the rules and regulations of the payment networks involved. We are not responsible for delays or errors caused by third-party payment systems.

  7. We use encryption and other security measures to protect your information. However, you are responsible for maintaining the security of your account. Notify us immediately if you suspect any unauthorized access to your account.

  8. Your use of the App is governed by our Privacy Policy, which outlines how we collect, use, and protect your personal data.

  9. We reserve the right to suspend or terminate your account if you violate these Terms or engage in fraudulent or unlawful activities.

  10. We are not liable for any damages resulting from the use or inability to use the App, including but not limited to lost profits, data loss, or any other indirect or consequential damages.

  11. We may update or modify these Terms from time to time. Any changes will be posted within the App, and the updated Terms will be effective once posted. By continuing to use the App after the changes are made, you agree to the updated Terms.

  12. These Terms are governed by the laws of [Jurisdiction]. Any disputes related to these Terms shall be resolved in the competent courts of [Jurisdiction].

  13. If you have any questions about these Terms, please contact us at [contact information].
  `;

  const navigation = useNavigation();

  const RegisterSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(3, { message: "Must be 3 or more characters long" }),
  });

  const handleInputChange = (key, value) => {
    setForm({ ...form, [key]: value });
    try {
      RegisterSchema.pick({ [key]: true }).parse({ [key]: value });
      setErrors((prev) => ({ ...prev, [key]: "" }));
    } catch (err) {
      setErrors((prev) => ({ ...prev, [key]: err.errors[0].message }));
    }
  };

  const handleRegister = async () => {
    if (
      !fullname ||
      !username ||
      !form.email ||
      !form.password ||
      !avatar_url ||
      !isChecked
    ) {
      Alert.alert(
        "Error",
        "All collumn must be filled and agree with the terms and conditions"
      );
      return;
    }

    try {
      const response = await axios.post("http://192.168.30.41:8080/register", {
        fullname: fullname,
        username: username,
        email: form.email,
        password: form.password,
        avatar_url,
      });

      Alert.alert("Success", "Registration success, Please login!");
      router.replace("/");
    } catch (error) {
      console.log(error)
      if (error.response) {
        Alert.alert(
          console.log('huhuha',form),
          "Failed",
          Registration `failed: ${error.response.data.message}`
        );
      } else {
        Alert.alert("Failed", "Something went wrong. Please try again!");
      }
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
        resizeMode="stretch"
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <ScrollView>
          <View style={styles.modalView}>
            <Text
              style={{ fontWeight: "bold", marginBottom: 10, fontSize: 25 }}
            >
              Terms and Conditions
            </Text>
            <Text style={styles.modalText}>{termsandcondition}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </ScrollView>
      </Modal>
      <TextInput
        style={styles.input}
        placeholder="Fullname"
        placeholderTextColor="#aaa"
        value={fullname}
        onChangeText={setFullname}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(text) => handleInputChange("email", text)}
      />{" "}
      {errorMsg.email ? (
        <Text style={styles.errorMsg}>{errorMsg.email}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry={true}
        value={form.password}
        onChangeText={(text) => handleInputChange("password", text)}
      />{" "}
      {errorMsg.password ? (
        <Text style={styles.errorMsg}>{errorMsg.password}</Text>
      ) : null}
      <TextInput
        style={styles.input}
        placeholder="Avatar Url"
        placeholderTextColor="#aaa"
        value={avatar_url}
        onChangeText={setAvatarurl}
      />
      <View style={styles.tnc}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "#19918F" : undefined}
        />

        <Text style={styles.tncText}> I have read and agree to the
        <Text style={styles.tncLink} onPress={() => setModalVisible(true)}>
          {" "}Terms and Conditions
        </Text>
        <Text style={{ color: "red" }}> *</Text>
        </Text>
      </View>
      <Button text="Register" handlePress={handleRegister} />
      <Text style={styles.link}>
        Have an account? {""}
        <Link href="/" style={styles.linkText}>
          Login Here
        </Link>
      </Text>
      <StatusBar style="auto" hidden/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 233,
    height: 57,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4DB6AC",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    marginTop: 10,
    textAlign: "left",
    width: "100%",
  },
  linkText: {
    color: "#19918F",
    paddingTop: 0,
    marginTop: 0,
    paddingLeft: 10,
  },
  tnc: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flext-start",
    textAlign: "left",
    flexWrap: "nowrap",
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 10,
  },
  tncText: {
    fontSize: 13,
  },
  tncLink: {
    color: "#19918F",
    fontSize: 13,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "justify",
  },
  buttonClose: {
    backgroundColor: "#19918F",
  },
});
