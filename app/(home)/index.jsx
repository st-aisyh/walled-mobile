import { Link, Stack } from 'expo-router';
import { Image, Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

function LogoTitle({user}) {
  const [isAvatarActive, setIsAvatarActive] = useState(false);
  console.log("USER", user);
  return (
    <TouchableOpacity
      style={[
        styles.avatarContainer,
        { borderColor: isAvatarActive ? '#178F8D' : '#fafbfd' },
      ]}
      onPress={() => setIsAvatarActive((prev) => !prev)}
      activeOpacity={0.8}
    >
      <Image style={styles.image} source={{uri:user?.avatar_url}} />
    </TouchableOpacity >

  );
}
export default function Home() {
  const [user,setUser]= useState({});
  const [showBalance, setShowBalance] = useState({});
  useEffect (() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value != null) {
          const res = await axios.get("http://192.168.30.41:8080/profile", 
            {
              headers: {
              Authorization: `Bearer ${value}`,
              },
            }
          );
          const user = res.data.data
          setUser(user)
        }
      } catch (e) {
        console.log(e)
      }
    };
    getData();
  }, [])

  return (
    <ScrollView containerStyle={styles.container}>
      <View style={styles.header}>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <LogoTitle user={user} />
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginInline: 5 }}>{user.fullname}</Text>
            <Text style={{ fontSize: 18, marginInline: 5 }}>Personal Account</Text>
          </View>
        </View>

        <Image source={require('../../assets/suntoggle.png')} />

      </View>
      <View style={{ backgroundColor: '#FAFBFD', paddingHorizontal: 20 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 25, justifyContent: 'space-between' }}>
          <View style={{ width: '70%' }}>
            <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 8 }}>Good Morning, {user?.username}!</Text>
            <Text style={{ fontSize: 16 }}>Check all your incoming and outgoing transactions here</Text>
          </View>
          <Image source={require('../../assets/sun.png')} style={{ width: 81, height: 77 }} />
        </View>

        <View style={styles.accountnumber}>
          <Text style={{ color: '#fff', fontSize: 18 }}>Account No.</Text>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>79732300{user?.id}</Text>
        </View>

        <View style={styles.balancebox}>
          <View>
            <Text style={{ fontSize: 22 }}>Balance</Text>
            <Text style={{ fontSize: 27, fontWeight: 'bold' }}>
              {showBalance ? `Rp${user?.balance || 0}` : "Rp ***"}
              <TouchableOpacity onPress={() => setShowBalance((prev) => !prev)}>
                <Image source={require('../../assets/view.png')} style={{ width: 18, height: 18, marginLeft: 10 }} />
              </TouchableOpacity>
            </Text>
          </View>
          
          <View>
            <View style={{ gap: 20 }}>
              <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: '#19918F', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesome6 size={18} name="add" color={'#fff'} />
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: '#19918F', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesome size={18} name="send" color={'#fff'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView style={styles.transaction}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 20, borderBottomColor: '#b3b3b3', borderBottomWidth: 0.5, }}>Transaction History</Text>
          {transactions.map((transaction) => (
            <View key={transaction.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 }}>
              <View>
                <Text style={{ fontSize: 18 }}>{transaction.name}</Text>
                <Text style={{ fontSize: 16 }}>{transaction.type}</Text>
                <Text style={{ fontSize: 14, color: '#b3b3b3' }}>{transaction.date}</Text>
              </View>
              <Text style={{ fontSize: 18, color: transaction.debit ? 'red' : 'green' }}>{transaction.debit ? '-' : '+'}  Rp {transaction.amount}</Text>
            </View>
          ))}
        </ScrollView>

      </View>
    </ScrollView>
  );
}

const user = {
  fullname: 'John Doe',
  typeofaccount: 'Personal Account',
  accountnumber: '123456789',
  balance: '10.000.000'
}

const transactions = [
  {
    id: 1,
    date: '08 December 2024',
    amount: '75.000',
    name: 'Indoapril',
    type: 'Topup',
    debit: false,
  },
  {
    id: 2,
    date: '06 December 2024',
    amount: '80.000',
    name: 'Si Fulan',
    type: 'Transfer',
    debit: true,
  },
]

const styles = StyleSheet.create({
  balancebox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 8,
  },
  accountnumber: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#19918F',
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 8,
  },
  avatarContainer:{
    borderRadius: 9999, // Full circle
    borderWidth: 4,
    cursor: "pointer", // Optional for web
    transition: "all 0.3s", // Optional for web
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50
  },
  transaction : {
    flex: 1, 
    backgroundColor: '#fff',
    marginTop: 25,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 8,
  }
});