import { View, Text, Pressable } from 'react-native';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function Checkout() {
  const { cartItems } = useContext(CartContext);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
        Order Summary
      </Text>

      <Text style={{ marginVertical: 20 }}>
        Total: ₹ {total.toFixed(2)}
      </Text>

      <Pressable
        style={{
          backgroundColor: '#ff9900',
          padding: 15,
          borderRadius: 10,
        }}
      >
        <Text style={{ textAlign: 'center', color: '#fff' }}>
          Place Order
        </Text>
      </Pressable>
    </View>
  );
}
