import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const Carausel = () => {
  const images = [
    "https://media.istockphoto.com/id/1247884083/vector/laundry-service-room-vector-illustration-washing-and-drying-machines-with-cleansers-on-shelf.jpg?s=612x612&w=0&k=20&c=myaNEKlqX7R--bzWGDoMI7PhdxG_zdQTKYEBlymJQGk=",
    "https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg?auto=compress&cs=tinysrgb&w=800",
  ];

  return (
    <View style={styles.container}>
      <Swiper autoplay loop dotColor="#13274F" activeDotColor="#90A4AE">
        {images.map((img, index) => (
          <Image key={index} source={{ uri: img }} style={styles.image} />
        ))}
      </Swiper>
    </View>
  );
};

export default Carausel;

const styles = StyleSheet.create({
  container: { height: 220 },
  image: {
    width: width * 0.94,
    height: 200,
    borderRadius: 6,
    alignSelf: 'center',
  },
});
