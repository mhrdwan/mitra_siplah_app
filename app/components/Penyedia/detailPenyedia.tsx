import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  Platform,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const StoreDetailScreen = () => {
  const isDarkMode = useColorScheme() === "dark";

  const theme = {
    primary: "#3B82F6",
    secondary: "#10B981",
    background: {
      light: "#FFFFFF",
      dark: "#121212",
    },
    text: {
      primary: {
        light: "#1F2937",
        dark: "#FFFFFF",
      },
      secondary: {
        light: "#6B7280",
        dark: "#9CA3AF",
      },
    },
    card: {
      background: {
        light: "#FFFFFF",
        dark: "#1F2937",
      },
      border: {
        light: "#E5E7EB",
        dark: "#2C2C2C",
      },
    },
  };

  const storeData = {
    name: "Fotocopy Yazid",
    businessType: "Individu",
    category: "1",
    businessStatus: "Non-PKP",
    npwp: "074206988313000",
    siup: "2007230103417",
    email: "fotocopyyazid026@gmail.com",
    documents: {
      npwpImage:
        "https://klikpajak.id/wp-content/uploads/2019/02/Klikpajak_Blog_ketahui-pengertian-fungsi-manfaat-dan-arti-kode-npwp-secara-lengkap2.jpg",
      ktpImage:
        "https://cdn-oss.ginee.com/official/wp-content/uploads/2022/01/image-4290.png",
      siupImage:
        "https://blogkoinworks.sgp1.digitaloceanspaces.com/2020/03/SIUP-PT-671x1024.png",
    },
    pic: {
      name: "Dinson",
      position: "Pemilik",
      phone: "085289389216",
    },
    address:
      "BTN KEBAN AGUNG BLOK A.25 NO. 08, KEBAN AGUNG-LAWANG KIDUL, MUARA ENIM",
    location:
      "6RX3+JWF, Jl. Saili, Tegal Rejo, Kec. Lawang Kidul, Kabupaten Muara Enim, Sumatera Selatan 31711, Indonesia",
    bankAccount: {
      bank: "BANK MANDIRI",
      accountName: "Dinson",
      accountNumber: "1120005930339",
      branch: "Tanjung Enim",
    },
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: isDarkMode ? theme.background.dark : theme.background.light,
    },
    container: {
      flex: 1,
      backgroundColor:isDarkMode ? theme.background.dark : theme.background.light,
    },
    header: {
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: isDarkMode ? theme.background.dark : theme.background.light,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? theme.card.border.dark : theme.card.border.light,
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 22,
      fontWeight: "700",
      color: isDarkMode ? theme.text.primary.dark : theme.text.primary.light,
      marginLeft: 10,
    },
    sectionContainer: {
      backgroundColor: isDarkMode ? theme.card.background.dark : theme.card.background.light,
      borderRadius: 16,
      padding: 20,
      marginHorizontal: 16,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: isDarkMode ? theme.card.border.dark : theme.card.border.light,
      ...Platform.select({
        android: {
          elevation: 3,
        },
        ios: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
      }),
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: isDarkMode ? theme.text.primary.dark : theme.text.primary.light,
      marginLeft: 10,
    },
    infoContainer: {
      backgroundColor: isDarkMode ? "#1C1C1E" : "#F8FAFC",
      padding: 16,
      borderRadius: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: isDarkMode ? "#2C2C2E" : "#E5E7EB",
    },
    label: {
      fontSize: 13,
      color: isDarkMode ? theme.text.secondary.dark : theme.text.secondary.light,
      marginBottom: 4,
      fontWeight: "500",
    },
    value: {
      fontSize: 15,
      color: isDarkMode ? theme.text.primary.dark : theme.text.primary.light,
      fontWeight: "500",
    },
    documentImage: {
      width: "100%",
      height: 200,
      borderRadius: 8,
      marginTop: 8,
      backgroundColor: isDarkMode ? "#2C2C2E" : "#E5E7EB",
    },
    mapButton: {
      backgroundColor: isDarkMode ? theme.primary + "20" : "#EBF8FF",
      padding: 12,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 8,
      borderWidth: 1,
      borderColor: isDarkMode ? theme.primary + "30" : "transparent",
    },
    mapButtonText: {
      color: isDarkMode ? theme.primary : "#3182CE",
      fontWeight: "600",
      marginLeft: 8,
    },
    icon: {
      color: isDarkMode ? theme.text.secondary.dark : theme.text.secondary.light,
    },
    documentContainer: {
        backgroundColor: "#F8FAFC",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
      },
    //   documentImage: {
    //     width: "100%",
    //     height: 200,
    //     borderRadius: 8,
    //     marginTop: 8,
    //   },
      documentLabel: {
        fontSize: 14,
        fontWeight: "600",
        color: "#2D3748",
        marginBottom: 8,
      },
  });

  const renderInfoItem = (label: string, value: string) => (
    <View style={styles.infoContainer}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );

  const renderDocumentImage = (title: string, imagePath: string) => (
    <View style={styles.documentContainer}>
      <Text style={styles.documentLabel}>{title}</Text>
      <Image
        source={{ uri: imagePath }}
        style={styles.documentImage}
        resizeMode="cover"
      />
    </View>
  );

  const renderSection = (
    title: string,
    icon: any,
    children: React.ReactNode
  ) => (
    <View style={styles.sectionContainer}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
      >
        <Ionicons name={icon} size={24} style={styles.icon} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {children}
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea,{ backgroundColor: isDarkMode ? "#111827" : "#f3f4f6" },]}>
    <ScrollView style={styles.container}>
      {renderSection(
        "Profil Toko",
        "business-outline",
        <>
          {renderInfoItem("Nama Toko", storeData.name)}
          <View >
            <View style={{ flex: 1 }}>
              {renderInfoItem("Jenis Usaha", storeData.businessType)}
            </View>
            <View style={{ flex: 1 }}>
              {renderInfoItem("Status Usaha", storeData.businessStatus)}
            </View>
          </View>
          {renderInfoItem("Kategori", storeData.category)}
        </>
      )}

      {renderSection(
        "Dokumen Legal",
        "document-text-outline",
        <>
          {renderInfoItem("NPWP", storeData.npwp)}
          {renderDocumentImage("Foto NPWP", storeData.documents.npwpImage)}
          {renderInfoItem("SIUP/NIB", storeData.siup)}
          {renderDocumentImage("Foto SIUP", storeData.documents.siupImage)}
          {renderDocumentImage("Foto KTP", storeData.documents.ktpImage)}
          {renderInfoItem("Email Toko", storeData.email)}
        </>
      )}

      {renderSection(
        "Penanggung Jawab",
        "person-outline",
        <>
          {renderInfoItem("Nama PIC", storeData.pic.name)}
          <View >
            <View style={{ flex: 1 }}>
              {renderInfoItem("Jabatan", storeData.pic.position)}
            </View>
            <View style={{ flex: 1 }}>
              {renderInfoItem("No. Telp", storeData.pic.phone)}
            </View>
          </View>
        </>
      )}

      {renderSection(
        "Lokasi Toko",
        "location-outline",
        <>
          {renderInfoItem("Alamat", storeData.address)}
          {renderInfoItem("Lokasi Google Maps", storeData.location)}
          <TouchableOpacity style={styles.mapButton}>
            <Ionicons name="map-outline" size={20} color="#3182CE" />
            <Text style={styles.mapButtonText}>Buka di Google Maps</Text>
          </TouchableOpacity>
        </>
      )}

      {renderSection(
        "Rekening Bank",
        "card-outline",
        <>
          {renderInfoItem("Bank", storeData.bankAccount.bank)}
          {renderInfoItem("Atas Nama", storeData.bankAccount.accountName)}
          {renderInfoItem(
            "Nomor Rekening",
            storeData.bankAccount.accountNumber
          )}
          {renderInfoItem("Cabang", storeData.bankAccount.branch)}
        </>
      )}
    </ScrollView>
    </SafeAreaView>
  );
};

export default StoreDetailScreen;
