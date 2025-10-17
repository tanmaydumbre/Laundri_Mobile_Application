import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Alert, View, Pressable, Image, TextInput, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import Carausel from '../components/Carausel';
import Services from '../components/Services';
import DressItem from '../components/DressItem';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../ProductReducer';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const cart = useSelector((state) => state.cart.cart);
    const total = cart.map((item) => item.quantity * item.price).reduce((curr,prev) => curr+prev,0);
    const navigation = useNavigation();
    console.log('cart:',cart);
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
        'We are loading your location...'
    );
    const [locationServicesEnabled, setLocationServicesEnabled] = useState(false);

    useEffect(() => {
        checkIfLocationEnabled();
        getCurrentLocation();
    }, []);

    // ✅ 1. Check if location service is enabled
    const checkIfLocationEnabled = async () => {
        const enabled = await Location.hasServicesEnabledAsync();
        if (!enabled) {
            Alert.alert('Location services not enabled', 'Please enable location services.', [
                { text: 'OK' },
            ]);
        } else {
            setLocationServicesEnabled(enabled);
        }
    };

    // ✅ 2. Get current location
    const getCurrentLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission denied', 'Please grant location permission.');
            return;
        }

        const coords = await Location.getCurrentPositionAsync({});
        // console.log(coords);
        if (coords) {
            const { latitude, longitude } = coords.coords;

            const response = await Location.reverseGeocodeAsync({
                latitude,
                longitude,
            });
            // console.log(response);

            for (let item of response) {
                let address = `${item.subregion}, ${item.postalCode}, ${item.city}`;
                setDisplayCurrentAddress(address);
            }
        }
    };

      const product = useSelector((state) => state.product.product);
      console.log("products:",product)

      const dispatch = useDispatch();

      useEffect(() => {
        if (product.length > 0) return;
        const fetchProducts = () => {
            services.map((service) => dispatch(getProducts(service)));  
        };
        fetchProducts();
        }, []);
        console.log("products:",product)

      const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      name: "shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
      name: "T-shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
      name: "dresses",
      quantity: 0,
      price: 10,
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
      name: "jeans",
      quantity: 0,
      price: 10,
    },
    {
      id: "14",
      image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
      name: "Sweater",
      quantity: 0,
      price: 10,
    },
    {
      id: "15",
      image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
      name: "shorts",
      quantity: 0,
      price: 10,
    },
    {
      id: "16",
      image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
      name: "Sleeveless",
      quantity: 0,
      price: 10,
    },
  ];

    return (
        <>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
            {/* location and profile */}
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                <Entypo name="location-pin" size={24} color="#FF0000" />

                <View>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Home</Text>
                    <Text style={styles.text}>{displayCurrentAddress}</Text>
                </View>

                <Pressable style={{ marginLeft: 'auto', marginRight: 20 }}>
                    <Image
                        style={{ width: 40, height: 40, borderRadius: 20 }}
                        source={{ uri: "https://yt3.ggpht.com/yti/ANjgQV961Jn_eq-kFjm3ZKvHAEuHLayrKnXhNnLZOs7L1lXtq6k=s88-c-k-c0x00ffffff-no-rj" }}
                    />
                </Pressable>

            </View>

            {/* SearchBar */}
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, margin: 10, borderWidth: 0.8, borderColor: '#d3d3d3', borderRadius: 25 }}>
                <Feather name="search" size={24} color="black" />
                <TextInput placeholder='search for items'/>
            </View>

            {/* image Carausel */}
            <Carausel/>

            {/* Services */}
            <Services/>

            {/* Render all Products */}
            <ScrollView style={{marginBottom:10}}>
            {product.map((item , index) => (
                <DressItem item={item} key={index}/>
            ))}
            </ScrollView>


        </SafeAreaView>
            
            {total === 0 ? (
                null
            ):(
            <Pressable style={{
                backgroundColor: "#088F8F",
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
        
         <Pressable onPress={() => navigation.navigate("PickUp")}>
           <Text style={{fontSize:17,fontWeight:"600",color:"white"}}>Proceed to pickup</Text>
        </Pressable>

        </Pressable>
            )}


       
        </>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    //   container: {
    //     flexDirection:'row',
    //     alignItems:'center',
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   },
    //   text: {
    //     fontSize: 16,
    //   },
});
