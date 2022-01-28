import React, { useEffect, useState } from 'react';
import { StyleSheet, StatusBar, View, TouchableOpacity, Dimensions } from 'react-native';
import { Platform } from 'react-native';
import { SimpleLineIcons, Ionicons,AntDesign } from '@expo/vector-icons'; 

export default function Footer({navigation, homeS, profileS, bagS }) {

    var [home, setHome] = useState(homeS)
    var [profile, setProfile] = useState(profileS)
    var [bag, setBag] = useState(bagS)


    useEffect(()=>{
        setHome(homeS)
        setProfile(profileS)
        setBag(bagS)
    },[])


  return (<View style={styles.footer}>
      <TouchableOpacity onPress={()=>{
          navigation.navigate('Home')
      }}>
          {home ? <Ionicons name="home-outline" size={24} color="#5293ff" /> : <Ionicons name="home-outline" size={24} color="black" /> }
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>{
          navigation.navigate('Bag')
      }}>
          {bag ? <SimpleLineIcons name="handbag" size={24} color="#5293ff" /> :  <SimpleLineIcons name="handbag" size={24} color="black" />}
      </TouchableOpacity>
      
      <TouchableOpacity onPress={()=>{
          navigation.navigate('Profile')
      }}>
          {profile ? <AntDesign name="user" size={24} color="#5293ff" /> : <AntDesign name="user" size={24} color="black" /> }
      </TouchableOpacity>
      
  </View>
  );
}

const styles = StyleSheet.create({
    footer: {
        display: 'flex',
        flexDirection: 'row',
        width: Dimensions.get("window").width,
        position: 'absolute',
        bottom: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        paddingVertical: 10,
        paddingHorizontal: 80,
        justifyContent: 'space-between',
        borderTopWidth: 1,
         borderColor: 'darkgray',
         backgroundColor: 'white'
    }
});