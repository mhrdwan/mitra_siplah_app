import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  Dimensions,
  ScrollView,
  Image,
  useColorScheme,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { apiListProduct } from "@/store/listProduct";
import ConfirmationModal from "../MdalApprove";

const HEADER_HEIGHT = Platform.OS === "ios" ? 60 : 70;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 10 : StatusBar.currentHeight;
const { width } = Dimensions.get("window");

export default function DetailProductApprove() {
  const { detailProduct, dataDetailProduct } = apiListProduct();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { product_id, nama_toko } = params;
  const isDarkMode = useColorScheme() === "dark";
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("approve");
  useEffect(() => {
    detailProduct({ id: parseInt(product_id as string) });
  }, []);

  const renderProductImages = (data: any) => {
    let images;
    console.log(`ini data gambar`, data);
    if (data?.images?.length > 0) {
      images = `https://cdn.eurekabookhouse.co.id/ebh/product/all/${data.images[0]}`;
    } else {
      images =
        "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";
    }
    return (
      <View
        style={{
          height: width,
          width: width,
          overflow: "hidden",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={{
            uri: images,
          }}
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="contain"
        />
      </View>
    );
  };

  return (
    <View
      style={{ flex: 1, backgroundColor: isDarkMode ? "#111827" : "#4A90E2" }}
    >
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={isDarkMode ? "#111827" : "#4A90E2"}
      />

      <View
        style={{
          paddingTop: STATUSBAR_HEIGHT,
          height: HEADER_HEIGHT,
          width: width,
          backgroundColor: isDarkMode ? "#1F2937" : "#4A90E2",
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              position: "absolute",
              left: 20,
              padding: 8,
              borderRadius: 8,
              backgroundColor: isDarkMode
                ? "rgba(255,255,255,0.2)"
                : "rgba(255,255,255,0.2)",
              height: 40,
              width: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={isDarkMode ? "#fff" : "#fff"}
            />
          </TouchableOpacity>

          <Text
            numberOfLines={1}
            style={{
              textAlign: "center",
              fontSize: 18,
              fontWeight: "600",
              color: isDarkMode ? "#e5e7eb" : "#fff",
              maxWidth: "70%",
            }}
          >
            {nama_toko}
          </Text>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: isDarkMode ? "#111827" : "#fff",
          marginTop: width * 0.03,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {renderProductImages(dataDetailProduct)}
          <View style={{ padding: 16 }}>
            {/* Price, Stock & Status Section */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                    color: isDarkMode ? "#93C5FD" : "#4A90E2",
                  }}
                >
                  {dataDetailProduct?.price?.primaryCurrencyFormat}
                </Text>
                {dataDetailProduct?.ppn?.ppnType == "non" ? (
                  <Text
                    style={{
                      color: isDarkMode ? "#9ca3af" : "#666",
                      fontSize: 12,
                    }}
                  >
                    Tidak Termasuk PPN
                  </Text>
                ) : (
                  <Text
                    style={{
                      color: isDarkMode ? "#9ca3af" : "#666",
                      fontSize: 12,
                    }}
                  >
                    Termasuk PPN
                  </Text>
                )}
              </View>
              <View>
                <Text
                  style={{
                    color: isDarkMode ? "#9ca3af" : "#666",
                    textAlign: "right",
                  }}
                >
                  Stok: {dataDetailProduct?.stock}
                </Text>
                <Text
                  style={{
                    color:
                      dataDetailProduct?.status === "Tidak Terverifikasi"
                        ? "red"
                        : "green",
                    fontSize: 12,
                  }}
                >
                  {dataDetailProduct?.status}
                </Text>
              </View>
            </View>

            {/* Product Name */}
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                marginBottom: 12,
                color: isDarkMode ? "#e5e7eb" : "#1a1a1a",
              }}
            >
              {dataDetailProduct?.name}
            </Text>

            {/* Shop Info */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 12,
                backgroundColor: isDarkMode ? "#1F2937" : "#f5f5f5",
                borderRadius: 8,
                marginBottom: 16,
              }}
            >
              <Ionicons
                name="storefront-outline"
                size={24}
                color={isDarkMode ? "#9ca3af" : "#666"}
              />
              <View style={{ marginLeft: 12 }}>
                <Text
                  style={{
                    fontWeight: "600",
                    color: isDarkMode ? "#e5e7eb" : "#1a1a1a",
                  }}
                >
                  {dataDetailProduct?.mall?.name}
                </Text>
                <Text
                  style={{
                    color: isDarkMode ? "#9ca3af" : "#666",
                    fontSize: 12,
                  }}
                >
                  {dataDetailProduct?.mall?.province}
                </Text>
              </View>
            </View>

            {/* Specifications */}
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  marginBottom: 8,
                  color: isDarkMode ? "#e5e7eb" : "#1a1a1a",
                }}
              >
                Spesifikasi
              </Text>
              {/* Basic Specs */}
              <View style={{ flexDirection: "row", marginBottom: 4 }}>
                <Text
                  style={{ width: 120, color: isDarkMode ? "#9ca3af" : "#666" }}
                >
                  Berat
                </Text>
                <Text style={{ color: isDarkMode ? "#d1d5db" : "#444" }}>
                  : {dataDetailProduct?.specification?.weight}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginBottom: 4 }}>
                <Text
                  style={{ width: 120, color: isDarkMode ? "#9ca3af" : "#666" }}
                >
                  Status
                </Text>
                <Text style={{ color: isDarkMode ? "#d1d5db" : "#444" }}>
                  : {dataDetailProduct?.specification?.statusKetersediaan}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginBottom: 4 }}>
                <Text
                  style={{ width: 120, color: isDarkMode ? "#9ca3af" : "#666" }}
                >
                  Produksi
                </Text>
                <Text style={{ color: isDarkMode ? "#d1d5db" : "#444" }}>
                  : {dataDetailProduct?.specification?.Produksi}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginBottom: 4 }}>
                <Text
                  style={{ width: 120, color: isDarkMode ? "#9ca3af" : "#666" }}
                >
                  Minimum Order
                </Text>
                <Text style={{ color: isDarkMode ? "#d1d5db" : "#444" }}>
                  : {dataDetailProduct?.specification?.minimumOrder}
                </Text>
              </View>

              {/* PPN Tag if exists */}
              {dataDetailProduct?.specification?.TagPPN && (
                <View
                  style={{
                    marginTop: 8,
                    padding: 8,
                    backgroundColor: isDarkMode ? "#1F2937" : "#f0f9ff",
                    borderRadius: 4,
                  }}
                >
                  <Text style={{ fontSize: 12, color: "#93C5FD" }}>
                    Tag PPN: {dataDetailProduct.specification.TagPPN}
                  </Text>
                </View>
              )}
            </View>

            {/* Description */}
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  marginBottom: 8,
                  color: isDarkMode ? "#e5e7eb" : "#1a1a1a",
                }}
              >
                Deskripsi Produk
              </Text>
              <Text
                style={{
                  lineHeight: 20,
                  color: isDarkMode ? "#d1d5db" : "#444",
                }}
              >
                {dataDetailProduct?.description?.replace(/<[^>]*>/g, "")}
              </Text>
            </View>

            {/* Categories */}
            {dataDetailProduct?.category?.length > 0 && (
              <View style={{ marginTop: 16 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    marginBottom: 8,
                    color: isDarkMode ? "#e5e7eb" : "#1a1a1a",
                  }}
                >
                  Kategori
                </Text>
                <View
                  style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}
                >
                  {dataDetailProduct.category.map((cat: any, index: number) => (
                    <View
                      key={cat.id}
                      style={{
                        backgroundColor: isDarkMode ? "#374151" : "#f5f5f5",
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 12,
                          color: isDarkMode ? "#d1d5db" : "#4a4a4a",
                        }}
                      >
                        {cat.title}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </ScrollView>

        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            padding: 16,
            marginLeft: 20,
            marginRight: 20,
            borderTopWidth: 1,
            borderTopColor: isDarkMode ? "#4b5563" : "#eee",
            backgroundColor: isDarkMode ? "#111827" : "white",
          }}
        >
          <TouchableOpacity
            disabled={dataDetailProduct?.status !== "Tidak Terverifikasi"}
            style={{
              backgroundColor: "#2196F3",
              padding: 14,
              width: "47%",
              borderRadius: 8,
              alignItems: "center",
            }}
            onPress={() => {
              setModalType("approve");
              setShowModal(true);
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>
              Approve Product
            </Text>
            <ConfirmationModal
              visible={showModal}
              onClose={() => {
                setShowModal(false);
              }}
              onConfirm={() => {
                console.log(`Product `);
              }}
              type={modalType}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "red",
              width: "47%",
              padding: 14,
              borderRadius: 8,
              alignItems: "center",
            }}
            onPress={() => {
              setModalType("reject");
              setShowModal(true);
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600" }}>
              Tolak Product
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
