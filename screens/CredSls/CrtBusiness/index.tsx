import React, {useEffect, useState} from 'react';

import {createBizna, createChamaMembers, createGroup,   createPersonel,   updateCompany} from '../../../src/graphql/mutations';
import { getCompany, getSMAccount, listChamasRegConfirms, vwViaPhonss,  } from '../../../src/graphql/queries';
import {Auth,  graphqlOperation, API} from 'aws-amplify';

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



const CreateBiz = (props) => {

  

  const [ChmPhn, setChmPhn] = useState('');
  const [nam, setName] = useState(null);
 
  const [awsEmail, setAWSEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [ChmNm, setChmNm] = useState('');
  const [ChmDesc, setChmDesc] = useState('');
  const [ChmRegNo, setChmRegNo] = useState('');
  const [MmbaID, setMmbaID] = useState('');
  const [Sign2Phn, setSign2Phn] = useState('');

  const WorkerID = "00001"+ChmPhn


  const fetchAcDtls = async () => {
    if(isLoading){
      return;
    }
    setIsLoading(true);
    const userInfo = await Auth.currentAuthenticatedUser();
   
    try {
      const accountDtl:any = await API.graphql(
        graphqlOperation(getSMAccount, {awsemail: userInfo.attributes.email}),
      );

  
      const owners = accountDtl.data.getSMAccount.owner;
      const nationalid = accountDtl.data.getSMAccount.nationalid

      const CreateNewSMAc = async () => {
        if(isLoading){
          return;
        }
        setIsLoading(true);
        const userInfo = await Auth.currentAuthenticatedUser();
      
     
        try {
          await API.graphql(
          graphqlOperation(createBizna, {
          input: {
           
            BusKntct:ChmPhn,
            busName: ChmNm,
            pw: pword,
            email: userInfo.attributes.email,
            owner2email:userInfo.attributes.email,
            TtlEarnings: 0,
            earningsBal: 0,
            netEarnings:0,
            description: ChmDesc,
            licenseNo: Sign2Phn,
            bizType:"bizType",
            status: "AccountActive",
            owner: userInfo.attributes.sub,
            noBL:0
                  },
                })
                
                ,
              );

              
              
            } catch (error) {
              if (error){
                Alert.alert("Creation unsuccessful; Retry")
                return
              }
            
            }
            await onCreateNewSMAc();
            
                     };

                     const onCreateNewSMAc = async () => {
                      if(isLoading){
                        return;
                      }
                      setIsLoading(true);
                      try {
                        await API.graphql(
                        graphqlOperation(createPersonel, {
                        input: {
                          BusinessRegNo: ChmPhn,
                          phoneKontact:userInfo.attributes.email,
                          name: userInfo.username,
                          workerId: WorkerID,
                          workId:"00001",
                          email: userInfo.attributes.email,
                          nationalid:nationalid,
                          BiznaName:ChmNm,
                          ownrsss: owners,
                                },
                              }),
                            );
                            
                          } catch (error) {
                            if (error){
                              Alert.alert("Error: possible this Business Phone exists here")
                              return
                            }
                          
                          }
                          Alert.alert("Business and owner accounts successfully created")
                          
                          setIsLoading(false);
                          
                          
                        };

                     if (pword.length < 8)
          {Alert.alert("password is too short; at least eight characters");
        
      } 
      
     else if (userInfo.attributes.sub !== owners)
    {Alert.alert ("Please first create main account")}
    else{
                           await CreateNewSMAc();}

        }

        catch (e) {
          console.log(e)
          if (e){Alert.alert("Check your Details")
          return;}
              
         }       
         setIsLoading(false);
         setChmPhn('');
         setPW('');
         setAWSEmail("")
         setChmDesc("")
         setChmNm("")
         setChmRegNo("")
         setMmbaID("")
         setSign2Phn(""); 
      }; 
          
    
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
        const ChmRegNos=ChmRegNo
          if(!ChmRegNos && ChmRegNos!=="")
          {
            setChmRegNo("");
            return;
          }
          setChmRegNo(ChmRegNos);
          }, [ChmRegNo]
           );
           
           useEffect(() =>{
        const awsEmails=awsEmail
          if(!awsEmails && awsEmails!=="")
          {
            setAWSEmail("");
            return;
          }
          setAWSEmail(awsEmails);
          }, [awsEmail]
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

         useEffect(() =>{
          const Sign2Phns=Sign2Phn
            if(!Sign2Phns && Sign2Phns!=="")
            {
              setSign2Phn("");
              return;
            }
            setSign2Phn(Sign2Phns);
            }, [Sign2Phn]
             );

        
          return (
            <View>
              <View
                 style={styles.image}>
                <ScrollView>
           
                  <View style={styles.loanTitleView}>
                    <Text style={styles.title}>Fill Business Details Below</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                     placeholder="+2547xxxxxxxx"
                      value={ChmPhn}
                      onChangeText={setChmPhn}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Business Phone</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={ChmNm}
                      onChangeText={setChmNm}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Business Name</Text>
                  </View>

                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={Sign2Phn}
                      onChangeText={setSign2Phn}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Registration/License Number</Text>
                  </View>

        
                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={pword}
                      onChangeText={setPW}
                      secureTextEntry = {true}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Business Pass Word</Text>
                  </View>

                  <View style={styles.sendAmtViewDesc}>
                    <TextInput
                      value={ChmDesc}
                      multiline={true}
                      onChangeText={setChmDesc}
                      style={styles.sendAmtInputDesc}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Business Description</Text>
                  </View>

        
                  <TouchableOpacity
                    onPress={fetchAcDtls}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Register Business
                    </Text>
                    {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default CreateBiz;