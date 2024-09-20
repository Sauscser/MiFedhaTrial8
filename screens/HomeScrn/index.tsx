import React, { useState, useEffect } from 'react';
import {View, Text, Alert, Pressable, SafeAreaView} from 'react-native';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import {graphqlOperation, API} from 'aws-amplify';
import { getCompany } from '../../src/graphql/queries';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = props => {

  const [Alrt, setAlrt] = useState ("")
  const navigation = useNavigation();
const [id,setid] = useState("")
  

  const LnsScreen = () => {
    navigation.navigate('LnsScreen');
  };

  const ChamaScreen = () => {
    navigation.navigate('ChamaScreen');
  };

  const CredSlsScreen = () => {
    navigation.navigate('CredSlsScreen');
  };

  const CreateSMAcs = () => {
    navigation.navigate('WelcomePgss');
  };

  const ChmNonCovLonss = () => {
    navigation.navigate('ChmNonCovLons', {id});
  };

  const VwMakeLnReq = () => {
    navigation.navigate('PlaceLnReq');
  };

  const ViewMySMAcss = () => {
    navigation.navigate('ViewSmAcs');
  };

  const ViewAlertDtls = () => {
    navigation.navigate('ViewAlertDtls');
  };

  const RequestLoansPage = () => {
    navigation.navigate('RequestLoansPage');
  };

  const gtCompDtls = async () =>{
    
    try{
      const compDtls :any= await API.graphql(
        graphqlOperation(getCompany,{AdminId:"BaruchHabaB'ShemAdonai2"})
        );

        setAlrt(compDtls.data.getCompany.alert)
        
      }
      
      catch(e){
        console.log(e)
        if(e){
          Alert.alert("Check your internet")
          return;
      }
      }};

      useEffect(() => {
        gtCompDtls();
      }, []);


  return (
    <SafeAreaView>
      <View
        
        style={styles.image}>
        
        <View style={styles.viewForPressables1}>
        

        <TouchableOpacity
            onPress={CreateSMAcs}
            style={styles.loanFriendButton}>
            <Text style={styles.loanAFriendText}>Create Main Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={ViewMySMAcss}
            style={styles.loanFriendButton}>
            <Text style={styles.loanAFriendText}>View Main Account</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.viewForPressables2}> 
        <Text style={styles.title}>
          Life is helping out each other
        </Text>
        </View>
        

        <View style={styles.viewForPressables3}>
          <View style={styles.viewForPressables4}>
            <TouchableOpacity
            onPress={LnsScreen}
            style={styles.chamaLoanAndCreditSalesButton4}>
            <Text style={styles.ChamaLoanAndCreditSalesText4}>
              Pal-Pal Products
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={ChamaScreen}
            style={styles.chamaLoanAndCreditSalesButton4}>
            <Text style={styles.ChamaLoanAndCreditSalesText4}>
              Chama Products
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={CredSlsScreen}
            style={styles.chamaLoanAndCreditSalesButton4}>
            <Text style={styles.ChamaLoanAndCreditSalesText4}>
              Business Products
            </Text>
          </TouchableOpacity>

          </View>
          
          <View style={styles.viewForPressables5}>
          <TouchableOpacity
            onPress={RequestLoansPage}
            style={styles.chamaLoanAndCreditSalesButton4}>
            <Text style={styles.loanAFriendText2}>
              Loan Requests
            </Text>
          </TouchableOpacity>

          
          </View>
          
        </View>

        <View style={styles.viewForPressables6}> 
        <TouchableOpacity
            onPress={ViewAlertDtls}
            style={styles.loanFriendButton2}>
            <Text style={styles.loanAFriendText3} >{Alrt} </Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;