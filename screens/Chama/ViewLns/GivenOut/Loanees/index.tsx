import React, {useState, useRef,useEffect} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList, Alert} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import ChmNonCvLns from "../../../../../components/Chama/Loans/Givenout/Loanees";
import styles from './styles';
import { getCompany, getGroup,   listCvrdGroupLoans,   vwChamaMembersss } from '../../../../../src/graphql/queries';
import { useRoute } from '@react-navigation/native';
import { updateCompany, updateGroup } from '../../../../../src/graphql/mutations';

const FetchSMNonCovLns = props => {

    const[LnerPhn, setLneePhn] = useState(null);
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);
    const route = useRoute();

    const fetchUser = async () => {
        const userInfo = await Auth.currentAuthenticatedUser();
              
        setLneePhn(userInfo.attributes.phone_number);
             
      };
      
  
      useEffect(() => {
          fetchUser();
        }, []);

        const fetchLoanees = async () => {
            setLoading(true);
            try {
              const Lonees:any = await API.graphql(graphqlOperation(listCvrdGroupLoans, 
                { 
                  sortDirection: 'DESC',
                  limit: 100,
                  filter: {
                    and: {
                      
                      lonBala:{gt:0},
                      grpContact:  {eq: route.params.grpContact}
                      
                    }
                  },
                }
              
              ));
          setLoanees(Lonees.data.listCvrdGroupLoans.items);
          const fetchUsrDtls = async () => {
            try {
                    const MFNDtls: any = await API.graphql(
                        graphqlOperation(getGroup, {grpContact: route.params.grpContact}
                    ),);
      
                    const grpBals = MFNDtls.data.getGroup.grpBal;
                    
                    const fetchCompDtls = async () => {
                      try {
                              const MFNDtls: any = await API.graphql(
                                  graphqlOperation(getCompany, {AdminId: "BaruchHabaB'ShemAdonai2"}
                              ),);
              
                              const companyEarningBals = MFNDtls.data.getCompany.companyEarningBal;
                              const companyEarnings = MFNDtls.data.getCompany.companyEarning;
                              const enquiryFees = MFNDtls.data.getCompany.enquiryFee;
                              
                              
                                          const updtActAdm = async()=>{
                                            
                                            try{
                                                await API.graphql(
                                                  graphqlOperation(updateCompany,{
                                                    input:{
                                                      AdminId:"BaruchHabaB'ShemAdonai2",
                                                      companyEarningBal:parseFloat(companyEarningBals) + parseFloat(enquiryFees),
                                                      companyEarning:parseFloat(companyEarnings) + parseFloat(enquiryFees),
                                                    }
                                                  })
                                                )
                                            }
                                            catch(error){
                                              if(error){
                                                Alert.alert("Check your internet connection")
                                                return;
                                            }
                                            }
                                            updtUsrAc();
                                            
                                          }
      
                                          const updtUsrAc = async()=>{
                                            
                                            try{
                                                await API.graphql(
                                                  graphqlOperation(updateGroup,{
                                                    input:{
                                                      grpContact: route.params.grpContact,
                                                      grpBal:parseFloat(grpBals) - parseFloat(enquiryFees),
                                                    }
                                                  })
                                                )
                                            }
                                            catch(error){
                                              if(error){
                                                Alert.alert("User does not exist")
                                                return;
                                            }
                                            }
                                                                                                
                                          }
                      
      
      
                      
      
              if(parseFloat(grpBals) < parseFloat(enquiryFees) ){
                  Alert.alert("Account Balance is very little");
                }
                else{
                    
                  await updtActAdm();
                    }
                    
                      }
                  catch (e)
                  {
                    if(e){
                      Alert.alert("Chama does not exist does not exist; otherwise check internet connection");
                      return;
                    }
                      console.log(e)
                     
                      
                  }    
      
          
                   }
                   await fetchCompDtls();
      
                  }
      
                  catch (e)
                  {
                    if(e){
                      Alert.alert("Chama does not exist; otherwise check internet connection");
                      return;
                    }
                      console.log(e)
                     
                      
                  }    
      
                  
                   }

                   await fetchUsrDtls();
        } catch (e) {
          console.log(e);
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchLoanees();
      }, [])

  return (
    <View style={styles.root}>
      <FlatList
      style= {{width:"100%"}}
        data={Loanees}
        renderItem={({item}) => <ChmNonCvLns Loaner={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchLoanees}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            <Text style={styles.label}> Group Loanees</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMNonCovLns;