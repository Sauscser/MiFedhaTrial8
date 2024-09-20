import React, {useState, useRef,useEffect} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList, Alert} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import NonLnSent from "../../../components/MFKubwa/VwMFKWthdrwls";
import styles from './styles';


import { getCompany, getSMAccount,  vwMFKWthdrwls } from '../../../src/graphql/queries';
import { useRoute } from '@react-navigation/core';
import { updateCompany, updateSMAccount } from '../../../src/graphql/mutations';

const FetchSMNonLnsSnt = props => {

 
    const [loading, setLoading] = useState(false);
    const [Recvrs, setRecvrs] = useState([]);
    const route = useRoute();

    

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
              const Lonees:any = await API.graphql(graphqlOperation(vwMFKWthdrwls, 
                 {
                      saId: route.params.MFKPhn,
                      sortDirection: "DESC",
                      limit:100
                      
                    }
  
                  ));
                  setRecvrs(Lonees.data.VwMFKWthdrwls.items);

                  
                          }
              
                          catch (e)
                          {
                            if(e){
                              Alert.alert("Error!");
                              return;
                            }
                              console.log(e)
                             
                              
                          }    
              
                          
                           }
    
                           if (userInfo.attributes.sub !== owner)
                           {Alert.alert ("Please first create main account")}
                           else{
                                                  await fetchLoanees();}
            } catch (e) {
              console.log(e);
            } finally {
              setLoading(false);
            }
          };
        
          useEffect(() => {
            fetchUsrDtls();
            }, [])
        
          

  return (
    <View style={styles.root}>
      <FlatList
      style= {{width:"100%"}}
        data={Recvrs}
        renderItem={({item}) => <NonLnSent SMAc={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchUsrDtls}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            <Text style={styles.label}>My Withdrawals</Text>
            <Text style={styles.label2}> (Please swipe down to load)</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMNonLnsSnt;