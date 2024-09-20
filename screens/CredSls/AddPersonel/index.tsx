import React, {useEffect, useState} from 'react';

import {createBizna, createChamaMembers, createGroup,   createPersonel,   updateCompany} from '../../../src/graphql/mutations';
import { getBizna, getCompany, getSMAccount, listChamasRegConfirms, vwViaPhonss,  } from '../../../src/graphql/queries';
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

export type UserReg = {
  usr:String;
  
}

const CreateChama = (props:UserReg) => {

  const{usr} = props;

  


  const navigation = useNavigation();

  const [ChmPhn, setChmPhn] = useState('');
  const [nam, setName] = useState(null);
  const [phoneContact, setPhoneContact] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [pword, setPW] = useState('');
  const [ChmNm, setChmNm] = useState('');
  const [ChmDesc, setChmDesc] = useState('');
  const [ChmRegNo, setChmRegNo] = useState('');
  const [MmbaID, setMmbaID] = useState('');
  const [Sign2Phn, setSign2Phn] = useState('');


  const WorkerID = ChmDesc+ChmRegNo


    
      const ChckUsrExistence = async () => {
        if(isLoading){
          return;
        }
        setIsLoading(true);
        const userInfo = await Auth.currentAuthenticatedUser();
      
        try {
          const UsrDtls:any = await API.graphql(
            graphqlOperation(getSMAccount, { awsemail:ChmPhn}),
                        
          )

          const nationalidsss = UsrDtls.data.getSMAccount.nationalid;
          const namess = UsrDtls.data.getSMAccount.name;
          const awsemails = UsrDtls.data.getSMAccount.awsemail;
          const owners = UsrDtls.data.getSMAccount.owner;

          const PckBiznaDtls = async () => {
            if(isLoading){
              return;
            }
            setIsLoading(true);
            try {
              const BznaDtls:any = await API.graphql(
                graphqlOperation(getBizna, { BusKntct:ChmRegNo}),
                            
              )
    
              const pws = BznaDtls.data.getBizna.pw;
              const ownerz = BznaDtls.data.getBizna.owner;
              const BiznaNames = BznaDtls.data.getBizna.busName;
              
              
      const onCreateNewSMAc = async () => {
        if(isLoading){
          return;
        }
        setIsLoading(true);
        try {
          await API.graphql(
          graphqlOperation(createPersonel, {
          input: {
            BusinessRegNo: ChmRegNo,
            phoneKontact:ChmPhn,
            name: namess,
            workerId: WorkerID,
            workId:ChmDesc,
            email: awsemails,
            nationalid:nationalidsss,
            BiznaName:BiznaNames,
            ownrsss: owners,
                  },
                }),
              );
              
            } catch (error) {
              if (error){
                Alert.alert("Error! Access denied!")
                return
              }
            
            }
            Alert.alert("Sales Officer added successfully")
            
            setIsLoading(false);
            
            
          };
          if (pws!==pword){
            Alert.alert("Wrong Business password")
          }

          else if (ownerz !== userInfo.attributes.sub ){
            Alert.alert("You are not the owner of this business")
          }
          else{
         
        onCreateNewSMAc();
          }
      } catch (error) {
        
        if (error){Alert.alert("Error! Access denied!")
      return}
      }
  
      setIsLoading(false)
                
    }

    await PckBiznaDtls();
      

    } catch (e) {
      console.error(e);

      if (e){Alert.alert("Error! Access denied!")
    return}
    }

    setIsLoading(false)
              setChmPhn('');
              setPW('');
              
              setChmDesc("")
              setChmNm("")
              setChmRegNo("")
              setMmbaID("")
              setSign2Phn("");
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
                    <Text style={styles.title}>Fill Details Below</Text>
                  </View>
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                     placeholder="Email"
                      value={ChmPhn}
                      onChangeText={setChmPhn}
                     
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Sales Officer Email</Text>
                  </View>

                  
                  
                  <View style={styles.sendLoanView}>
                    <TextInput
                     placeholder="+2547xxxxxxxx"
                      value={ChmRegNo}
                      onChangeText={setChmRegNo}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Business Phone</Text>
                  </View>

                 
        
                  <View style={styles.sendLoanView}>
                    <TextInput
                      value={pword}
                      onChangeText={setPW}
                      secureTextEntry = {true}
                      style={styles.sendLoanInput}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Business PassWord</Text>
                  </View>

                  <View style={styles.sendAmtViewDesc}>
                    <TextInput
                      value={ChmDesc}
                      onChangeText={setChmDesc}
                      style={styles.sendAmtInputDesc}
                      editable={true}></TextInput>
                    <Text style={styles.sendLoanText}>Sales Officer Work ID</Text>
                  </View>

        
                  <TouchableOpacity
                    onPress={ChckUsrExistence}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to Register Sales Officer
                    </Text>
                    {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default CreateChama;