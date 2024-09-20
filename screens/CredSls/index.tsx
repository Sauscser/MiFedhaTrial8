import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  
  Pressable,
  
  SafeAreaView,
  ScrollView,
  
} from 'react-native';
import styles from './styles';

const MyLoanAccount = props => {
  const navigation = useNavigation();
  const[id, setID] =useState("")
  const[ChamaNMember, setChamaNMember] =useState("")


  
  
    

    const ItemAds = () => {
      navigation.navigate('ItemAds');
    };
  
    
    const VwPal2BizLners = () => {
      navigation.navigate('VwPal2BizLners');
    };
  
    const SI2VwBiz2PalLoanees = () => {
      navigation.navigate('SI2VwBiz2PalLoanees');
    };
    const SI2VwBiz2BizLoaners = () => {
      navigation.navigate('SI2VwBiz2BizLoaners');
    };
  
    const SI2VwBiz2BizLoanees = () => {
      navigation.navigate('SI2VwBiz2BizLoanees');
    };
  
    const SI2VwBiz2PalLoaners = () => {
      navigation.navigate('SI2VwBiz2PalLoaners');
    };

    const CrtBusinessss = () => {
      navigation.navigate('CrtBusinesss');
    };

    const DissolveBizsss = () => {
      navigation.navigate('DissolveBizss');
    };

    const SgnIn2VwBiznasss = () => {
      navigation.navigate('SgnIn2VwBiznass');
    };

    const ShareCredSlsRevsss = () => {
      navigation.navigate('ShareCredSlsRevss');
    };

    const AddPersonelss = () => {
      navigation.navigate('AddPersonels');
    };

    const RmvPersonnelsss = () => {
      navigation.navigate('RmvPersonnelss');
    };

    const SgnIn2RemoveSlAd = () => {
      navigation.navigate('SgnIn2RemoveSlAd');
    };

    const ViewBiznaShareRec = () => {
      navigation.navigate('ViewBiznaShareRec');
    };

    const SgnIn2VwRevenueShare = () => {
      navigation.navigate('SgnIn2VwRevenueShare');
    };

    const PayCash = () => {
      navigation.navigate('PayCash');
    };

    const VwPalLners = () => {
      navigation.navigate('VwPalLners');
    };

    const VwCashPaySent = () => {
      navigation.navigate('VwCashPaySent');
    };

    const SgnIn2VwCashSales = () => {
      navigation.navigate('SgnIn2VwCashSales');
    };

    const VwPal2BizLnees = () => {
      navigation.navigate('VwPal2BizLnees');
    };
  
    const VwPalLnees = () => {
      navigation.navigate('VwPalLnees');
    };

    const Vw2GrntPal2Biz = () => {
      navigation.navigate("Vw2GrntPal2Biz");
    };

    const Vw2GrntPal2Pal = () => {
      navigation.navigate('Vw2GrntPal2Pal');
    };

    const PersonelVw2GrntB2P = () => {
      navigation.navigate('PersonelVw2GrntB2P');
    };
  
    const PersonelVw2GrntB2B = () => {
      navigation.navigate('PersonelVw2GrntB2B');
    };
  
    const giveBizna = () => {
      navigation.navigate('giveBizna');
    };

    const TakeOverBizna = () => {
      navigation.navigate('TakeOverBizna');
    };

    const VwBizDpsts = () => {
      navigation.navigate('VwBizDpsts');
    };
    
  

  return (
    <SafeAreaView>
      <ScrollView>
          

            <View style={styles.clientsView}>
              <Text style={styles.salesText}>Manage Business</Text>

              <View style={styles.viewForClientsAndTitle}>
              <View style={styles.viewForClientsCategories}>
                  <Text style={styles.salesPressableText}>BizAc</Text>

                  <View style={styles.viewForClientsPressables}>
                    <Pressable
                      onPress={CrtBusinessss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>Create</Text>
                    </Pressable>

                    <Pressable
                      onPress={DissolveBizsss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                        Dissolve
                      </Text>
                    </Pressable>
                  </View>
                </View>

            

                <View style={styles.viewForClientsCategories}>
                  <Text style={styles.salesPressableText}>Revenue</Text>

                  <View style={styles.viewForClientsPressables}>
                    <Pressable
                      onPress={SgnIn2VwBiznasss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>View</Text>
                    </Pressable>

                    <Pressable
                      onPress={ShareCredSlsRevsss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                       Share
                      </Text>
                    </Pressable>
                  </View>
                </View>

                <View style={styles.viewForClientsCategories}>
                  <Text style={styles.salesPressableText}>Sales Officer</Text>

                  <View style={styles.viewForClientsPressables}>
                    <Pressable
                      onPress={AddPersonelss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>Register</Text>
                    </Pressable>

                    <Pressable
                      onPress={RmvPersonnelsss}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                      DeReg
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>



            <View style={styles.clientsView}>
              <Text style={styles.salesText}>Grant Credit Sales Requests</Text>

              <View style={styles.viewForClientsAndTitle}>
              <View style={styles.viewForClientsCategories7}>
                  
                  <Pressable 
                  onPress={Vw2GrntPal2Pal}
                  
                  style={styles.viewForClientsPressables}>
                  <Text style={styles.salesPressableText}>Pal2Pal</Text>
                  </Pressable>
                </View>

            

                <View style={styles.viewForClientsCategories7}>
                  
                  <Pressable 
                  onPress={Vw2GrntPal2Biz}
                  
                  style={styles.viewForClientsPressables}>
                  <Text style={styles.salesPressableText}>Pal2Biz</Text>

                  </Pressable>
                </View>

                <View style={styles.viewForClientsCategories7}>
                <Pressable 
                onPress={PersonelVw2GrntB2P}
                
                style={styles.viewForClientsPressables}>
                  <Text style={styles.salesPressableText}>Biz2Pal</Text>

                  </Pressable>
                </View>

                <View style={styles.viewForClientsCategories7}>
                <Pressable 
                onPress={PersonelVw2GrntB2B}
                
                style={styles.viewForClientsPressables}>
                  <Text style={styles.salesPressableText}>Biz2Biz</Text>

                  </Pressable>
                </View>


              </View>
            </View>

            

            
            <View style={styles.clientsView}>
              <Text style={styles.salesText}>CreditSales LoanStatus (Biz)</Text>

              <View style={styles.viewForClientsAndTitle}>
              <View style={styles.viewForClientsCategories7}>
                  
                  <Pressable 
                  onPress={SI2VwBiz2PalLoaners}
                  
                  style={styles.viewForClientsPressables}>
                  <Text style={styles.salesPressableText}>BizPal Loaners</Text>
                  </Pressable>
                </View>

            

                <View style={styles.viewForClientsCategories7}>
                  
                  <Pressable 
                  onPress={SI2VwBiz2PalLoanees}
                  
                  style={styles.viewForClientsPressables}>
                  <Text style={styles.salesPressableText}>BizPal Loanees</Text>

                  </Pressable>
                </View>

                <View style={styles.viewForClientsCategories7}>
                <Pressable 
                onPress={SI2VwBiz2BizLoaners}
                
                style={styles.viewForClientsPressables}>
                  <Text style={styles.salesPressableText}>BizBiz Loaners</Text>

                  </Pressable>
                </View>

                <View style={styles.viewForClientsCategories7}>
                <Pressable 
                onPress={SI2VwBiz2BizLoanees}
                
                style={styles.viewForClientsPressables}>
                  <Text style={styles.salesPressableText}>BizBiz Loanees</Text>

                  </Pressable>
                </View>


              </View>
            </View>


            <View style={styles.clientsView}>
              <Text style={styles.salesText}>CreditSales LoanStatus (Pal)</Text>

              <View style={styles.viewForClientsAndTitle}>
              <View style={styles.viewForClientsCategories7}>
                  
                  <Pressable 
                  onPress={VwPalLners}
                  
                  style={styles.viewForClientsPressables}>
                  <Text style={styles.salesPressableText}>PalPal Loaners</Text>
                  </Pressable>
                </View>

            

                <View style={styles.viewForClientsCategories7}>
                  
                  <Pressable 
                  onPress={VwPalLnees}
                  
                  style={styles.viewForClientsPressables}>
                  <Text style={styles.salesPressableText}>PalPal Loanees</Text>

                  </Pressable>
                </View>

                <View style={styles.viewForClientsCategories7}>
                <Pressable 
                onPress={VwPal2BizLners}
                
                style={styles.viewForClientsPressables}>
                  <Text style={styles.salesPressableText}>PalBiz Loaners</Text>

                  </Pressable>
                </View>

                <View style={styles.viewForClientsCategories7}>
                <Pressable 
                onPress={VwPal2BizLnees}
                
                style={styles.viewForClientsPressables}>
                  <Text style={styles.salesPressableText}>PalBiz Loanees</Text>

                  </Pressable>
                </View>


              </View>
            </View>


            <View style={styles.clientsView}>
              <Text style={styles.salesText}>Cash Sales/purchases & Deposits</Text>

              <View style={styles.viewForClientsAndTitle}>
              
                  
                  <Pressable 
                  onPress={PayCash}
                  
                  style={styles.viewForClientsPressables3}>
                  <Text style={styles.salesPressableText}>Pay Cash</Text>
                  </Pressable>
                

            

                
                  
                  <Pressable 
                  onPress={VwCashPaySent}
                  
                  style={styles.viewForClientsPressables3}>
                  <Text style={styles.salesPressableText}>View Purchases</Text>

                  </Pressable>
              
                <Pressable 
                onPress={SgnIn2VwCashSales}
                
                style={styles.viewForClientsPressables3}>
                  <Text style={styles.salesPressableText}>View Sales</Text>

                  </Pressable>
               
                <Pressable 
                onPress={VwBizDpsts}
                
                style={styles.viewForClientsPressables3}>
                  <Text style={styles.salesPressableText}>View Deposits</Text>

                  </Pressable>
                


              </View>
            </View>

            <View style={styles.clientsView5}>
              <Text style={styles.salesText}>BizAdverts and Revenue Sharings</Text>

              <View style={styles.viewForClientsAndTitle}>
             
            

               

                <View style={styles.viewForClientsCategories}>
                  <Text style={styles.salesPressableText}>ViewSharings</Text>

                  <View style={styles.viewForClientsPressables}>
                    <Pressable
                      onPress={SgnIn2VwRevenueShare}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>Bizna </Text>
                    </Pressable>

                    <Pressable
                      onPress={ViewBiznaShareRec}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                      Partner
                      </Text>
                    </Pressable>
                  </View>
                </View>

                <View style={styles.viewForClientsCategories}>
                  <Text style={styles.salesPressableText}>Adverts</Text>

                  <View style={styles.viewForClientsPressables}>
                    <Pressable
                      onPress={ItemAds}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>Make</Text>
                    </Pressable>

                    <Pressable
                      onPress={SgnIn2RemoveSlAd}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                        Delete
                      </Text>
                    </Pressable>
                  </View>
                </View>

                <View style={styles.viewForClientsCategories}>
                  <Text style={styles.salesPressableText}>Ownership</Text>

                  <View style={styles.viewForClientsPressables}>
                    <Pressable
                      onPress={giveBizna}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>Transfer</Text>
                    </Pressable>

                    <Pressable
                      onPress={TakeOverBizna}
                      style={styles.ClientsPressables}>
                      <Text style={styles.clientsPressableText}>
                        Receive
                      </Text>
                    </Pressable>
                  </View>
                </View>

              </View>
            </View>

            

    </ScrollView>
    </SafeAreaView> 
    
  );
};

export default MyLoanAccount;