import { ApiZustand } from "@/types/apiZustand.d";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert } from "react-native";
import { create } from "zustand";

export const apiListProduct = create<ApiZustand>()((set) => ({
  data1: [],
  dataDetailProduct: [],
  fetchProductList: async ({ page = 1, limit = 10, keyword ="",status="waiting"}) => {
    try {
      const response = await fetch(
        `https://siplahstagingapi.eurekagroup.id/mitra/product/get-product?limit=${limit}&page=${page}&keyword=${keyword}&status=${status}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      set({ data1: data?.data });
    } catch (error) {
      console.error("Failed to fetch data1:", error);
    }
  },
  kirimID: async ({ id_expo }) => {
    const body = JSON.stringify({ id_expo });
    try {
      const response = await fetch(
        `https://siplahstagingapi.eurekagroup.id/notif/send-id`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
          body,
        }
      );

      const data = await response.json();
      console.log(data);
      set({ data1: data.data });
    } catch (error) {
      console.error("Failed to fetch data1:", error);
    }
  },

  detailProduct: async ({ id }) => {
    try {
      const response = await fetch(
        `https://siplahstagingapi.eurekagroup.id/mitra/product/get-product-detail?id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      set({ dataDetailProduct: data.data || [] });
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch datadetailProduct:", error);
    }
  },
  approveProduct: async ({ id }) => {
    try {
      const response = await fetch(
        `https://siplahstagingapi.eurekagroup.id/mitra/verified-product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
          body: JSON.stringify({ id }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch datadetailProduct:", error);
    }
  },
  blockProduct: async ({ id }) => {
    try {
      const response = await fetch(
        `https://siplahstagingapi.eurekagroup.id/mitra/block-product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
          },
          body: JSON.stringify({ id }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Failed to fetch datadetailProduct:", error);
    }
  },
  login: async ({ email, password }) => {
    try {
      const response = await fetch(
        `https://siplahstagingapi.eurekagroup.id/mitra/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (data.status.code == 400) {
        Alert.alert(data.status.message);
        return data.status.code;
      } else if (data.status.code == 200) {
        try {
          await AsyncStorage.setItem("token", data.data.token);
          const savedToken = await AsyncStorage.getItem("token");
          console.log("ini token:", savedToken);
          router.replace("/(tabs)/dashboard");
        } catch (error) {
          console.error("Error:", error);
          Alert.alert("Error", "Gagal menyimpan token");
        }
      }
    } catch (error) {
      Alert.alert("Failed to");
      console.error("Failed to fetch datadetailProduct:", error);
    }
  },
}));
