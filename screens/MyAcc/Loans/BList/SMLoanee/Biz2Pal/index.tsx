import React, {useEffect, useState} from 'react';

import {updateBizna, updateCompany, updateSMAccount, updateSMLoansCovered, } from '../../../../../../src/graphql/mutations';
import {getBizna, getCompany, getSMAccount, getSMLoansCovered } from '../../../../../../src/graphql/queries';
import {graphqlOperation, API, Auth} from 'aws-amplify';

import {useNavigation, useRoute} from '@react-navigation/native';
import Communications from 'react-native-communications';

import {
  View,
  Text,
  ImageBackground,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import styles from './styles';


  


const BLSMCovLoanee = (props) => {
  const navigation = useNavigation();

  const [LonId, setLonId] = useState("");
  
  const[isLoading, setIsLoading] = useState(false);
  const route = useRoute()
  

 
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
        const ttlSMLnsInBlAmtCovs = compDtls.data.getCompany.ttlSMLnsInBlAmtCov
        const ttlSMLnsInBlTymsCovs = compDtls.data.getCompany.ttlSMLnsInBlTymsCov
        const userClearanceFees = compDtls.data.getCompany.userClearanceFee
        const ttlBLUsrss = compDtls.data.getCompany.ttlBLUsrs

        const gtLoanDtls = async () =>{
          if(isLoading){
            return;
          }
          setIsLoading(true);
          try{
            const compDtls :any= await API.graphql(
              graphqlOperation(getSMLoansCovered,{id:route.params.id})
              );
              const loaneeEmail = compDtls.data.getSMLoansCovered.loaneeEmail
              const loanerEmail = compDtls.data.getSMLoansCovered.loanerEmail
              const amountexpecteds = compDtls.data.getSMLoansCovered.amountexpected
              const lonBala = compDtls.data.getSMLoansCovered.lonBala
              
              const amountrepaids = compDtls.data.getSMLoansCovered.amountrepaid
              const dfltUpdate = compDtls.data.getSMLoansCovered.dfltUpdate
              const dfltUpdates = compDtls.data.getSMLoansCovered.dfltUpdate
              const dfltDeadLn = compDtls.data.getSMLoansCovered.dfltDeadLn
              
              const interest = compDtls.data.getSMLoansCovered.interest
              const statussxzs = compDtls.data.getSMLoansCovered.status
              
              const amountExpectedBackWthClrncs = compDtls.data.getSMLoansCovered.amountExpectedBackWthClrnc
              
              const crtnDate = compDtls.data.getSMLoansCovered.crtnDate
              const DefaultPenaltySMs = compDtls.data.getSMLoansCovered.DefaultPenaltySM
              const ClrnceCosts = parseFloat(userClearanceFees) * parseFloat(amountexpecteds)
              const amountExpectedBackWthClrncss = parseFloat(userClearanceFees) * parseFloat(amountexpecteds) 
              + parseFloat(amountExpectedBackWthClrncs) + parseFloat(DefaultPenaltySMs)
              const LonBal = amountExpectedBackWthClrncss - parseFloat(amountrepaids)

              const createdAt = compDtls.data.getSMLoansCovered.createdAt;
              const repaymentPeriod = compDtls.data.getSMLoansCovered.repaymentPeriod;
              
              
              const today = new Date();
              let hours = (today.getHours() < 10 ? '0' : '') + today.getHours();
              let minutes = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
              let seconds = (today.getSeconds() < 10 ? '0' : '') + today.getSeconds();
              let years = (today.getFullYear() < 10 ? '0' : '') + today.getFullYear();
              let months = (today.getMonth() < 10 ? '0' : '') + today.getMonth();
              let months2 = parseFloat(months)
              let days = (today.getDate() < 10 ? '0' : '') + today.getDate();
              
              const now:any = years+ "-"+ "0"+months2 +"-"+ days+"T"+hours + ':' + minutes + ':' + seconds;

              const now1:any = "2024-05-20";
             
              
              
              
              

        
              const curYrs = parseFloat(years)*365;
              const curMnths = (months2)*30.4375;
              const daysUpToDate = curYrs + curMnths + parseFloat(days)

              

              let charz = createdAt;
              let char1z = charz.charAt(0)
              let char2z = charz.charAt(1)
              let char3z = charz.charAt(2)
              let char4z = charz.charAt(3)
              let char5z = charz.charAt(4)
              let char6z = charz.charAt(5)
              let char7z = charz.charAt(6)
              let char8z = charz.charAt(7)
              let char9z = charz.charAt(8)
              let char10z = charz.charAt(9)
              let char11z = charz.charAt(10)
              let char12z = charz.charAt(11)
              let char13z = charz.charAt(12)

              
              let crtnYrz = char1z+char2z+char3z+char4z;
              let crtnMnthz = char6z+char7z;
              let crtnDyz = char9z+char10z;
              let crtnHrz = char12z+char13z;
              const crtnYearsz = parseFloat(crtnYrz)*365;
              const crtnMnthsz = parseFloat(crtnMnthz)*30.4375;
              const daysAtCrtnz = crtnYearsz + crtnMnthsz + parseFloat(crtnDyz)

              const tmDif = daysUpToDate - dfltUpdates;
              const tmDif2 = daysUpToDate - crtnDate;
              
              const lglGrcePrd = 60 - tmDif;

              const LonBal1 = LonBal*Math.pow((1 + parseFloat(interest)/100), tmDif/30);

              
              const gtLoanerDtls = async () =>{
                if(isLoading){
                  return;
                }
                setIsLoading(true);
                try{
                  const compDtls2 :any= await API.graphql(
                    graphqlOperation(getBizna,{BusKntct:loanerEmail})
                    );

                    const busName =compDtls2.data.getBizna.busName;
                    
                    
                    const gtLoaneeDtls = async () =>{
                      if(isLoading){
                        return;
                      }
                      setIsLoading(true);
                      try{
                        const compDtls :any= await API.graphql(
                          graphqlOperation(getSMAccount,{awsemail:loaneeEmail})
                          );
                          const TtlBLLonsTmsLneeCovs = compDtls.data.getSMAccount.TtlBLLonsTmsLneeCov
                          const TtlBLLonsAmtLneeCovs = compDtls.data.getSMAccount.TtlBLLonsAmtLneeCov
                          const TtlActvLonsAmtLneeCovs = compDtls.data.getSMAccount.TtlActvLonsAmtLneeCov
                          const acStatusss = compDtls.data.getSMAccount.acStatus
                          const namess = compDtls.data.getSMAccount.name
                          const MaxTymsBLs =compDtls.data.getSMAccount.MaxTymsBL;
                          const phonecontact =compDtls.data.getSMAccount.phonecontact;
                          
                          const updateLoanerDtls = async () => {
                            if(isLoading){
                              return;
                            }
                            setIsLoading(true);
                            try{
                                await API.graphql(
                                  graphqlOperation(updateBizna,{
                                    input:{
                                      BusKntct:loanerEmail,
                                      
                                    }
                                  })
                                )
                        
                                
                            }
                            catch(error){if (error){
                              Alert.alert("Blacklisting unsuccessful; Retry")
                              return
                            }
                      }

                            setIsLoading(false);          
                            await updtActAdm ();
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
                                          ttlSMLnsInBlAmtCov: (parseFloat(ttlSMLnsInBlAmtCovs) + (parseFloat(userClearanceFees) * parseFloat(amountexpecteds))).toFixed(2),
                                          ttlSMLnsInBlTymsCov: parseFloat(ttlSMLnsInBlTymsCovs) + 1,
                                          ttlBLUsrs:parseFloat(ttlBLUsrss) + 1,
                                        }
                                      })
                                    )
                                }
                                catch(error){
                                  console.log(error)
                                  if(error){
                                  Alert.alert("Error!")
                                  return;
                              }}
                              await updateLoaneeDtls();
                              setIsLoading(false);
                              }
                              
                              const updateLoaneeDtls = async () => {
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                try{
                                    await API.graphql(
                                      graphqlOperation(updateSMAccount,{
                                        input:{
                                          awsemail:loaneeEmail,
                                          TtlBLLonsTmsLneeCov: parseFloat(TtlBLLonsTmsLneeCovs) + 1,
                                          MaxTymsBL: parseFloat(MaxTymsBLs) + 1,
                                          TtlBLLonsAmtLneeCov: (parseFloat(TtlBLLonsAmtLneeCovs) + amountExpectedBackWthClrncss).toFixed(0),
                                          TtlActvLonsAmtLneeCov: (parseFloat(TtlActvLonsAmtLneeCovs) + (parseFloat(userClearanceFees) * parseFloat(amountexpecteds))).toFixed(0),
                                          blStatus:"AccountBlackListed",
                                          loanStatus: "LoanActive"
                                        }
                                      })
                                    )
                            
                                    
                                }
                                catch(error){
                                  if (error){
                                    Alert.alert("Blacklisting unsuccessful; Retry")
                                    return
                                  } }
                              await updateLoanDtls();
                                setIsLoading(false);          
                              } 

                              const updateLoanDtls = async () => {
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                try{
                                    await API.graphql(
                                      graphqlOperation(updateSMLoansCovered, {
                                        input:{
                                          id:route.params.id,
                                          amountExpectedBackWthClrnc:(amountExpectedBackWthClrncss).toFixed(0),
                                          lonBala:LonBal1.toFixed(0),
                                          DefaultPenaltySM2:DefaultPenaltySMs.toFixed(0),
                                          status:"LoanBL",
                                          dfltUpdate:daysUpToDate
                                        }
                                      })
                                    )
                            
                                    
                                }
                                catch(error){
                                  console.log(error)
                                  if(error){
                                  Alert.alert("Error!")
                                  return;
                              } 
                               }
                              Alert.alert(namess +", you have blacklisted "+ namess);
                              Communications.textWithoutEncoding(phonecontact,'Hi '
                              + namess + ', your loan of ID ' 
                              +  route.params.id 
                              + ' has been blacklisted by '+ busName 
                              + '. The following is a breakdown of your repayable loan. Loan balance before blacklisting was Ksh. '
                            + lonBala + '. Default Penalty as you had agreed with your loaner is Ksh. ' + DefaultPenaltySMs 
                            + '. Clearance fee is Ksh. ' + ClrnceCosts + '. Total current loan repayable is Ksh. ' + LonBal1
                             +'. For clarification call the Business Owner: '
                            + userInfo.attributes.phone_number + '. Thank you. MiFedha');
                                setIsLoading(false);          
                              } 

                              const updateLoanerDtls2 = async () => {
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                try{
                                    await API.graphql(
                                      graphqlOperation(updateBizna,{
                                        input:{
                                          BusKntct:loanerEmail,
                                          
                                        }
                                      })
                                    )
                            
                                    
                                }
                                catch(error){if (error){
                                  Alert.alert("Blacklisting unsuccessful; Retry")
                                  return
                                }
                          }
    
                                setIsLoading(false);          
                                await updtActAdm2 ();
                              } 
                              
                              if(LonBal === 0){
                                Alert.alert("Loanee has cleared this loan")
                              }
    
                              
    
                              
                             
    
                              else if(acStatusss === "AccountInactive"){
                                Alert.alert("Loanee account has been deactivated")
                              } 

                              else if(dfltDeadLn === 0){
                                Alert.alert("Default deadline was 0; you cant Penalise")
                              } 

                              else if(tmDif2 > dfltDeadLn && statussxzs !== "LoanBL"){
                                updateLoanerDtls()
                              } 
    
                              else if(tmDif > 30 && statussxzs === "LoanBL"){
                                updateLoanerDtls2()
                              } 
    
                              else {Alert.alert("Time to Blacklist/Penalise is not yet")}
                              
                      
                              const updtActAdm2 = async()=>{
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                    try{
                                        await API.graphql(
                                          graphqlOperation(updateCompany,{
                                            input:{
                                              AdminId:"BaruchHabaB'ShemAdonai2",
                                              ttlSMLnsInBlAmtCov: (parseFloat(ttlSMLnsInBlAmtCovs) + (parseFloat(userClearanceFees) * parseFloat(amountexpecteds))).toFixed(2),
                                              ttlSMLnsInBlTymsCov: parseFloat(ttlSMLnsInBlTymsCovs) + 1,
                                              ttlBLUsrs:parseFloat(ttlBLUsrss) + 1,
                                            }
                                          })
                                        )
                                    }
                                    catch(error){
                                      console.log(error)
                                      if(error){
                                      Alert.alert("Error!")
                                      return;
                                  }}
                                  await updateLoaneeDtls2();
                                  setIsLoading(false);
                                  }
                                  
                                  const updateLoaneeDtls2 = async () => {
                                    if(isLoading){
                                      return;
                                    }
                                    setIsLoading(true);
                                    try{
                                        await API.graphql(
                                          graphqlOperation(updateSMAccount,{
                                            input:{
                                              awsemail:loaneeEmail,
                                              TtlBLLonsTmsLneeCov: parseFloat(TtlBLLonsTmsLneeCovs) + 1,
                                             
                                              TtlBLLonsAmtLneeCov: (parseFloat(TtlBLLonsAmtLneeCovs) + amountExpectedBackWthClrncss).toFixed(0),
                                              TtlActvLonsAmtLneeCov: (parseFloat(TtlActvLonsAmtLneeCovs) + (parseFloat(userClearanceFees) * parseFloat(amountexpecteds))).toFixed(0),
                                              blStatus:"AccountBlackListed",
                                              loanStatus: "LoanActive"
                                            }
                                          })
                                        )
                                
                                        
                                    }
                                    catch(error){
                                      if (error){
                                        Alert.alert("Blacklisting unsuccessful; Retry")
                                        return
                                      } }
                                  await updateLoanDtls2();
                                    setIsLoading(false);          
                                  } 
    
                                  const updateLoanDtls2 = async () => {
                                    if(isLoading){
                                      return;
                                    }
                                    setIsLoading(true);
                                    try{
                                        await API.graphql(
                                          graphqlOperation(updateSMLoansCovered, {
                                            input:{
                                              id:route.params.id,
                                              amountExpectedBackWthClrnc:(amountExpectedBackWthClrncss).toFixed(0),
                                              lonBala:LonBal1.toFixed(0),
                                              DefaultPenaltySM2:DefaultPenaltySMs.toFixed(0),
                                              status:"LoanBL",
                                              dfltUpdate:daysUpToDate
                                            }
                                          })
                                        )
                                
                                        
                                    }
                                    catch(error){
                                      console.log(error)
                                      if(error){
                                      Alert.alert("Error!")
                                      return;
                                  } 
                                   }
                                  Alert.alert(namess +", you have blacklisted "+ namess);
                                  Communications.textWithoutEncoding(phonecontact,'Hi '
                                  + namess + ', your loan of ID ' 
                                  +  route.params.id 
                                  + ' has been blacklisted by '+ busName 
                                  + '. The following is a breakdown of your repayable loan. Loan balance before blacklisting was Ksh. '
                                + lonBala + '. Default Penalty as you had agreed with your loaner is Ksh. ' + DefaultPenaltySMs 
                                + '. Clearance fee is Ksh. ' + ClrnceCosts + '. Total current loan repayable is Ksh. ' + LonBal1
                                 +'. For clarification call the Business Owner: '
                                + userInfo.attributes.phone_number + '. Thank you. MiFedha');
                                    setIsLoading(false);          
                                  } 
                              
                        }
            
                        
                        catch(error){
                          console.log(error)
                          if(error){
                          Alert.alert("Error!")
                          
                      
                      return;} }
                        setIsLoading(false);         
                        
                      }
                      await gtLoaneeDtls(); 
                  }
      
                  catch(error){ console.log(error)}
                  setIsLoading(false);         
                  
                }
                await gtLoanerDtls(); 
            }

            catch(error){
              console.log(error)
              if(error){
              Alert.alert("Error!")
              return;              
          } 
           }
            setIsLoading(false);                     
          } 
          await gtLoanDtls();        
            
          } catch (error) {
            console.log(error)
            
            if(error){
              Alert.alert("Error!")
              return;
          };
          }
          
          setIsLoading(false);
          setLonId("") 
        };    

        useEffect(() =>{
          const usId=LonId
            if(!usId && usId!=="")
            {
              setLonId("");
              return;
            }
            setLonId(usId);
            }, [LonId]
             );
        
 return (
            <View>
              <View
                 style={styles.image}>
                <ScrollView>
           
                 
        
                  <TouchableOpacity
                    onPress={gtCompDtls}
                    style={styles.sendLoanButton}>
                    <Text style={styles.sendLoanButtonText}>
                      Click to BlackList 
                    </Text>
                    {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          );
        };
        
        export default BLSMCovLoanee;