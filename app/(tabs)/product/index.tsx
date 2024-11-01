import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Platform,
  useColorScheme,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { apiListProduct } from "@/store/listProduct";
import { useEffect, useState, useCallback } from "react"; 
import { LinearGradient } from "expo-linear-gradient";
import DetailProductApprove from "@/app/components/Modal/DetailProductApprove";

const { width, height } = Dimensions.get("window");
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - 32) / 2;

export default function Index() {
  const { fetchProductList, data1 } = apiListProduct();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const isDarkMode = useColorScheme() === "dark";
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchProductList({ limit: 10, page: 1, keyword: "" });
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchProductList({ limit: 10, page: 1, keyword: searchQuery });
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  }, [fetchProductList, searchQuery]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const renderItem = ({ item, index }: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          router.push({
            pathname: "/components/Modal/DetailProductApprove",
            params: {
              nama_toko: item.mall,
              product_id: item.product_id,
            },
          });
        }}
        style={styles.cardWrapper}
      >
        <LinearGradient
          colors={isDarkMode ? ["#1F2937", "#1F2937"] : ["#ffffff", "#f8f9fa"]}
          style={[
            styles.card,
            { backgroundColor: isDarkMode ? "#1F2937" : "#ffffff" },
          ]}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri:
                  item.images[0] ==
                  "https://cdn.eurekabookhouse.co.id/ebh/product/all/undefined" || item.images.length < 1 
                    ? "https://home.tokopintar.co.id/images/display-warung.png?094f1b5576d5d899216ad21c313e7a05"
                    : item.images[0],
              }}
              style={styles.image}
            />
            <View style={{
               position: "absolute",
               top: 8,
               left: 8,
               paddingHorizontal: 8,
               paddingVertical: 4,
               borderRadius: 12,
               backgroundColor:
                    item.ppn_type != "non" ? "red" :"blue",
            }}>
              <Text style={[
                  styles.statusText,
                  { color: isDarkMode ? "white" : "white" },
                ]}>{item?.ppn_type.toUpperCase()}</Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor:
                    item.status === "approved" || item.status === "active"
                      ? "green"
                      : item.status === "blocked"
                      ? "red"
                      : "#FFA000",
                },
              ]}
            >
              <Text
                style={[
                  styles.statusText,
                  { color: isDarkMode ? "white" : "white" },
                ]}
              >
                {item.status === "approved" || item.status === "active"
                  ? "Approved"
                  : item.status === "blocked"
                  ? "Blocked"
                  : "Waiting"}
              </Text>
            </View>
          </View>
          <View style={styles.contentContainer}>
            <Text
              style={[
                styles.storeName,
                { color: isDarkMode ? "#e5e7eb" : "#1a1a1a" },
              ]}
              numberOfLines={1}
            >
              {item.mall}
            </Text>
            <Text
              style={[
                styles.productName,
                { color: isDarkMode ? "#d1d5db" : "#4a4a4a" },
              ]}
              numberOfLines={2}
            >
              {item.name}
            </Text>
            <View style={styles.footer}>
              <Text
                style={[
                  styles.providerText,
                  { color: isDarkMode ? "#9ca3af" : "#666" },
                ]}
              >
                {item.provider}
              </Text>
              <Text
                style={[
                  styles.totalPrice,
                  { color: isDarkMode ? "#93C5FD" : "#2196F3" },
                ]}
              >
                {formatCurrency(item.price)}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: isDarkMode ? "#111827" : "#f3f4f6" },
      ]}
      edges={["right", "left", "top"]}
    >
      <View
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? "#111827" : "#f3f4f6" },
        ]}
      >
        <View
          style={[
            styles.header,
            {
              backgroundColor: isDarkMode ? "#1F2937" : "white",
              borderBottomColor: isDarkMode ? "#4b5563" : "#e0e0e0",
            },
          ]}
        >
          <View style={styles.searchContainer}>
            <TextInput
              style={[
                styles.searchInput,
                {
                  backgroundColor: isDarkMode ? "#374151" : "#f5f5f5",
                  borderColor: isDarkMode ? "#4b5563" : "#e0e0e0",
                  color: isDarkMode ? "#d1d5db" : "#333",
                },
              ]}
              placeholder="Cari Product..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={isDarkMode ? "#9ca3af" : "#666"}
            />
          </View>
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === "all" && styles.filterButtonActive,
                {
                  backgroundColor: isDarkMode ? "#374151" : "#f5f5f5",
                  borderColor: isDarkMode ? "#4b5563" : "#e0e0e0",
                },
              ]}
              onPress={() => {
                fetchProductList({ status: "waiting" });
                setSelectedFilter("all");
              }}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === "all" && styles.filterTextActive,
                  { color: isDarkMode ? "#d1d5db" : "#666" },
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === "approved" && styles.filterButtonActive,
                {
                  backgroundColor: isDarkMode ? "#374151" : "#f5f5f5",
                  borderColor: isDarkMode ? "#4b5563" : "#e0e0e0",
                },
              ]}
              onPress={() => {
                fetchProductList({ status: "active" });
                setSelectedFilter("approved");
              }}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === "approved" && styles.filterTextActive,
                  { color: isDarkMode ? "#d1d5db" : "#666" },
                ]}
              >
                Approved
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterButton,
                selectedFilter === "blocked" && styles.filterButtonActive,
                {
                  backgroundColor: isDarkMode ? "#374151" : "#f5f5f5",
                  borderColor: isDarkMode ? "#4b5563" : "#e0e0e0",
                },
              ]}
              onPress={() => {
                fetchProductList({ status: "blocked" });
                setSelectedFilter("blocked");
              }}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === "blocked" && styles.filterTextActive,
                  { color: isDarkMode ? "#d1d5db" : "#666" },
                ]}
              >
                blocked
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={data1}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.product_id}_${index}`}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
          style={{ backgroundColor: isDarkMode ? "#111827" : "#f3f4f6" }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#2196F3"]}
              tintColor={isDarkMode ? "#93C5FD" : "#2196F3"}
              title="Pull to refresh"
              titleColor={isDarkMode ? "#93C5FD" : "#2196F3"}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
  },
  searchContainer: {
    marginBottom: 12,
  },
  searchInput: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  filterContainer: {
    flexDirection: "row",
    gap: 8,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
  },
  filterButtonActive: {
    backgroundColor: "#2196F3",
    borderColor: "#2196F3",
  },
  filterText: {
    fontSize: 12,
  },
  filterTextActive: {
    color: "white",
  },
  listContainer: {
    padding: 7,
  },
  cardWrapper: {
    flex: 1,
    margin: CARD_MARGIN,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  card: {
    borderRadius: 12,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: 120,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  statusBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "600",
  },
  contentContainer: {
    padding: 12,
  },
  storeName: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
  },
  productName: {
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 8,
    height: 32,
  },
  footer: {
    flexDirection: "column",
    gap: 4,
  },
  providerText: {
    fontSize: 10,
  },
  totalPrice: {
    fontSize: 12,
    fontWeight: "700",
  },
});
