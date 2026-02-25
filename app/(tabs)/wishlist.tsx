import { View, Text, FlatList, Image, Pressable, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

export default function Wishlist() {
  const { wishlistItems, toggleWishlist } = useContext(CartContext);

  return (
    <View style={styles.container}>
      {wishlistItems.length === 0 ? (
        <Text style={styles.empty}>Your wishlist is empty ❤️</Text>
      ) : (
        <FlatList
          data={wishlistItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={{ flex: 1 }}>
                <Text numberOfLines={1}>{item.title}</Text>
                <Text style={styles.price}>₹ {item.price}</Text>
              </View>

              <Pressable onPress={() => toggleWishlist(item)}>
                <Text style={{ fontSize: 18 }}>❤️</Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f4f6fb' },
  empty: { textAlign: 'center', marginTop: 40, fontSize: 16 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
    elevation: 4,
    alignItems: 'center',
  },
  image: { width: 80, height: 80, marginRight: 10 },
  price: { fontWeight: 'bold', color: '#6C63FF', marginTop: 4 },
});
