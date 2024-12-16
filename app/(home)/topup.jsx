import { View, Text, StyleSheet } from "react-native";
import Input from "../../components/input";
import Amount from "../../components/Amount";
import Button from "../../components/Button";

export default function Topup(){
    return(
        <View style={styles.container}>
            <Amount  marginBottom={24} />
            <Input text={"Notes"} />
            <Button text={"Top Up"} marginTop={150}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff'
    },
});