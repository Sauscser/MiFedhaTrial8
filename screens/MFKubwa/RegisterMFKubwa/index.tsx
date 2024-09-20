import React, {useEffect, useState} from 'react';

import {createSAgent, updateCompany, updateMFKOfferz, updateSMAccount} from '../../../src/graphql/mutations';

import {Auth, DataStore, graphqlOperation, API} from 'aws-amplify';

import {useNavigation, useRoute} from '@react-navigation/native';

import {
  View,
  Text,
  ImageBackground,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import styles from './styles';
import { getCompany, getMFKOfferz, getSMAccount, listSMAccounts } from '../../../src/graphql/queries';

const RegisterMFKubwaAcForm = props => {
  const [nationalId, setNationalid] = useState("");
  const [nam, setName] = useState("");
  const [phoneContact, setPhoneContact] = useState("");
  const[eml, setEml] =useState("");

  const [pword, setPW] = useState("");
  const [BkName, setBkName] = useState('');
  const [BkAcNu, setBkAcNu] = useState('');
  const[isLoading, setIsLoading] = useState(false);
  const route = useRoute();



  
  const gtCompDtls = async () =>{
    if(isLoading){
      return;
    }
    setIsLoading(true);
    const userInfo = await Auth.currentAuthenticatedUser();   
    

    try{
        const compDtls :any= await API.graphql(
          graphqlOperation(getCompany,{AdminId:"BaruchHabaB'ShemAdonai2"})
        );
        const actvAKbwa = compDtls.data.getCompany.ttlKFKbwActv


        const ChckPhnUse = async () => {
          try {
            const UsrDtlss:any = await API.graphql(
              graphqlOperation(listSMAccounts,
                { filter: {
                    
                  awsemail: { eq: userInfo.attributes.email}
                                
                  }}
              )
            )

            const ChckUsrExistence = async () => {
              try {
                const UsrDtls:any = await API.graphql(
                  graphqlOperation(getSMAccount, 
                    { 
                      awsemail:userInfo.attributes.email
                    }
                  )
                )
                const nationalidssss = UsrDtls.data.getSMAccount.nationalid
                const owner = UsrDtls.data.getSMAccount.owner
                const TtlClrdLonsAmtSllrCovs = UsrDtls.data.getSMAccount.TtlClrdLonsAmtSllrCov

                const fetchMFKOffer = async () => {
                  try {
                    const UsrDtlsz:any = await API.graphql(
                      graphqlOperation(getMFKOfferz, 
                        { 
                          id:route.params.idz
                        }
                      )
                    );
                    const offerStatus = UsrDtlsz.data.getMFKOfferz.offerStatus
                    const acCost = UsrDtlsz.data.getMFKOfferz.acCost
                    const amtPaid = UsrDtlsz.data.getMFKOfferz.amtPaid

                    const mfnOffered = UsrDtlsz.data.getMFKOfferz.mfnOffered
                    const acChamp = UsrDtlsz.data.getMFKOfferz.acChamp
                    const mfkAc = UsrDtlsz.data.getMFKOfferz.mfkAc
                    const acMainAc = UsrDtlsz.data.getMFKOfferz.acMainAc
                  

            const CreateNewSA = async () => {
              if(isLoading){
                return;
              }
              setIsLoading(true);
              try {
                await API.graphql(
                  graphqlOperation(createSAgent, {
                    input: {
                      
                      saNationalid: nationalidssss,
                      name: nam,
                      saPhoneContact: acMainAc,
                      pw: pword,
                      TtlEarnings: 0,
                      bankName:BkAcNu,
                      mfnTtl:mfnOffered,
                      bkAcNo:BkName,
                      offerStatus: offerStatus,
                      cost: acCost,
                      costBal: amtPaid,
                      acChamp:acChamp,
                      actvMFNdog:0,
                      InctvMFNdog:0,
                      email: mfkAc,
                      saBalance: 0,   
                      status: 'AccountActive',
                      owner:userInfo.attributes.sub,
                      MFKWithdrwlFee:0
                    },
                  }),
                );
    
                
              } 
    
              catch (error) {
                console.log(error)
                if (error){
                  Alert.alert("Error! Access denied!")
                  return
                }
              }
              setIsLoading(false); 
              await  updtActAdm();              
            };



            if (userInfo.attributes.sub !== owner)
                           {Alert.alert ("Please first create main account")}
                           else if(0 >= TtlClrdLonsAmtSllrCovs){
          Alert.alert("Please first purchase this account");
          return;
        } 
        else if (pword.length<8)
        {Alert.alert("Password is too short; at least eight characters");
      return;
    }

    

   else {
          CreateNewSA();
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
                        ttlKFKbwActv:parseFloat(actvAKbwa) + 1,
                      }
                    })
                  )
              }
              catch(error){if(error){
                Alert.alert("Error!")
                return
              }}
              await updtSMAc();
              setIsLoading(false);
            }

            const updtSMAc = async()=>{
              if(isLoading){
                return;
              }
              setIsLoading(true);
              try{
                  await API.graphql(
                    graphqlOperation(updateSMAccount,{
                      input:{
                        awsemail:userInfo.attributes.email,
                        TtlClrdLonsAmtSllrCov:parseFloat(TtlClrdLonsAmtSllrCovs) - 1,
                      }
                    })
                  )
              }
              catch(error){if (error) {
                console.log(error)
                Alert.alert("Error!")
                return;
              }}
              await updtMFKOffer();
              setIsLoading(false);
            }

            const updtMFKOffer = async()=>{
              if(isLoading){
                return;
              }
              setIsLoading(true);
              try{
                  await API.graphql(
                    graphqlOperation(updateMFKOfferz,{
                      input:{
                        id:route.params.idz,
                        status:"AccountInactive"
                      }
                    })
                  )
              }
              catch(error){if (error) {
                console.log(error)
                Alert.alert("Error!")
                return;
              }}
              Alert.alert("MFKubwa Account registered successfully")   
              setIsLoading(false);
            }

           
            
          } catch (e) {
            if(e){Alert.alert("Error!")
          return}
            console.error(e);
          }
        }
         
        await fetchMFKOffer();
      
      } catch (e) {
            if(e){Alert.alert("Error!")
          return}
            console.error(e);
          }
        }
         
        await ChckUsrExistence();
      
      } catch (e) {
            if(e){Alert.alert("Error!")
          return}
            console.error(e);
          }
        }

        await ChckPhnUse();

        



       
      }

  catch(e){
    if(e){
      Alert.alert("Please ensure all details are filled correctly")
      return
    }
  }
          setIsLoading(false);
          setNationalid('');
          setPW("");
          setName("");
          setEml("");
          setPhoneContact("");
          setBkAcNu("");
          setBkName("");
};

useEffect(() =>{
  const BkNames=BkName
    if(!BkNames && BkNames!=="")
    {
      setBkName("");
      return;
    }
    setBkName(BkNames);
    }, [BkName]
     );

     useEffect(() =>{
      const BkAcNus=BkAcNu
        if(!BkAcNus && BkAcNus!=="")
        {
          setBkAcNu("");
          return;
        }
        setBkAcNu(BkAcNus);
        }, [BkAcNu]
         );
         
         useEffect(() =>{
  const mfkID=nationalId
    if(!mfkID && mfkID!=="")
    {
      setNationalid("");
      return;
    }
    setNationalid(mfkID);
    }, [nationalId]
     );

     useEffect(() =>{
      const mfkpw=pword
        if(!mfkpw && mfkpw!=="")
        {
          setPW("");
          return;
        }
        setPW(mfkpw);
        }, [pword]
         );

         useEffect(() =>{
          const mfknm=nam
            if(!mfknm && mfknm!=="")
            {
              setName("");
              return;
            }
            setName(mfknm);
            }, [nam]
             );

             useEffect(() =>{
              const mfkeml=eml
                if(!mfkeml && mfkeml!=="")
                {
                  setEml("");
                  return;
                }
                setEml(mfkeml);
                }, [eml]
                 );

                 useEffect(() =>{
                  const mfkphn=phoneContact
                    if(!mfkphn && mfkphn!=="")
                    {
                      setPhoneContact("");
                      return;
                    }
                    setPhoneContact(mfkphn);
                    }, [phoneContact]
                     );
  return (
    <View>
      <View
        
        style={styles.image}>
        <ScrollView>
          <View style={styles.loanTitleView}>
            <Text style={styles.title}>Fill Details Below</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput
              value={nam}
              onChangeText={setName}
              style={styles.sendLoanInput}
              editable={true}></TextInput>
            <Text style={styles.sendLoanText}>MFKubwa Name</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput
              value={BkAcNu}
              onChangeText={setBkAcNu}
              style={styles.sendLoanInput}
              editable={true}></TextInput>
            <Text style={styles.sendLoanText}>Bank Name</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput
              value={BkName}
              onChangeText={setBkName}
              style={styles.sendLoanInput}
              editable={true}></TextInput>
            <Text style={styles.sendLoanText}>Bank Ac Number</Text>
          </View>

          <View style={styles.sendLoanView}>
            <TextInput
              value={pword}
              onChangeText={setPW}
              secureTextEntry = {true}
              style={styles.sendLoanInput}
              editable={true}></TextInput>
            <Text style={styles.sendLoanText}>MFKubwa Pass Word</Text>
          </View>


          <TouchableOpacity
            onPress={gtCompDtls}
            style={styles.sendLoanButton}>
            <Text style={styles.sendLoanButtonText}>
              Click to Create Account
            </Text>
            {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default RegisterMFKubwaAcForm;