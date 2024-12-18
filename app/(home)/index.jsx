import { Link } from 'expo-router';
import { Image, Text, View, StyleSheet, ScrollView, TouchableOpacity, RefreshControl, StatusBar } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useEffect, useState, React, useCallback } from 'react';
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
  const [refreshing, setRefreshing] = useState(false);
  const [transaction, setTransaction] = useState([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
  }, [refreshing])

  useEffect(() => {
    const getTransaction = async () => {
      try {
        const value = await AsyncStorage.getItem("token");
        if (value !== null) {
          const res = await axios.get(
            "http://192.168.30.41:8080/transactions",
            {
              headers: {
                Authorization: `Bearer ${value}`,
              },
            }
          );
          const transaction = res.data.data
          setTransaction(transaction)
        }
      } catch (e) {
        console.log(e);
      }
    };
    getTransaction();
  }, [refreshing]);

  console.log('TRANSACTION USER', transaction);

  return (
    <ScrollView containerStyle={styles.scrollView}
      refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>
      <View style={styles.header}>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <LogoTitle user={user} />
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginInline: 3 }}>{user.fullname}</Text>
            <Text style={{ fontSize: 18, marginInline: 3 }}>Personal Account</Text>
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
          <Text style={{ color: '#fff', fontSize: 18 }}>Account Number</Text>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>{user?.wallet?.account_number}</Text>
        </View>

        <View style={styles.balancebox}>
          <View>
            <Text style={{ fontSize: 22 }}>Balance</Text>
            <Text style={{ fontSize: 27, fontWeight: 'bold' }}>
              {showBalance ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(user?.balance || 0)
                : "Rp***"}
              <TouchableOpacity onPress={() => setShowBalance((prev) => !prev)}>
                <Image source={require('../../assets/view.png')} style={{ width: 18, height: 18, marginLeft: 10 }} />
              </TouchableOpacity>
            </Text>
          </View>

        <View>
            <View style={{ gap: 20 }}>
              <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: '#19918F', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Link href="/topup">
                  <FontAwesome6 size={18} name="add" color={'#fff'} />
                </Link>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: '#19918F', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Link href="/transfer">
                  <FontAwesome size={18} name="send" color={'#fff'} />
                </Link>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView style={styles.transaction}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 20, borderBottomColor: '#b3b3b3', borderBottomWidth: 0.5, }}>Transaction History</Text>
          {transaction?.map((transacs) => (
            <View key={transacs.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15 }}>
              <View>
                <Text style={{ fontSize: 19, fontWeight: 'bold' }}>{transacs?.recipient_fullname}</Text>
                <Text style={{ fontSize: 14 }}>{transacs?.transaction_type.charAt(0).toUpperCase() + transacs?.transaction_type.slice(1)}</Text>
                <Text style={{ fontSize: 12 }}>{transacs?.description}</Text>
                <Text style={{ fontSize: 12, color: '#b3b3b3' }}>{new Intl.DateTimeFormat('id-ID', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: false,
                    }).format(new Date(transacs?.transaction_date))}
                </Text>
              </View>

              <Text
                style={{
                fontSize: 20,
                color: transacs.recipient_wallet_id === transacs.recipient_id && transacs.transaction_type === "transfer" ? 'red' : 'green' }}>
                  {transacs.recipient_wallet_id === transacs.recipient_id && transacs.transaction_type === "transfer" ? '-' : '+'}
              {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(transacs.amount)}
           </Text>
            </View> 
          ))}
        </ScrollView>

      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}


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
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: '#fff',
    borderBottomColor: "#B3B3B3",
    borderBottomWidth: 0.5
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
  }
});