import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar, TouchableOpacity, ScrollView, View, Image, Dimensions, Modal } from 'react-native';
import { Platform } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { cardAddAction } from '../redux/Actions';
import Footer from './Footer';
import Data from './Store'
import { cardRemoveAction, itemAction } from './../redux/Actions';
import { Ionicons, Fontisto } from '@expo/vector-icons';
import MyStore from './MyStore';

export default function BagScreen({ navigation }) {

  var dispatch = useDispatch()
  var card = useSelector(store => store.card)
  var [ukupnaCijena, setUkupnaCijena] = useState(0)

  const getCijena = () => {
    let cijena = 0
    if (card.length !== 0) {
      card.map(cardItem => {
        cijena = cijena + Number(Data[cardItem.id].price) * Number(cardItem.kolicina)
      })
    }
    setTimeout(() => {
      setUkupnaCijena(cijena)
    }, 300);
  }

  useEffect(() => {
    getCijena()
  }, [card])
  let [modalVisible, setModalVisible] = useState(false)

  return (<SafeAreaView style={styles.androidSafe}>
    <Modal
      animationType="slide"
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Ionicons onPress={() => { setModalVisible(false) }} name="chevron-back-outline" size={25} color="black" />
          <Text style={styles.headerText}>Buying...</Text>
          <Text style={{ width: 25 }}></Text>
        </View>
          <ScrollView >
            <View style={styles.infosDiv}>
              <View style={styles.infosDivFirst}>
                <Text style={styles.info}>Youre name: <Text style={styles.infoSecond}>{MyStore.name}</Text></Text>
                <Text style={styles.info}>Youre phone number: <Text style={styles.infoSecond}>{MyStore.number}</Text></Text>
                <Text style={styles.info}>Youre phone number: <Text style={styles.infoSecond}>{ukupnaCijena + ' $'}</Text></Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.changeInfos} onPress={() => { navigation.navigate('Profile') }}>Change you're informations?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.orderBtnTouchable}>
                <Text style={styles.orderBtn}>Order !</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
      </View>
    </Modal>

    <View style={{...styles.header, justifyContent: 'center'}}>
      <Text style={styles.headerText}>Bag</Text>
    </View>

    <View style={styles.podHeader}>
      <Text>Ukupna cijena: <Text style={styles.ukupnaCijena}>{ukupnaCijena + '$'}</Text></Text>
      <TouchableOpacity onPress={() => {
        setModalVisible(true)
      }} style={styles.buyBtn}>
        <Fontisto style={{ marginRight: 10 }} name="shopping-pos-machine" size={24} color="white" />
        <Text style={{ color: 'white' }}>Buy</Text>
      </TouchableOpacity>
    </View>

    <ScrollView style={styles.mainSection}>
      {card.length ? card.map(cardItem => {
        return (<TouchableOpacity onPress={() => {
          dispatch(itemAction(cardItem.id))
          navigation.navigate('Item')
        }} key={cardItem.id} style={styles.item}>
          <Image style={styles.slika} source={Data[cardItem.id].img} />
          <View style={{ marginTop: 5 }}>
            <Text style={styles.naslovItem}>{Data[cardItem.id].naslov}<Text style={styles.naslovPrice}> - {Data[cardItem.id].price}$</Text></Text>
            <View style={styles.itemKolicinaDiv}>
              <View style={styles.itemKolicinaFirst}>
                <TouchableOpacity onPress={() => {
                  dispatch(cardRemoveAction({ id: cardItem.id, kolicina: 1 }))
                }}><Ionicons name="ios-remove-outline" size={24} color="black" /></TouchableOpacity>
                <Text style={styles.kolicina}>{cardItem.kolicina}</Text>
                <TouchableOpacity onPress={() => {
                  dispatch(cardAddAction({ id: cardItem.id, kolicina: 1 }))
                }}><Ionicons name="add-outline" size={24} color="black" /></TouchableOpacity>
              </View>
              <Text style={styles.price}>{Number(Data[cardItem.id].price) * Number(cardItem.kolicina) + ' $'}</Text>
            </View>
          </View>
        </TouchableOpacity>)
      }) : <View style={styles.noItems}><Text>No items in Bag</Text></View>}
    </ScrollView>

    <Footer navigation={navigation} homeS={false} bagS={true} profileS={false} />
    
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  androidSafe: {
    width: 100 + '%',
    minHeight: Dimensions.get('window').height,
    backgroundColor: '#fff',
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  slika: {
    height: 90,
    width: 100,
    borderRadius: 10,
    marginRight: 30
  },
  naslovItem: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  price: {
    fontSize: 15,
    borderRadius: 10,
    borderWidth: 1,
    textAlign: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#f7f7f7',
    marginLeft: 20
  },
  buyBtn: {
    flexDirection: 'row',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#302F2F',
  },
  podHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1
  },
  headerText: {
    fontSize: 18,
  },
  mainSection:{
    backgroundColor: '#f3f3f3', 
    maxHeight: Dimensions.get('window').height - 151 
  },
  infosDiv: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height -73 
  },
  infosDivFirst: {
    borderWidth: 1, 
    paddingTop: 20, 
    width: 90+'%', 
    paddingBottom: 10, 
    paddingHorizontal: 20, 
    margin: 10, 
    marginTop: 0
  },
  info: {
    marginBottom: 10,
    fontSize: 18
  },
  infoSecond: {
    fontWeight: 'bold', 
    fontSize: 20
  },
  changeInfos: {
    marginHorizontal: 5+'%', 
    color: 'blue', 
    alignSelf: 'flex-start' 
  },
  orderBtn: {
    backgroundColor: '#302F2F', 
    color: 'white', 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    fontSize: 20
  },
  orderBtnTouchable: {
    flexDirection: 'row', 
    marginLeft: 'auto', 
    marginRight: 'auto', 
    marginTop: 40
  },
  ukupnaCijena: {
    fontWeight: 'bold', 
    fontSize: 18
  },
  naslovPrice: {
    fontSize: 13, 
    fontWeight: 'normal'
  },
  itemKolicinaDiv: {
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 10
  },
  itemKolicinaFirst: {
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    width: 60 
  },
  kolicina: {
    fontSize: 19, 
    marginHorizontal: 10 
  },
  noItems: {
    height: Dimensions.get('window').height - 150, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
});