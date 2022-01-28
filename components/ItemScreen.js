import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Text, Image, TouchableOpacity, View, StatusBar, Dimensions } from 'react-native';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import Data from './Store'
import { useDispatch } from 'react-redux';
import { cardAddAction } from '../redux/Actions';

export default function ItemScreen({navigation}) {
    var card = useSelector(store => store.card)
    var [thisItem, setThisItem] = useState(0)
    var dispatch = useDispatch()
    var itemId = useSelector(store => store.item)
    var [kolicina, setKolocina] = useState(1)
    var [price, setPrice] = useState(Data[itemId].price)


    useEffect(()=>{
        card.map(cardItem =>{
            if(cardItem.id === itemId){
                setThisItem(cardItem.kolicina)
            }
        })
    },[card])

  return (<SafeAreaView style={styles.androidSafe}>
      <View style={styles.header}>
        <Ionicons onPress={()=>{navigation.goBack()}} name="chevron-back-outline" size={24} color="black" />
        <Text style={{fontSize: 18}}>Our product</Text>
        <Text style={{width: 24}}></Text>
      </View>
      <ScrollView style={styles.scrollable}>
          <Image style={styles.image} source={Data[itemId].img} />
          <Text style={styles.naslov}>{Data[itemId].naslov}</Text>
          <Text style={styles.lorem}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur suscipit assumenda culpa laborum cum qui dolores fugiat. Ducimus, quis! Sit, ab sint. Excepturi asperiores totam nam voluptate? Quaerat, enim explicabo.</Text>
      </ScrollView>
      <View style={styles.footer}>
          <Text style={{fontSize: 15}}>This item in bag: <Text style={{fontSize: 17, fontWeight: 'bold'}}>{thisItem}</Text></Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 20}}>
              <View style={{flexDirection: 'row', width: 100, justifyContent: 'space-around', alignItems: 'center', borderWidth: 1, padding: 10, borderRadius: 10, marginTop: 10}}>
                  <TouchableOpacity onPress={()=>{
                          if(kolicina != 1){
                              setKolocina(kolicina => kolicina-1)
                              setPrice(price => Number(price) - Number(Data[itemId].price))
                          }
                          }}>
                     <Ionicons name="ios-remove-outline" size={24} color="black" />
                  </TouchableOpacity>

                  <Text style={styles.number}>{kolicina}</Text>
                  
                  <TouchableOpacity onPress={()=>{
                          setKolocina(kolicina => kolicina+1)
                          setPrice(price => Number(price) + Number(Data[itemId].price))
                          }}>
                      <Ionicons  name="add-outline" size={24} color="black" />
                  </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={()=>{
                  dispatch(cardAddAction({id: itemId,kolicina: kolicina}))
                  setKolocina(1)
                  setPrice( Number(Data[itemId].price))
              }} style={{width: 180,backgroundColor: 'black', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, padding: 10, borderRadius: 10, marginTop: 10}}>
                  <Text style={{color: 'white'}}>Add to Bag <Text style={{fontWeight: 'bold', fontSize: 17}}> { Number(price).toFixed(2)}$</Text></Text>
                </TouchableOpacity>
          </View>
      </View>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    androidSafe: {
    width: 100+'%',
    minHeight: Dimensions.get('window').height,
    backgroundColor: '#f3f3f3',
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header:{
      padding: 10,
      backgroundColor: 'white',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
  },
  image: {
      height: Dimensions.get('window').width - 200,
      width: Dimensions.get('window').width - 10,
      borderRadius: 10,
  }, 
  scrollable: {
      padding: 5,
      paddingVertical: 10,
      maxHeight: Dimensions.get('window').height - 180,
      backgroundColor: '#f3f3f3'
  },
  naslov: {
      fontSize: 25,
      fontWeight: 'bold',
      marginVertical: 10,
      marginHorizontal: 10
  },
  lorem: {
    fontSize: 15,
    marginHorizontal: 10
  },
  footer: {
      height: 110,
      padding: 10,
      backgroundColor: 'white',
      borderWidth: 1,
      borderBottomWidth: 0,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
  },
  plus: {
      fontWeight: 'bold',
      fontSize: 20,
      paddingHorizontal: 5
  },
  number: {
      padding: 0,
      fontWeight: 'bold',
      fontSize: 20,
  }
});