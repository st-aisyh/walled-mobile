import { View, Text, StyleSheet, TextInput, ScrollView, useState, Image } from "react-native";
import Input from "../../components/input";
import Amount from "../../components/Amount";
import Button from "../../components/Button";

export default function Transfer() {
    // const [showBalance, setShowBalance] = useState(true);

    return (
        <ScrollView style={{ flex: 1, backgroundColor: '#ddd' }}>
            <View style={{backgroundColor: '#19918F', paddingHorizontal: 20, paddingVertical: 8, width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 18 }}>To:</Text>
                <TextInput style={{ fontSize: 18 }} keyboardType="number-pad" placeholder="insert account number" placeholderTextColor={'#fff'} color={'#fff'} />
            </View>
            <View style={styles.container}>
                <View>
               
                    <Amount 
                        showBalance={true} 
                        marginBottom={24} 
                        balance={showBalance ? "Rp10.000.000,00" : "Rp ********"} 
                    />
                  {/* <Image 
                    
                    source={require('../../assets/view.png')}
                    resizeMode= 'contain'
                    onTouchEnd={() => setShowBalance((prev) => !prev)}
                /> */}
                    <Input text={"Notes"} />
                </View>
                <Button marginTop={240} marginBottom={20} text="Transfer" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'space-between',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    }
});