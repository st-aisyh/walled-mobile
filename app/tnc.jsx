import { Text, View, StyleSheet, Modal, ScrollView, SafeAreaView } from 'react-native';

export default function Tnc() {
  return(
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
              <Text style={styles.text}>
                By using the Walled app, you agree to comply with these Terms and Conditions. 
                Walled provides services that allow users to transfer funds, top up accounts, 
                and view transaction histories. To use the App, you must create an account and 
                provide accurate, up-to-date personal information. You must be at least 18 years 
                old and legally able to enter into binding agreements. You are responsible for 
                maintaining the security of your account and must immediately notify us of any 
                unauthorized access.
              </Text>
              <Text style={styles.text}>
                The App supports various payment methods for transferring funds, topping up your account, 
                and managing your transactions. Fees for these services will be disclosed before any 
                action is confirmed, and you agree to pay any applicable fees. There may also be 
                transaction limits based on your account verification level. You agree to use the App 
                only for lawful purposes and to provide accurate information when initiating transactions.
                Any fraudulent activity or violation of these Terms may result in the suspension or 
                termination of your account.
              </Text>
              <Text style={styles.text}>
                We take your privacy seriously and handle your personal information in accordance 
                with our Privacy Policy. While we implement security measures to protect your data, 
                we cannot guarantee its absolute security. You are responsible for ensuring the 
                confidentiality of your account credentials. If you encounter issues with transactions, 
                please contact us within 14 days for assistance, although 
                refunds may not always be possible, depending on the nature of the transaction.
              </Text>
              <Text style={styles.text}>
                We reserve the right to amend these Terms at any time, and any changes will take 
                effect immediately upon posting. The Terms are governed by the laws of 
                Otoritas Jasa Keuangan (OJK), and any disputes will be resolved through
                arbitration in Mahkamah Keuangan. For questions or concerns, please contact our 
                support team at walled.id@gmail.com or 0215958.
              </Text>
      </View>
    </ScrollView>
  </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text: {
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    textAlign: 'justify',
  }
});
