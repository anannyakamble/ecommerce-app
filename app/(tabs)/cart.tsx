import { View, Text, FlatList, Image, Pressable, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

export default function Cart() {
  const { cartItems, increaseQty, decreaseQty, removeFromCart } =
    useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f4f6fb' }}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={{ flex: 1 }}>
              <Text numberOfLines={1}>{item.title}</Text>
              <Text style={styles.price}>
                ₹ {item.price * item.quantity}
              </Text>

              <View style={styles.qtyRow}>
                <Pressable
                  style={styles.qtyBtn}
                  onPress={() => decreaseQty(item.id)}
                >
                  <Text>-</Text>
                </Pressable>

                <Text style={{ marginHorizontal: 10 }}>
                  {item.quantity}
                </Text>

                <Pressable
                  style={styles.qtyBtn}
                  onPress={() => increaseQty(item.id)}
                >
                  <Text>+</Text>
                </Pressable>
              </View>

              <Pressable onPress={() => removeFromCart(item.id)}>
                <Text style={{ color: 'red', marginTop: 6 }}>
                  Remove
                </Text>
              </Pressable>
            </View>
          </View>
        )}
      />

      <View style={styles.checkoutBar}>
        <Text style={{ fontWeight: 'bold' }}>
          Total: ₹ {total.toFixed(2)}
        </Text>
        <Pressable style={styles.checkoutBtn}>
          <Text style={{ color: '#fff' }}>Checkout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
    elevation: 4,
  },
  image: { width: 90, height: 90, marginRight: 10 },
  price: {
    fontWeight: 'bold',
    color: '#6C63FF',
    marginTop: 4,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  qtyBtn: {
    backgroundColor: '#eee',
    padding: 6,
    borderRadius: 6,
  },
  checkoutBar: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkoutBtn: {
    backgroundColor: '#ff9900',
    padding: 12,
    borderRadius: 10,
  },
});
