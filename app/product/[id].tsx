import { useLocalSearchParams } from 'expo-router';
import { useContext, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { CartContext } from '../../context/CartContext';

export default function ProductDetails() {
  const { id, title, price, image, description } =
    useLocalSearchParams();

  const { addToCart, toggleWishlist } = useContext(CartContext);
  //const [added, setAdded] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);
const [wishlistAdded, setWishlistAdded] = useState(false);


  return (
    <View style={styles.container}>
      <Image source={{ uri: image as string }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>₹ {price}</Text>
        <Text style={styles.desc}>{description}</Text>
      </View>

      <Pressable
        style={styles.cartBtn}
        onPress={() => {
          addToCart({
            id: Number(id),
            title: title as string,
            price: Number(price),
            image: image as string,
            
          });
          setCartAdded(true);
        }}
      >
        <Text style={styles.btnText}>
          {cartAdded ? 'Added ✔' : 'Add To Cart'}
        </Text>
      </Pressable>

      {/* <Pressable
        style={styles.wishlistBtn}
        onPress={() =>
          addToWishlist({
            id: Number(id),
            title: title as string,
            price: Number(price),
            image: image as string,
            quantity: 1,
          })
          
        }
      >
        <Text style={styles.btnText}>❤️ Add To Wishlist</Text>
      </Pressable> */}

      <Pressable
        style={styles.wishlistBtn}
        onPress={() => {
          toggleWishlist({
            id: Number(id),
            title: title as string,
            price: Number(price),
            image: image as string,
            
          });
          setWishlistAdded(true);
        }}
      >
        <Text style={styles.btnText}>
          {wishlistAdded ? 'Added ✔' : 'Add To wishlist❤️'} </Text>
      </Pressable>



    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },

  image: { height: 250, resizeMode: 'contain' },

  info: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 16,
    marginTop: 10,
  },

  title: { fontSize: 18, fontWeight: 'bold' },

  price: {
    fontSize: 20,
    color: '#6C63FF',
    marginVertical: 10,
  },

  desc: { fontSize: 14, color: '#555' },

  cartBtn: {
    backgroundColor: '#6C63FF',
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },

  wishlistBtn: {
    backgroundColor: '#ff4d6d',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },

  btnText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
