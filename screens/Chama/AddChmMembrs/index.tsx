import React, {useEffect, useState} from 'react';

import {createChamaMembers,  updateCompany, updateGroup} from '../../../src/graphql/mutations';
import { getCompany, getGroup, getSMAccount, } from '../../../src/graphql/queries';
import {Auth, graphqlOperation, API} from 'aws-amplify';

import {useNavigation} from '@react-navigation/native';


import {
  View,
  Text,
  
  TextInput,
  ScrollView,
  
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';

export type UserReg = {
  usr:String;
  
}

const AddChmMmbrs = (props:UserReg) => {

  const{usr} = props;

  


  const navigation = useNavigation();

  const [ChmPhn, setChmPhn] = useState('');

  const [phoneContacts, setPhoneContacts] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [ChmNm, setChmNm] = useState('');
  const [ChmDesc, setChmDesc] = useState('');

  const [MmbaID, setMmbaID] = useState('');
  const ChmPhnNphoneContacts = MmbaID+ChmPhn



      const ChckUsrExistence = async () => {
        const userInfo = await Auth.currentAuthenticatedUser();
      
     
        try {
          const UsrDtls:any = await API.graphql(
            graphqlOperation(getSMAccount, { awsemail:phoneContacts}),
                        
          )

          const nationalidsss = UsrDtls.data.getSMAccount.nationalid;
          const namess = UsrDtls.data.getSMAccount.name;
        
          const gtCompDtls = async () =>{
            if(isLoading){
              return;
            }
            setIsLoading(true);
            try{
              const compDtls :any= await API.graphql(
                graphqlOperation(getCompany,{AdminId:"BaruchHabaB'ShemAdonai2"})
                );
                const ttlActiveChmUserss = compDtls.data.getCompany.ttlActiveChmUsers;
                
                const gtChmDtls = async () =>{
                  if(isLoading){
                    return;
                  }
                  setIsLoading(true);
                  try{
                    const compDtls :any= await API.graphql(
                      graphqlOperation(getGroup,{grpContact:ChmPhn})
                      );
                      const ttlGrpMemberss = compDtls.data.getGroup.ttlGrpMembers;  
                      const grpNames = compDtls.data.getGroup.grpName; 
                      const owners = compDtls.data.getGroup.owner;   
                      const regNos = compDtls.data.getGroup.regNo;   
                      const signitoryPWs = compDtls.data.getGroup.signitoryPW;    
                      const signitory2Subs = compDtls.data.getGroup.signitory2Sub;       
                    
                      const CrtChm = async () => {
                        if(isLoading){
                          return;
                        }
                        setIsLoading(true);
                        try {
                          await API.graphql(
                          graphqlOperation(createChamaMembers, {
                          input: {
                            MembaId:MmbaID,
                            groupContact: ChmPhn,
                            memberContact: phoneContacts,
                            regNo:regNos,
                            ChamaNMember:ChmPhnNphoneContacts,
                            memberNatId: nationalidsss,
                            GrossLnsGvn:0,
                            LonAmtGven: 0,
                            AmtRepaid:0,
                            LnBal: 0,
                            NonLoanAcBal: 0,
                            ttlNonLonAcBal: 0,
                            groupName:grpNames,
                            memberName:namess,
                            AcStatus: "AccountActive",
                            loanStatus: "NoLoan",
                            blStatus: "AccountNotBL",
                            owner: owners,
                            
                                  },
                                }),
                              );
                              
                            } catch (error) {
                              if (error){
                                Alert.alert("Error! Access denied!")
                                return}
                            
                            }
                            await updtActAdm();
                            setIsLoading(false);
                            
                          };
                          
          
                     if (pword !== signitoryPWs)
                          {Alert.alert("Wrong Signitory password");
                        return;
                      } 

                      else  if (userInfo.attributes.sub !== owners && signitory2Subs !== userInfo.attributes.sub)
                      {Alert.alert("You are neither the author nor signatory of this Chama")
                      return;}
                      
                      else {
                        CrtChm();
                      }
                
                          const updtActAdm = async()=>{
                            if(isLoading){
                              return;
                            }
                            setIsLoading(true);
                            try{
                                await API.graphql(
                                  graphqlOperation(updateCompany,{
                                    input:{
                                      AdminId:"BaruchHabaB'ShemAdonai2",
                                      ttlActiveChmUsers:parseFloat(ttlActiveChmUserss) + 1,
                                    }
                                  })
                                )
                            }
                            catch(error){
                              if(error){
                                Alert.alert("Error! Access denied!")
                                return;
                            }
                            }
                            await updtChm();
                            
                            setIsLoading(false);
                          }                       
                          const updtChm = async()=>{
                            if(isLoading){
                              return;
                            }
                            setIsLoading(true);
                            try{
                                await API.graphql(
                                  graphqlOperation(updateGroup,{
                                    input:{
                                      grpContact:ChmPhn,
                                      ttlGrpMembers:parseFloat(ttlGrpMemberss) + 1,
                                    }
                                  })
                                )
                            }
                            catch(error){
                              if(error){
                                Alert.alert("Error! Access denied!")
                                return;
                            }
                            }
                            Alert.alert("Congrats " + userInfo.username + ", You have added " + namess +" to " +grpNames)
                            setIsLoading(false);
                          }
                          
          
          
            }          
            
            
            catch(e){
              console.log(e)
              if(e){
                Alert.alert("Error! Access denied!")
                return;
            }
            }
                        setIsLoading(false)
                        
            };
              
               await gtChmDtls();

            
              
      }
      
      catch(e){
        console.log(e)
        if(e){
          Alert.alert("Error! Access denied!")
          return;
      }
      }
                  setIsLoading(false)
                  setChmPhn('');
                  setPW('');
                  setPhoneContacts("")
                  setChmDesc("")
                  setChmNm("")
                  setMmbaID("")
      };
        
         await gtCompDtls();
        
        } catch (e) {
          console.error(e);
          if (e){Alert.alert("User does not exist")
        return}
        }
      }
    
      useEffect(() =>{
        const MmbaIDs=MmbaID
          if(!MmbaIDs && MmbaIDs!=="")
          {
            setMmbaID("");
            return;
          }
          setMmbaID(MmbaIDs);
          }, [MmbaID]
           );
           
           useEffect(() =>{
        const phoneContactss=phoneContacts
          if(!phoneContactss && phoneContactss!=="")
          {
            setPhoneContacts("");
            return;
          }
          setPhoneContacts(phoneContactss);
          }, [phoneContacts]
           );

      useEffect(() =>{
        const ChmNms=ChmNm
          if(!ChmNms && ChmNms!=="")
          {
            setChmNm("");
            return;
          }
          setChmNm(ChmNms);
          }, [ChmNm]
           );

           useEffect(() =>{
            const ChmDescs=ChmDesc
              if(!ChmDescs && ChmDescs!=="")
              {
                setChmDesc("");
                return;
              }
              setChmDesc(ChmDescs);
              }, [ChmDesc]
               );

useEffect(() =>{
  const ChmPhns=ChmPhn
    if(!ChmPhns && ChmPhns!=="")
    {
      setChmPhn("");
      return;
    }
    setChmPhn(ChmPhns);
    }, [ChmPhn]
     );

     useEffect(() =>{
      const pws=pword
        if(!pws && pws!=="")
        {
          setPW("");
          return;
        }
        setPW(pws);
        }, [pword]
         );
        
          return (
            <View>
              <View
                 style={styles.image}>
                <ScrollView>
           
                  <View style={styles.loanTitleView}>
                    <Text style={styles.title}>Fill Chama Details Below</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                    placeholder="+2547xxxxxxxx"
                      value={ChmPhn}
                      onChangeText={setChmPhn}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Chama Phone Number</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput
                    placeholder="Member Email"
                      value={phoneContacts}
                      onChangeText={setPhoneContacts}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Member Email</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput
                     
                      value={MmbaID}
                      onChangeText={setMmbaID}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Member Chama Number</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={pword}
                      onChangeText={setPW}
                      secureTextEntry = {true}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Chama Pass Word</Text>
                  </View>

                  

                 
        
                  <TouchableOpacity
                    onPress={ChckUsrExistence}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Add Chama Member
                    </Text>
                    {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default AddChmMmbrs;