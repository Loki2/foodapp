import React, { useState, useReducer, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

//Create current Address location
import * as Location from 'expo-location';



const screenwidth = Dimensions.get('screen').width

export const Landing = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [address, setAddress] = useState<Location.Address>()
 
  const [displayAddress, setDisplayAddress] = useState("Waiting For Current Address...!");


  useEffect(() => {


    (async () => {
      let {status} = await Location.requestPermissionsAsync();

      if(status !== 'granted') {
        setErrorMsg('Permission to access to location is not Granted')
      }

      let location: any = await Location.getCurrentPositionAsync();
      const { coords } = location;

      if(coords){
        const { latitude, longitude } = coords;

        let addressResponse: any  = await Location.reverseGeocodeAsync({ latitude, longitude })

        for(let item of addressResponse) {
          setAddress(item);
          let currentAddress = `${item.name}, ${item.street}, ${item.postalCode}, ${item.country}`;

          setDisplayAddress(currentAddress)
          return;
        }
      }else{
        //Noticfy User Some thing went wrong

      }
    })
  },[])
  return(
    <View style={styles.container}>
      <View style={styles.navigation} />

      <View style={styles.body}>
        <Image source={require('../images/delivery_icon.png')} style={styles.deliveryIcon}/>
        <View style={styles.addressContainer}>
        <Text style={styles.addressTitle}>Your Delivery Address</Text>
        </View>

        <Text style={styles.addressText}>{displayAddress}</Text>
      </View>
      <View style={styles.footer} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(242,242,242,2)'
  },
  navigation: {
    flex: 2
  },
  body: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deliveryIcon: {
    width: 120,
    height: 120
  },
  addressContainer: {
    width: screenwidth - 100,
    borderBottomColor: 'red',
    borderBottomWidth: 0.5,
    padding: 5,
    marginBottom: 10,
    alignItems: 'center'
  },
  addressTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#707070'
  },
  addressText: {
    fontSize: 20,
    fontWeight: '200',
    color: '#4F4F4F'
  },
  footer: {
    flex: 1
  }
})