import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { useDispatch } from 'react-redux';
import { itemAction } from './../redux/Actions';

export default function Item({ navigation, pizza }) {

  var dispatch = useDispatch()


  return (<TouchableOpacity onPress={()=>{
            dispatch(itemAction(pizza.id))    
            navigation.navigate('Item')
          }} style={styles.item}>
            <Image style={styles.slika} source={pizza.img} />
            <View style={{ marginTop: 5 }}>
              <Text style={styles.naslovItem}>{pizza.naslov}</Text>
              <View style={styles.priceDiv}>
                <Text style={styles.price}>{pizza.price + ' $'}</Text>
                <Text>{pizza.grama + ' g'}</Text>
              </View>
            </View>
          </TouchableOpacity>);
}

const styles = StyleSheet.create({
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