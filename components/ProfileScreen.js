import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, ToastAndroid, Alert,  TouchableOpacity, Text,StatusBar, ScrollView, Dimensions, View, Modal, TextInput } from 'react-native';
import { Platform } from 'react-native';
import Footer from './Footer';
import { Ionicons, Feather, Entypo, SimpleLineIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';
import MyStore from './MyStore';

export default function BagScreen({navigation}) {

  function notifyMessage(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT)
    } else {
      Alert.alert(msg);
    }
  }
  let [name, setName] = useState('')
  let [phone, setPhone] = useState('')
  let [nameErr, setNameErr] = useState(true)
  let [phoneErr, setPhoneErr] = useState(true)

  let [modalVisible, setModalVisible] = useState(false)

  let checkName = (props) => {
    if(props.length <= 2){
      setNameErr(true)
    }
    else{
      setNameErr(false)
    }
  }
  let checkPhone = (props) => {
    if(props.length <= 5){
      setPhoneErr(true)
    }
    else{
      setPhoneErr(false)
    }
  }
  

  return (<SafeAreaView style={styles.androidSafe}>

{/* Edit Page */}
     <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false)
        }}
      >
        <View style={{backgroundColor: 'white', flex: 1}}>
      <View style={styles.header}>
        <Ionicons onPress={()=>{setModalVisible(false)}} name="chevron-back-outline" size={25} color="black" />
        <Text style={styles.headerText}>Edit profile</Text>
        <Text style={{width: 25}}></Text>
      </View>
      <ScrollView>
        <Text style={styles.editTextMain}>Please enter Your name and phone number</Text>
        <View style={nameErr ? {...styles.input, borderColor: 'red'} : {...styles.input, borderColor: 'green'}}>
          <AntDesign style={styles.inputIcon} name="user" size={24} color="black" />
          <TextInput onChangeText={(e)=>{setName(e);checkName(e)
          }} value={name} style={styles.textInput} placeholder='Name & surname' />
        </View>
        <View style={phoneErr ? {...styles.input, borderColor: 'red'} : {...styles.input, borderColor: 'green'}}>
          <Feather style={styles.inputIcon} name="phone" size={24} color="black" />
          <TextInput onChangeText={(e)=>{setPhone(e);checkPhone(e)}} value={phone} keyboardType='phone-pad' style={styles.textInput} placeholder='Phone number'/>
        </View>
        <TouchableOpacity 
        onPress={()=>{
          if(name.length <= 2){
            notifyMessage('Name must have minimum 3 character')
          }
          else if(phone.length <= 5){
            notifyMessage('Phone must have minimum 6 digits')
          }
          else {
            notifyMessage('Good job')
            MyStore.name = name
            MyStore.number = phone
            setTimeout(() => {
              setName('')
              setPhone('')
              setPhoneErr(true)
              setNameErr(true)
              setModalVisible(false)
            }, 100);
          }
        }} >
          <Text style={styles.submitButton} >Submit changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
    </Modal>
{/* Edit Page End */}

    <View style={styles.header}>
        <Ionicons onPress={()=>{navigation.goBack()}} name="chevron-back-outline" size={25} color="black" />
        <Text style={styles.headerText}>My Profile</Text>
        <Feather name="log-in" size={25} color="black" />
    </View>
    <ScrollView>
      <TouchableOpacity onPress={()=>{setModalVisible(true)}} style={styles.myProfile}>
        <View style={styles.myProfileFirst}>
          <View style={styles.profilna}></View>
          <View>
            <Text>{MyStore.name}</Text>
            <Text>{MyStore.number}</Text>
          </View>
        </View>
        <Feather name="edit" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.order}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <SimpleLineIcons name="handbag" size={25} color="black" />
          <Text style={styles.orderText}>My orders</Text>
        </View>
        <MaterialIcons name="navigate-next" size={30} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.order}>
        <View style={styles.orderFirst}>
          <Entypo name="location-pin" size={25} color="black" />
          <Text style={styles.orderText}>My adress</Text>
        </View>
        <MaterialIcons name="navigate-next" size={30} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.order}>
        <View style={styles.orderFirst}>
          <MaterialIcons name="feedback" size={25} color="black" />
          <Text style={styles.orderText}>Give feedback</Text>
        </View>
        <MaterialIcons name="navigate-next" size={30} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.order}>
        <View style={styles.orderFirst}>
          <Ionicons name="information-circle-outline" size={24} color="black" />
          <Text style={styles.orderText}>Informations</Text>
        </View>
        <MaterialIcons name="navigate-next" size={30} color="black" />
      </TouchableOpacity>


    </ScrollView>
      <Footer navigation={navigation}  homeS={false} bagS={false} profileS={true}  />

     
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    androidSafe: {
    width: 100+'%',
    minHeight: Dimensions.get('window').height,
    backgroundColor: '#fff',
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1
  },
  headerText: {
    fontSize: 18
  },
  myProfile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 10,
    marginBottom: 10
  }, 
  myProfileFirst: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilna: {
    marginRight: 20,
    backgroundColor: 'lightgray',
    borderRadius: 100,
    height: 50,
    width: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  order: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderColor: 'darkgray',
    paddingVertical: 15,
    // marginTop: 5
  },
  orderText: {
    marginLeft: 15,
    fontSize: 17
  }, 
  input: {
    borderWidth: 1,
    margin: 10,
    flexDirection: 'row',
    padding: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderRadius: 12
  },
  inputIcon: {
    marginRight: 15
  },
  textInput: {
    fontSize: 17,
    width: 100+'%'
  },
  editTextMain: {
    fontSize: 25,
    padding: 10+'%',
    textAlign: 'center'
  },
  submitButton: {
    backgroundColor: '#454545',
    color: 'white',
    padding: 15,
    paddingHorizontal: 20,
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    fontSize: 16,
    marginBottom: 20
  },
  orderFirst: {
    flexDirection: 'row', 
    alignItems: 'center'
  }
});