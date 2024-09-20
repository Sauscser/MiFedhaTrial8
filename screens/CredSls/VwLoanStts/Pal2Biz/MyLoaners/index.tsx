import React, {useState, useRef,useEffect} from 'react';
import {View, Text, ImageBackground, Pressable, FlatList, Alert} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../../components/VwCredSales/CrdStatus/Pal/Pal2PalLoaners";
import styles from './styles';
import { getCompany, getSMAccount, listCovCreditSellers, listPersonels, listSMLoansCovereds } from '../../../../../src/graphql/queries';
import { updateCompany, updateSMAccount } from '../../../../../src/graphql/mutations';
import { TextInput } from 'react-native-gesture-handler';


const FetchSMCovLns = props => {

   
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);
    const [Loaneesz, setLoaneesz] = useState([]);
    const [itemPrys, setitemPrys] = useState("");

   

        const fetchUsrDtls = async () => {
          const userInfo = await Auth.currentAuthenticatedUser();
              
        
          try {
                  const MFNDtls: any = await API.graphql(
                      graphqlOperation(getSMAccount, {awsemail: userInfo.attributes.email}
                  ),);
    
                  const balances = MFNDtls.data.getSMAccount.balance;
                  const owner = MFNDtls.data.getSMAccount.owner; 

                  const fetchPersonels = async () => {
                    setLoading(true);
                    try {
                      const Lonees:any = await API.graphql(graphqlOperation(listPersonels, 
                        {
                                
                                
                              
                              filter:{
                                and :{
                                  phoneKontact:{eq:userInfo.attributes.email},
                                  BusinessRegNo: {eq:itemPrys},
                                }
                              },
                              
                            }
                      
                          ));
                      setLoaneesz(Lonees.data.listPersonels.items);
                  
                  
                  const fetchLoanees = async () => {
            setLoading(true);
            try {
              const Lonees:any = await API.graphql(graphqlOperation(listCovCreditSellers, 
                {
                        
                        
                      
                      filter:{
                        and :{
                      lonBala:{gt:0},
                      buyerContact: {eq:itemPrys},
                      lnType:{eq:"Pal2Biz"},
                        }
                      },
                      limit: 100,
                  sortDirection: 'DESC',
                    }
              
                  ));
              setLoanees(Lonees.data.listCovCreditSellers.items);

              
                        
                        const fetchCompDtls = async () => {
                          try {
                                  const MFNDtlsz: any = await API.graphql(
                                      graphqlOperation(getCompany, {AdminId: "BaruchHabaB'ShemAdonai2"}
                                  ),);
                  
                                  const companyEarningBals = MFNDtlsz.data.getCompany.companyEarningBal;
                                  const companyEarnings = MFNDtlsz.data.getCompany.companyEarning;
                                  const enquiryFees = MFNDtlsz.data.getCompany.enquiryFee;
                                  
                                  
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
                                                      graphqlOperation(updateSMAccount,{
                                                        input:{
                                                          awsemail: userInfo.attributes.email,
                                                          balance:parseFloat(balances) - parseFloat(enquiryFees),
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
                          
          
          
                          
          
                  if(parseFloat(balances) < parseFloat(enquiryFees) ){
                      Alert.alert("Account Balance is very little");
                    }

                    else if (Lonees.data.listPersonels.items.length < 1)
                    {Alert.alert ("Business does not exist or you dont work here")}
                    else{
                        
                      await updtActAdm();
                        }
                        
                          }
                      catch (e)
                      {
                        if(e){
                          console.log(e)
                        }
                          
                         
                          
                      }    
          
              
                       }
                       await fetchCompDtls();
          
                      }
          
                      catch (e)
                      {
                        if(e){
                          console.log(e)
                        }
                          
                         
                          
                      }    
          
                      
                      
                       }
                       if (userInfo.attributes.sub!==owner) {
                        Alert.alert("Please first create a main account")
                        return;
                      }  else {
                       await fetchLoanees();}

                      }
          
                      catch (e)
                      {
                        if(e){
                          console.log(e)
                        }
                          
                         
                          
                      }    
          
                      
                      
                       }
                       
                       await fetchPersonels();
            } catch (e) {
            console.log(e);
            } finally {
            setLoading(false);
            setitemPrys("");
            }
            };
            
            useEffect(() => {
            fetchUsrDtls();
            }, [])   

            useEffect(() =>{
              const itemPryss=itemPrys
                if(!itemPryss && itemPryss!=="")
                {
                  setitemPrys("");
                  return;
                }
                setitemPrys(itemPryss);
                }, [itemPrys]
                 );


  return (
    <View style={styles.image}>

    <View style={styles.root}>
      <FlatList
      style= {{width:"100%"}}
      data={Loanees}
      renderItem={({item}) => <LnerStts Loanee={item} />}
      keyExtractor={(item, index) => index.toString()}
      onRefresh={fetchUsrDtls}
      refreshing={loading}
      showsVerticalScrollIndicator={false}
      ListHeaderComponentStyle={{alignItems: 'center'}}
      ListHeaderComponent={() => (
          <>
            
            <Text style={styles.label}> Business Loaners</Text>
            <Text style={styles.label2}> (Fill below and swipe here to filter)</Text>
          </>
        )}
      />

</View>

<View style={styles.sendLoanView}>
                    <TextInput
                     placeholder='Enter Business Phone'
                     
                      value={itemPrys}
                      onChangeText={setitemPrys}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
             
    </View>
    </View>
  );
};

export default FetchSMCovLns;