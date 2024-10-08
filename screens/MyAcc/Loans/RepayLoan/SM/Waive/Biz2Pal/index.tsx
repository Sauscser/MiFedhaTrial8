import React, {useEffect, useState} from 'react';
import Communications from 'react-native-communications';
import {
  
  createSMLoansCovered,
  
  createSMLoansNonCovered,
  
  createNonLoans,
  
  updateCompany,
  
  updateSMAccount,
  updateSMLoansCovered,
  updateBizna,
  createLoanRepayments,
  
} from '../../../../../../../src/graphql/mutations';

import {API, Auth, graphqlOperation} from 'aws-amplify';
import {
  
  getBizna,
  getCompany,
  getSMAccount,
  getSMLoansCovered,
  
} from '../../../../../../../src/graphql/queries';

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
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import styles from './styles';


const RepayCovLnsss = props => {

  
  const [SnderPW, setSnderPW] = useState("");
  
  const [amounts, setAmount] = useState("");
  
  const [Desc, setDesc] = useState("");

  const[isLoading, setIsLoading] = useState(false);

  const route = useRoute();
  

  

  

      const ftchCvdSMLn = async () => {
        if(isLoading){
          return;
        }
        setIsLoading(true);
        try {
            const RecAccountDtl:any = await API.graphql(
                graphqlOperation(getSMLoansCovered, {id: route.params.id}),
                );
                const amountExpectedBackWthClrncs =RecAccountDtl.data.getSMLoansCovered.amountExpectedBackWthClrnc; 
                
                const lonBalas =RecAccountDtl.data.getSMLoansCovered.lonBala; 
                const statussssssss =RecAccountDtl.data.getSMLoansCovered.status; 

                const loanerEmail =RecAccountDtl.data.getSMLoansCovered.loanerEmail; 
                const loaneeEmail =RecAccountDtl.data.getSMLoansCovered.loaneeEmail;
                const amountrepaids =RecAccountDtl.data.getSMLoansCovered.amountrepaid; 
                const amountExpectedBacks =RecAccountDtl.data.getSMLoansCovered.amountexpected;
                const ClranceAmt = parseFloat(amountExpectedBackWthClrncs) - parseFloat(amountExpectedBacks); 
                const LonBalsss = parseFloat(amountExpectedBackWthClrncs) - parseFloat(amountrepaids);     
                const loanerPhns =RecAccountDtl.data.getSMLoansCovered.loanerPhn; 
                const loaneePhns =RecAccountDtl.data.getSMLoansCovered.loaneePhn;
                const DefaultPenaltySM2s =RecAccountDtl.data.getSMLoansCovered.DefaultPenaltySM2;

                const fetchSenderUsrDtls = async () => {
                  if(isLoading){
                    return;
                  }
                  setIsLoading(false);
                  const userInfo = await Auth.currentAuthenticatedUser();
                  
                  try {
                    const accountDtl:any = await API.graphql(
                      graphqlOperation(getSMAccount, {awsemail: loaneeEmail}),
                    );
              
                    const SenderUsrBal =accountDtl.data.getSMAccount.balance;
                    const usrPW =accountDtl.data.getSMAccount.pw;
                    const usrAcActvStts =accountDtl.data.getSMAccount.acStatus;
                    const owner =accountDtl.data.getSMAccount.owner;
                    const TtlActvLonsAmtLneeCovs =accountDtl.data.getSMAccount.TtlActvLonsAmtLneeCov;
                    const TtlClrdLonsTmsLneeCovs =accountDtl.data.getSMAccount.TtlClrdLonsTmsLneeCov;
                    const TtlClrdLonsAmtLneeCovs =accountDtl.data.getSMAccount.TtlClrdLonsAmtLneeCov;
                    const TtlBLLonsTmsLneeCovs =accountDtl.data.getSMAccount.TtlBLLonsTmsLneeCov;
                    const TtlBLLonsAmtLneeCovs =accountDtl.data.getSMAccount.TtlBLLonsAmtLneeCov;
                    const names =accountDtl.data.getSMAccount.name;
                  
                    const nonLonLimits =accountDtl.data.getSMAccount.nonLonLimit;
                    const MaxTymsBLs =accountDtl.data.getSMAccount.MaxTymsBL;
      
      const fetchCompDtls = async () => {
        if(isLoading){
          return;
        }
        setIsLoading(true);
        try {
          const CompDtls:any = await API.graphql(
            graphqlOperation(getCompany, {
              AdminId: "BaruchHabaB'ShemAdonai2",
            }),
          );
          
            
          const UsrTransferFee = CompDtls.data.getCompany.userTransferFee;
          const CompPhoneContact = CompDtls.data.getCompany.phoneContact;  
          const ttlSMLnsInClrdAmtCovs = CompDtls.data.getCompany.ttlSMLnsInClrdAmtCov; 
          const ttlSMLnsInClrdTymsCovs = CompDtls.data.getCompany.ttlSMLnsInClrdTymsCov;
          const totalLnsRecovereds = CompDtls.data.getCompany.totalLnsRecovered;
          const companyEarningBals = CompDtls.data.getCompany.companyEarningBal;
          const companyEarnings = CompDtls.data.getCompany.companyEarning;
          const ttlNonLonssRecSMs = CompDtls.data.getCompany.ttlNonLonssRecSM;
          const ttlNonLonssSentSMs = CompDtls.data.getCompany.ttlNonLonssSentSM; 
          const TotalTransacted = parseFloat(amounts)  + parseFloat(UsrTransferFee)*parseFloat(amounts) + ClranceAmt; 
          const maxBLss = CompDtls.data.getCompany.maxBLs;
         
                    
          const fetchRecUsrDtls = async () => {
            if(isLoading){
              return;
            }
            setIsLoading(true);
            try {
                const RecAccountDtl:any = await API.graphql(
                    graphqlOperation(getBizna, {BusKntct: loanerEmail}),
                    );
                    const netEarnings1 =RecAccountDtl.data.getBizna.netEarnings;
                  const TtlEarnings1 =RecAccountDtl.data.getBizna.TtlEarnings;
                  const busName =RecAccountDtl.data.getBizna.busName;


                    const updtSendrAcLonOvr1 = async () =>{
                      if(isLoading){
                        return;
                      }
                      setIsLoading(true);
                      try{
                          await API.graphql(
                            graphqlOperation(updateSMAccount, {
                              input:{
                                awsemail:loaneeEmail,
                                
                               
                                MaxTymsBL: 0,
                              }
                            })
                          )


                      }
                      catch(error){
                        if (error){
                          Alert.alert("Waiving unsuccessful; Retry")
                          return
                        }
                      }
                      setIsLoading(false);
                      await updtSMCvLnLnOver();
                    }

                    const updtSendrAcLonOvr2 = async () =>{
                      if(isLoading){
                        return;
                      }
                      setIsLoading(true);
                      try{
                          await API.graphql(
                            graphqlOperation(updateSMAccount, {
                              input:{
                                awsemail:loaneeEmail,
                                
                               
                                MaxTymsBL: parseFloat(MaxTymsBLs) - 1,
                              }
                            })
                          )


                      }
                      catch(error){
                        if (error){
                          Alert.alert("Waiving unsuccessful; Retry")
                          return
                        }
                      }
                      setIsLoading(false);
                      await updtSMCvLnLnOver();
                    }
                               
                              const updtSMCvLnLnOver  = async () =>{
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                try{
                                    await API.graphql(
                                      graphqlOperation(updateSMLoansCovered, {
                                        input:{
                                          id:route.params.id,
                                          amountrepaid: (parseFloat(amounts) + parseFloat(amountrepaids)).toFixed(0),
                                          lonBala: (parseFloat(lonBalas)-parseFloat(amounts)).toFixed(0),
                                          amountExpectedBackWthClrnc:(parseFloat(amountExpectedBackWthClrncs) - ClranceAmt).toFixed(0),
                                          status: "LoanCleared",
                                          DefaultPenaltySM2:0
                                      }})
                                    )
          
          
                                }
                                catch(error){
                                  console.log(error)
                                  if (error){Alert.alert("Error!")
                                  return;}
                                }
                                setIsLoading(false);
                                await updtRecAcLonOver();
                              }
                              
                              
          
                              
                              const updtRecAcLonOver = async () =>{
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                try{
                                    await API.graphql(
                                      graphqlOperation(updateBizna, {
                                        input:{
                                          BusKntct: loanerEmail,
                                          
                                        }
                                      })
                                    )                              
                                }
                                catch(error){
                                  console.log(error)
                                  if (error){Alert.alert("Error!")
                                  return;}
                                }
                                setIsLoading(false);
                                await updtCompLnOvr();
                              }
          
                              const updtCompLnOvr = async () =>{
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                try{
                                    await API.graphql(
                                      graphqlOperation(updateCompany, {
                                        input:{
                                          AdminId: "BaruchHabaB'ShemAdonai2",                                                      
                                         
                                        }
                                      })
                                    )
                                    
                                    
                                }
                                catch(error){

                                  if (error){
                                    Alert.alert("Waiving unsuccessful; Retry")
                                    return
                                  }
                                  
                                }
                                Alert.alert("Cleared." );
                                Communications.textWithoutEncoding(loaneePhns,'MiFedha. Hi '
                              + names + ', your loan of ID ' 
                              +  route.params.id 
                              + 'has been waived Ksh. ' + amounts + ' by '+ busName 
                              +'. For clarification call the loaner: '
                            + loanerPhns + '. Thank you.');
                        
                        setIsLoading(false);
                        await sendNonLnLnOver();
                              }    
                              
                              const sendNonLnLnOver = async () => {
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true)
                                try {
                                  await API.graphql(
                                    graphqlOperation(createLoanRepayments, {
                                      input: {
                                        senderPhn: loaneeEmail,
                                        recPhn: loanerEmail,     
                                        RecName:busName,
                                        SenderName:names,      
                                        loanId1: route.params.id,    
                                        
                                        loanId2: "route.params.id",
                                        loanId3: "route.params.id",                     
                                        amount: parseFloat(amounts).toFixed(0),                              
                                        description: Desc,
                                        status: "Waived",
                                        owner: userInfo.attributes.sub
                                      },
                                    }),
                                  );
          
          
                                } catch (error) {
                                  if (error){
                                    Alert.alert("Error!; Retry")
                                    return
                                  }
                                }
                                setIsLoading(false);
                                
                              };
                        

                              const repyCovLn = async () =>{
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                try{
                                    await API.graphql(
                                      graphqlOperation(updateSMLoansCovered, {
                                        input:{
                                          id:route.params.id,
                                          amountrepaid: (parseFloat(amounts) + parseFloat(amountrepaids)).toFixed(0),
                                          lonBala: (parseFloat(lonBalas) - parseFloat(amounts)).toFixed(0),
                                          DefaultPenaltySM2:0,
                                          amountExpectedBackWthClrnc:(parseFloat(amountExpectedBackWthClrncs) - ClranceAmt).toFixed(0),
                                        }
                                      })
                                    )
          
          
                                }
                                catch(error){
                                  console.log(error)
                                  if (error){Alert.alert("Error!")
                                  return;}
                                }
                                setIsLoading(false);
                                await updtSendrAc();
                              }
                              
                              
                              const updtSendrAc = async () =>{
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                try{
                                    await API.graphql(
                                      graphqlOperation(updateSMAccount, {
                                        input:{
                                          awsemail:loaneeEmail,
                                          
                                        }
                                      })
                                    )
          
          
                                }
                                catch(error){
                                  console.log(error)
                                  if (error){Alert.alert("Error!")
                                  return;}
                                }
                                setIsLoading(false);
                                await updtRecAc();
                              }
          
                              const updtRecAc = async () =>{
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                try{
                                    await API.graphql(
                                      graphqlOperation(updateBizna, {
                                        input:{
                                          BusKntct: loanerEmail,
                                         
                                        }
                                      })
                                    )                              
                                }
                                catch(error){
                                  console.log(error)
                                  if (error){Alert.alert("Error!")
                                  return;}
                                }
                                setIsLoading(false);
                                await updtComp();
                              }
          
                              const updtComp = async () =>{
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true);
                                try{
                                    await API.graphql(
                                      graphqlOperation(updateCompany, {
                                        input:{
                                          AdminId: "BaruchHabaB'ShemAdonai2",                                                      
                                          
                                        }
                                      })
                                    )
                                    
                                    
                                }
                                catch(error){
                                  if (error){
                                    Alert.alert("Waiving unsuccessful; Retry")
                                    return
                                  }
                                  
                                }
                                Alert.alert("Partially Waived.");
                                Communications.textWithoutEncoding(loaneeEmail,'Hi '
                              + names + ', your loan of ID ' 
                              +  route.params.id 
                              + ' has been partially waived Ksh. ' + amounts + ' by '+ busName 
                              +'. For clarification call the loaner: '
                            + loanerPhns + '. Thank you. MiFedha');
                        
                        setIsLoading(false);
                        await sendNonLnLnOver2()
                              }

                              const sendNonLnLnOver2 = async () => {
                                if(isLoading){
                                  return;
                                }
                                setIsLoading(true)
                                try {
                                  await API.graphql(
                                    graphqlOperation(createLoanRepayments, {
                                      input: {
                                        senderPhn: loaneeEmail,
                                        recPhn: loanerEmail,     
                                        RecName:busName,
                                        SenderName:names,      
                                        loanId1: route.params.id,    
                                        
                                        loanId2: "route.params.id",
                                        loanId3: "route.params.id",                     
                                        amount: parseFloat(amounts).toFixed(0),                              
                                        description: Desc,
                                        status: "Waived",
                                        owner: userInfo.attributes.sub
                                      },
                                    }),
                                  );
          
          
                                } catch (error) {
                                  if (error){
                                    Alert.alert("Error!; Retry")
                                    return
                                  }
                                }
                                setIsLoading(false);
                                
                              };

                                                          
                                                    
                              
                              if (userInfo.attributes.sub!==owner) {
                                Alert.alert("Please first create a main account")
                                return;
                              }  else if(usrAcActvStts === "AccountInactive"){Alert.alert('Sender account is inactive');
                              return;
                            }
                            
                          else if(ClranceAmt > parseFloat(amounts) ){Alert.alert( "Too little amount waived: at least "+ClranceAmt.toFixed(2));
                            return;
                          }
                            

                          else if(parseFloat(amounts) > parseFloat(lonBalas)){Alert.alert("The Loan Balance is lesser: "+lonBalas)}
                          

                          else if(parseFloat(amounts) === parseFloat(lonBalas)  && parseFloat(MaxTymsBLs) === parseFloat(maxBLss) )
                          {updtSendrAcLonOvr1();}          
                          
                          else if(parseFloat(amounts) === parseFloat(lonBalas)  && parseFloat(MaxTymsBLs) > parseFloat(maxBLss) )
                          {updtSendrAcLonOvr2();}  
                               else {
                                repyCovLn();
                              }
                          }
                          catch (e) {
                            if (e){Alert.alert("Error!")
                            return;}
                        };
                      }
                    
                      await fetchRecUsrDtls();
                                                                                         
                }       
                catch(e) {     
                  if (e){Alert.alert("Error!")
  return;}                 
                }
                setIsLoading(false);
                }                    
                  await fetchCompDtls();
        } catch (e) {
          console.log(e)
          if (e){Alert.alert("Error!")
      return;}
        }
        setIsLoading(false);        
      };
      await fetchSenderUsrDtls();
    
      
    } catch (e) {
      if (e){Alert.alert("Error!")
      return;}
  };
      setIsLoading(false);
      
      setAmount("");
     
    
      setDesc("");
      setSnderPW("");
    
}



     useEffect(() =>{
      const amt=amounts
        if(!amt && amt!=="")
        {
          setAmount("");
          return;
        }
        setAmount(amt);
        }, [amounts]
         );

         
                     useEffect(() =>{
                      const descr=Desc
                        if(!descr && descr!=="")
                        {
                          setDesc("");
                          return;
                        }
                        setDesc(descr);
                        }, [Desc]
                         );

                         useEffect(() =>{
                          const SnderPWss=SnderPW
                            if(!SnderPWss && SnderPWss!=="")
                            {
                              setSnderPW("");
                              return;
                            }
                            setSnderPW(SnderPWss);
                            }, [SnderPW]
                             );

                           

                             

                                 

  return (
    <View>
      <View
        
        style={styles.image}>
        <ScrollView>
         
          <View style={styles.amountTitleView}>
            <Text style={styles.title}>Fill account Details Below</Text>
          </View>

          <View style={styles.sendAmtView}>
            <TextInput
            keyboardType={"decimal-pad"}
              value={amounts}
              onChangeText={setAmount}
              style={styles.sendAmtInput}
              editable={true}
              ></TextInput>
              
            <Text style={styles.sendAmtText}>Amount Waived</Text>
          </View>



         
          <View style={styles.sendAmtViewDesc}>
            <TextInput
              multiline={true}
              value={Desc}
              onChangeText={setDesc}
              style={styles.sendAmtInputDesc}
              editable={true}></TextInput>
            <Text style={styles.sendAmtText}>Description</Text>
          </View>
          
          

          <TouchableOpacity
            onPress={ftchCvdSMLn }
            style={styles.sendAmtButton}>
            <Text style={styles.sendAmtButtonText}>Waive</Text>
            {isLoading && <ActivityIndicator size = "large" color = "blue"/>}
          </TouchableOpacity>

          
        </ScrollView>
      </View>
    </View>
  );
};

export default RepayCovLnsss;