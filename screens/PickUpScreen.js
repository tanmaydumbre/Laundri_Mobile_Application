import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const PickUpScreen = () => {
        const [selectedDate, setSelectedDate] = useState(new Date());
        const [selectedTime, setSelectedTime] = useState("");
        const [delivery, setDelivery] = useState("");
         const cart = useSelector((state) => state.cart.cart);
        const total = cart.map((item) => item.quantity * item.price).reduce((curr,prev) => curr+prev,0);
        const navigation = useNavigation();

    const deliveryTime = [
    {
      id: "0",
      name: "2-3 Days",
    },
    {
      id: "1",
      name: "3-4 Days",
    },
    {
      id: "2",
      name: "4-5 Days",
    },
    {
      id: "3",
      name: "5-6 Days",
    },
    {
      id: "4",
      name: "Tommorrow",
    },
  ];

    const times = [
    {
      id: "0",
      time: "11:00 PM",
    },
    {
      id: "1",
      time: "12:00 PM",
    },
    {
      id: "2",
      time: "1:00 PM",
    },
    {
      id: "3",
      time: "2:00 PM",
    },
    {
      id: "4",
      time: "3:00 PM",
    },
    {
      id: "5",
      time: "4:00 PM",
    },
  ];

  const proceedToCart = () => {
    if(!selectedDate || !selectedTime || !delivery) {
    Alert.alert('Empty Feilds', 'Please enter all feilds', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
    } if (selectedDate && selectedTime && delivery) {
      navigation.navigate("Cart",{  
       PickUpDate:selectedDate,   
       selectedTime:selectedTime,
       no_of_days:delivery,
});
    }
  }

  return (
        <>
    <SafeAreaView>
      <Text style={{fontSize:16,fontWeight:"bold",margin:10}}>Enter Address</Text>

      <TextInput style={{
        padding:40,
        borderColor:'grey',
        borderWidth:0.8,
        margin:10,
        paddingVertical:80,
        borderRadius:10}} />

        <Text style={{fontSize:16,fontWeight:"bold",margin:10}}>Pick Up Date</Text>
         <View>
      <HorizontalDatepicker
        mode="gregorian" // or "jalali"
        startDate={new Date('2025-10-01')}
        endDate={new Date('2025-12-31')}
        initialSelectedDate={selectedDate}
        onSelectedDateChange={(date) => setSelectedDate(date)}
        selectedItemWidth={170}
        unselectedItemWidth={38}
        itemHeight={38}
        itemRadius={10}
        selectedItemBackgroundColor="#222831"
        unselectedItemBackgroundColor="#ececec"
      />
      <Text style={{fontSize:15,margin:10}}>Selected Date: {selectedDate.toDateString()}</Text>
    </View>

    <Text style={{fontSize:16,fontWeight:"bold",margin:10}}>Select time</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {times.map((item,i) => (
            <Pressable key={item.id} onPress={() => setSelectedTime(item.time)} 
                       style={selectedTime.includes(item.time) ?
                        {
                        margin:10,
                        borderRadius:7,
                        padding:12,
                        borderColor:"red",
                        borderWidth:0.7}
                        
                        :
                        
                        { margin:10,
                        borderRadius:7,
                        padding:12,
                        borderColor:"grey",
                        borderWidth:0.7}}
                       >
                <Text>{item.time}</Text>
            </Pressable>
        ))}
        </ScrollView>

        <Text style={{fontSize:16,fontWeight:"bold",margin:10}}>Delivery Date</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {deliveryTime.map((item,i) => (
            <Pressable onPress={() => setDelivery(item.name)} key={i} 
                         style={delivery.includes(item.name) ?
                        {
                        margin:10,
                        borderRadius:7,
                        padding:12,
                        borderColor:"red",
                        borderWidth:0.7}
                        
                        :
                        
                        { margin:10,
                        borderRadius:7,
                        padding:12,
                        borderColor:"grey",
                        borderWidth:0.7}}
            >
                <Text style={{fontSize:15,margin:10}}>{item.name}</Text>
            </Pressable>
        ))}
        </ScrollView>

          {total === 0 ? (
                       null
                   ):(
                   <Pressable style={{
                       backgroundColor: "#088F8F",
                       marginTop:120,
                       marginBottom:40,
                       padding: 10,
                       marginBottom: 20, 
                       margin: 15, 
                       borderRadius: 8,
                       flexDirection:"row",
                       alignItems:"center",
                       justifyContent:"space-between"
                       }}>
                   <View>
                       <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>{cart.length} items | $ {total}</Text>
                       <Text style={{fontSize:14,fontWeight:"bold",color:"white",marginVertical:6}}>extra charges may be apply</Text>
                   </View>
               
                <Pressable onPress={proceedToCart}>
                  <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>Proceed to Cart</Text>
               </Pressable>
       
               </Pressable>
                   )}
       
                    
        

    </SafeAreaView>

    </>
  )
}

export default PickUpScreen

const styles = StyleSheet.create({})