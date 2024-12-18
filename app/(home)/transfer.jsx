import { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, } from 'react-native';

export default function Transfer() {
    const [value, setValue] = useState('');

    // Fungsi untuk menambahkan titik setiap ribuan
    const formatNumber = (text) => {
        const cleaned = text.replace(/\D/g, ''); // Menghapus karakter non-digit
        return cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Menambahkan titik setiap ribuan
    };

    const handleInputChange = (text) => {
        const formattedValue = formatNumber(text);
        setValue(formattedValue);
    };
    return (
        <View style={{ alignItems: 'center', flex: 1, justifyContent: "space-between" }}>
            <View style={{ alignItems: 'center', width: '100%' }}>
                <View style={styles.to}>
                    <Text style={{ fontSize: 16, color: '#fff' }}>To:   9000008940208</Text>
                </View>

                <View style={styles.container}>
                    <Text style={styles.placeholder}>Amount</Text>
                    <Text style={styles.currency}>
                        IDR<Text style={styles.superscript}></Text>
                    </Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="0"
                        value={value}
                        onChangeText={handleInputChange}
                    />
                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                        <View>
                            <Text style={{ color: "#B3b3b3", fontSize: 14 }}>Balance</Text>
                        </View>
                        <View>
                            <Text style={{ color: "#19918F", fontSize: 14 }}>IDR 10.000.0000</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.notebox}>
                    <Text style={styles.placeholder}>Notes</Text>
                    <TextInput style={styles.inputnote} />
                </View>
            </View>

            <TouchableOpacity>
                <View style={styles.buttontrans}>
                    <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18, }}>Transfer</Text>
                </View>
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 20,
        backgroundColor: "white",
        marginTop: 25,
    },
    to: {
        width: "100%",
        padding: 20,
        backgroundColor: "#19918F",
    },
    notebox: {
        width: "100%",
        padding: 20,
        backgroundColor: "white",
        marginTop: 25,
    },
    placeholder: {
        color: "#B3b3b3",
        fontSize: 16,
    },
    currency: {
        fontSize: 16,
    },
    superscript: {
        fontSize: 10,
        lineHeight: 10,
        position: 'relative',
    },
    input: {
        borderBottomColor: "#B3B3B3",
        borderBottomWidth: 0.5,
        fontSize: 30,
        width: '100%',
    },
    inputnote: {
        fontSize: 16,
        borderBottomColor: "#B3B3B3",
        borderBottomWidth: 0.5,
        width: '100%',
    },
    buttontrans: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        width: 397,
        alignItems: 'center',
        backgroundColor: '#19918F',
        borderRadius: 10,
        marginBottom: 15,
    },
});
