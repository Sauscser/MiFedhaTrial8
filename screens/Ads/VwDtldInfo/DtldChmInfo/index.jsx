import React, {useState, useRef,useEffect} from 'react';
import {View, Text, Pressable, FlatList, Alert} from 'react-native';

import { API, graphqlOperation, Auth } from 'aws-amplify';
import LnerStts from "../../../../components/Ads/DetailedChmPrfl";
import styles from './styles';

import { useRoute } from '@react-navigation/core';

import { listGroups } from '../../../../src/graphql/queries';

const FetchSMCovLns = props => {

    const[LneePhn, setLneePhn] = useState(null);
    const [loading, setLoading] = useState(false);
    const [Loanees, setLoanees] = useState([]);
    const route = useRoute()

    const fetchUser = async () => {
        const userInfo = await Auth.currentAuthenticatedUser();
              
        setLneePhn(userInfo.attributes.email);
             
      };
      
  
      useEffect(() => {
          fetchUser();
        }, []);

        const fetchLoanees = async () => {
            setLoading(true);
            try {
              const Lonees:any = await API.graphql(graphqlOperation(listGroups, 
               { filter: {
                    and: {
                      grpContact: { contains: route.params.grpContact},
                      
                    }
                    },
                  
                  limit: 100
                }
                 
                  ));

                  setLoanees(Lonees.data.listGroups.items);

              
            } catch (e) {
              console.log(e);
            } finally {
              setLoading(false);
            }
          };

          useEffect(() => {
            fetchLoanees();
          }, []);
        
          

  return (
    <View style={styles.root}>
      <FlatList
      style= {{width:"100%"}}
        data={Loanees}
        renderItem={({item}) => <LnerStts SMAc={item} />}
        keyExtractor={(item, index) => index.toString()}
        onRefresh={fetchLoanees}
        refreshing={loading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponentStyle={{alignItems: 'center'}}
        ListHeaderComponent={() => (
          <>
            
            <Text style={styles.label}> Chama Detailed Info</Text>
            <Text style={styles.label}> (Please swipe down to reload)</Text>
          </>
        )}
      />
    </View>
  );
};

export default FetchSMCovLns;