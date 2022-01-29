import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, StatusBar, View, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Platform } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import Footer from './Footer';
import Data from './Store'
import { useDispatch } from 'react-redux';
import { itemAction } from './../redux/Actions';

export default function HomeScreen({ navigation }) {

  var [pizza, setPizza] = useState(true)
  var [hamburger, setHamburger] = useState(false)
  var [sendwich, setSendwitch] = useState(false)
  var [soup, setSoup] = useState(false)
  var [grill, setGrill] = useState(false)

  var dispatch = useDispatch()


  return (<SafeAreaView style={styles.androidSafe}>
    <View style={styles.header}>
      <View style={styles.headerText}>
        <Text style={styles.headerTextFont} >Home</Text>
      </View>
      <AntDesign name="search1" size={24} color="black" onPress={()=>{navigation.navigate('Search')}} />
    </View>

    <ScrollView horizontal={true} style={styles.filterView}>
      <View style={styles.foodHeader}>
        {/* <TouchableOpacity style={styles.filterIcon} ><MaterialCommunityIcons name="filter-outline" size={24} color="white" /></TouchableOpacity> */}
        <TouchableOpacity onPress={() => {
          setPizza(true)
          setHamburger(false)
          setSendwitch(false)
          setGrill(false)
          setSoup(false)
        }} style={pizza ? { backgroundColor: '#d7f1fc', ...styles.filterItem } : styles.filterItem}><Text>Pizza</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setPizza(false)
          setHamburger(true)
          setSendwitch(false)
          setGrill(false)
          setSoup(false)
        }} style={hamburger ? { backgroundColor: '#d7f1fc', ...styles.filterItem } : styles.filterItem}><Text>Hamburger</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setPizza(false)
          setHamburger(false)
          setSendwitch(true)
          setGrill(false)
          setSoup(false)
        }} style={sendwich ? { backgroundColor: '#d7f1fc', ...styles.filterItem } : styles.filterItem}><Text>Sendwitch</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setPizza(false)
          setHamburger(false)
          setSendwitch(false)
          setGrill(false)
          setSoup(true)
        }} style={soup ? { backgroundColor: '#d7f1fc', ...styles.filterItem } : styles.filterItem}><Text>Soup</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => {
          setPizza(false)
          setHamburger(false)
          setSendwitch(false)
          setGrill(true)
          setSoup(false)
        }} style={grill ? { backgroundColor: '#d7f1fc', ...styles.filterItem } : styles.filterItem}><Text>Grill</Text></TouchableOpacity>
      </View>
    </ScrollView>
    <ScrollView style={{ backgroundColor: '#f3f3f3', paddingHorizontal: 10, maxHeight: Dimensions.get('window').height - 175 }}>
      <View style={{ paddingVertical: 10 }}>

        {pizza ? Data.map(pizza => {
          if(pizza.kategorija === 'pizza'){
          return (<TouchableOpacity onPress={()=>{
            dispatch(itemAction(pizza.id))    
            navigation.navigate('Item')
          }} key={pizza.id} style={styles.item}>
            <Image style={styles.slika} source={pizza.img} />
            <View style={{ marginTop: 5 }}>
              <Text style={styles.naslovItem}>{pizza.naslov}</Text>
              <View style={styles.priceDiv}>
                <Text style={styles.price}>{pizza.price + ' $'}</Text>
                <Text style={styles.gram}>{pizza.grama + ' g'}</Text>
              </View>
            </View>
          </TouchableOpacity>)}
        }) : <></>}

        {hamburger ? Data.map(pizza => {
          if(pizza.kategorija === 'hamburger'){
          return (<TouchableOpacity onPress={()=>{
            dispatch(itemAction(pizza.id))    
            navigation.navigate('Item')
          }} key={pizza.id} style={styles.item}>
            <Image style={styles.slika} source={pizza.img} />
            <View style={{ marginTop: 5 }}>
              <Text style={styles.naslovItem}>{pizza.naslov}</Text>
              <View style={styles.priceDiv}>
                <Text style={styles.price}>{pizza.price + ' $'}</Text>
                <Text style={styles.gram}>{pizza.grama + ' g'}</Text>
              </View>
            </View>
          </TouchableOpacity>)}
        }) : <></>}

        {grill ? Data.map(pizza => {
          if(pizza.kategorija === 'rostilj'){
          return (<TouchableOpacity onPress={()=>{
            dispatch(itemAction(pizza.id))    
            navigation.navigate('Item')
          }} key={pizza.id} style={styles.item}>
            <Image style={styles.slika} source={pizza.img} />
            <View style={{ marginTop: 5 }}>
              <Text style={styles.naslovItem}>{pizza.naslov}</Text>
              <View style={styles.priceDiv}>
                <Text style={styles.price}>{pizza.price + ' $'}</Text>
                <Text style={styles.gram}>{pizza.grama + ' g'}</Text>
              </View>
            </View>
          </TouchableOpacity>)}
        }) : <></>}

        {soup ? Data.map(pizza => {
          if(pizza.kategorija === 'supe'){
          return (<TouchableOpacity onPress={()=>{
            dispatch(itemAction(pizza.id))    
            navigation.navigate('Item')
          }} key={pizza.id} style={styles.item}>
            <Image style={styles.slika} source={pizza.img} />
            <View style={{ marginTop: 5 }}>
              <Text style={styles.naslovItem}>{pizza.naslov}</Text>
              <View style={styles.priceDiv}>
                <Text style={styles.price}>{pizza.price + ' $'}</Text>
                <Text style={styles.gram}>{pizza.grama + ' g'}</Text>
              </View>
            </View>
          </TouchableOpacity>)}
        }) : <></>}

        {sendwich ? Data.map(pizza => {
          if(pizza.kategorija === 'sendvici'){
          return (<TouchableOpacity onPress={()=>{
            dispatch(itemAction(pizza.id))    
            navigation.navigate('Item')
          }} key={pizza.id} style={styles.item}>
            <Image style={styles.slika} source={pizza.img} />
            <View style={{ marginTop: 5 }}>
              <Text style={styles.naslovItem}>{pizza.naslov}</Text>
              <View style={styles.priceDiv}>
                <Text style={styles.price}>{pizza.price + ' $'}</Text>
                <Text>{pizza.grama + ' g'}</Text>
              </View>
            </View>
          </TouchableOpacity>)}
        }) : <></>}
      
      </View>
    </ScrollView>
    <Footer navigation={navigation} homeS={true} bagS={false} profileS={false} />
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
  header: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'darkgray',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  headerText: {
    position: 'absolute',
    width: Dimensions.get("window").width,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerTextFont: {
    fontSize: 18,
  },
  filterIcon: {
    backgroundColor: 'black',
    padding: 5,
    height: 40,
    width: 40,
    marginLeft: 10,
    marginRight: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterView: {
    paddingVertical: 10,
    maxHeight: 60
  },
  foodHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  filterItem: {
    paddingHorizontal: 20,
    marginHorizontal: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    height: 40,
    borderRadius: 5
  },
  slika: {
    height: 90,
    width: 100,
    borderRadius: 10,
    marginRight: 30
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10
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
    marginRight: 20
  },
  priceDiv: {
    flexDirection: 'row', 
    marginTop: 10
  }
});