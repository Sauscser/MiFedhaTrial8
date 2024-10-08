import React, {useState, useRef,useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Alert} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../components/CredSalesReq/Vw2DelLnReq";
import styles from './styles';
import { getSMAccount, listReqLoanChamas, listReqLoanCredSls, listReqLoans } from '../../../../src/graphql/queries';



const FetchSMNonCovLns = props => {

    
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);
    
        const fetchUsrDtls = async () => {
          const userInfo = await Auth.currentAuthenticatedUser();
        
          
          try {
                  const MFNDtls: any = await API.graphql(
                      graphqlOperation(getSMAccount, {awsemail: userInfo.attributes.email}
                  ),);
    
                  const balances = MFNDtls.data.getSMAccount.balance;
                  const owner = MFNDtls.data.getSMAccount.owner;

        const fetchLoanees = async () => {
            setLoading(true);
            try {

            

              const Lonees:any = await API.graphql(graphqlOperation(listReqLoanCredSls, 
                { 
                    
                  filter: {
                  
                    loaneeEmail: { eq: userInfo.attributes.email},
                    
                               
                }
                }
                  ));
              setLoanees(Lonees.data.listReqLoanCredSls.items);
            } catch (e) {
              console.log(e);
            } finally {
              setLoading(false);
            }
            
          };
          if (userInfo.attributes.sub !== owner)
          {Alert.alert ("Please first create main account")}
          else{
                                 await fetchLoanees();}
                        
        }
              
        catch (e)
        {
          if(e){
            Alert.alert("Advocate does not exist; otherwise check internet connection");
            return;
          }
            console.log(e)
           
            
        }    

        
         }
      
        
          useEffect(() => {
            fetchUsrDtls();
          }, [])  
          
          
  return (
    
    <View style={styles.root}>
      <FlatList
      style= {{width:"100%"}}
        data={Loanees}
        renderItem={({item}) => <LnerStts SMAc={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchUsrDtls}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            <Text style={styles.label}> Swipe to View My Loan Requests</Text>
            <Text style={styles.label2}> (Select to Delete)</Text>
          </>
        )}
      />

</View>


  );
};

export default FetchSMNonCovLns;