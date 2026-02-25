import axios from 'axios';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const router = useRouter();
  const bannerRef = useRef<FlatList>(null);
  const { toggleWishlist, isInWishlist } = useContext(CartContext);



  const banners = [
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
  ];

  // 🔥 Auto Slide Banner
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % banners.length;
      bannerRef.current?.scrollToIndex({ index, animated: true });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        'https://fakestoreapi.com/products'
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* 🔥 Gradient Header */}
      <LinearGradient
        colors={['#6C63FF', '#4834d4']}
        style={styles.header}
      >
        <View style={styles.headerRow}>
          <Text style={styles.logo}>ShopX</Text>

          {/* 🛍 Floating Cart */}
          <Pressable onPress={() => router.push('/cart')}>
            <Text style={styles.cartIcon}>🛒</Text>
          </Pressable>
        </View>

        <TextInput
          placeholder="Search products..."
          placeholderTextColor="#666"
          value={search}
          onChangeText={setSearch}
          style={styles.search}
        />
      </LinearGradient>

      {/* 🎞 Auto Banner */}
      <FlatList
        ref={bannerRef}
        data={banners}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.banner} />
        )}
      />

      {/* 🛍 Products */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 140 }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: '/product/[id]',
                params: {
                  id: String(item.id),
                  title: item.title,
                  price: String(item.price),
                  image: item.image,
                  description: item.description,
                },
              })
            }
          >
            {/* ❤️ Wishlist Icon */}
           <View style={styles.wishlistIcon}>
  <Pressable
    onPress={() =>
      toggleWishlist({
        id: item.id,
        title: item.title,
        price: item.price,
        image: item.image,
        
      })
    }
  >
    <Text style={{ fontSize: 18 }}>
      {isInWishlist(item.id) ? '❤️' : '🤍'}
    </Text>
  </Pressable>
</View>


            {/* 🔥 Discount Badge */}
            <View style={styles.badge}>
              <Text style={{ color: '#fff', fontSize: 10 }}>
                20% OFF
              </Text>
            </View>

            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="contain"
            />

            <Text numberOfLines={1} style={styles.title}>
              {item.title}
            </Text>

            {/* ⭐ Rating */}
            <Text style={styles.rating}>★★★★☆</Text>

            <Text style={styles.price}>₹ {item.price}</Text>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fb',
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6C63FF',
  },

  header: {
    padding: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },

  cartIcon: {
    fontSize: 22,
    color: '#fff',
  },

  search: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginTop: 12,
  },

  banner: {
    width: 350,
    height: 160,
    borderRadius: 20,
    margin: 15,
  },

  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    padding: 14,
    borderRadius: 20,
    elevation: 6,
  },

  image: {
    height: 120,
  },

  title: {
    fontSize: 14,
    marginTop: 8,
  },

  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginTop: 4,
  },

  rating: {
    color: '#ff9900',
    marginTop: 4,
  },

  wishlistIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
  },

  badge: {
    position: 'absolute',
    left: 10,
    top: 10,
    backgroundColor: '#ff4757',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
});
