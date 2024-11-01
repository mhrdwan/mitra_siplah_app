import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  SafeAreaView,
  useColorScheme,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

interface Store {
  id: string;
  name: string;
  ownerName: string;
  category: string;
  phone: string;
  city: string;
  registrationDate: string;
  status: "pending" | "approved" | "rejected";
  image: string;
  documents: {
    siup: boolean;
    npwp: boolean;
    ktp: boolean;
  };
}

interface FilterOption {
  label: string;
  value: string;
  count: number;
}

interface StoreCardProps {
  store: Store;
  theme: any;
}

interface FilterPillProps {
  label: string;
  value: string;
  count: number;
  isSelected: boolean;
  onPress: (value: string) => void;
  theme: any;
}

const StoreListScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === "dark";
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const theme = {
    background: isDarkMode ? "#1F2937" : "#FFFFFF",
    text: isDarkMode ? "#FFFFFF" : "#1F2937",
    secondaryText: isDarkMode ? "#9CA3AF" : "#6B7280",
    border: isDarkMode ? "#374151" : "#E5E7EB",
    cardBackground: isDarkMode ? "#374151" : "#FFFFFF",
    inputBackground: isDarkMode ? "#374151" : "#F9FAFB",
    filterPill: {
      background: isDarkMode ? "#374151" : "#FFFFFF",
      selectedBackground: "#3B82F6",
      text: isDarkMode ? "#D1D5DB" : "#6B7280",
      selectedText: "#FFFFFF",
    },
    infoBackground: isDarkMode ? "#283548" : "#F9FAFB",
  };

  const stores: Store[] = [
    {
      id: "TSA-2024-001",
      name: "Toko Sejahtera Abadi",
      ownerName: "Budi Santoso",
      category: "Sembako",
      phone: "0812-3456-7890",
      city: "Jakarta Selatan",
      registrationDate: "24 Oct 2024",
      status: "pending",
      image:
        "https://bertuahpos.com/wp-content/uploads/2022/09/IMG_20220929_195232_604.jpg",
      documents: {
        siup: true,
        npwp: true,
        ktp: true,
      },
    },
    {
      id: "TSA-2024-002",
      name: "Toko Sejahtera Abadi",
      ownerName: "Budi Santoso",
      category: "Sembako",
      phone: "0812-3456-7890",
      city: "Jakarta Selatan",
      registrationDate: "24 Oct 2024",
      status: "pending",
      image:
        "https://bertuahpos.com/wp-content/uploads/2022/09/IMG_20220929_195232_604.jpg",
      documents: {
        siup: true,
        npwp: true,
        ktp: true,
      },
    },
    {
      id: "TSA-2024-003",
      name: "Toko Sejahtera Abadi",
      ownerName: "Budi Santoso",
      category: "Sembako",
      phone: "0812-3456-7890",
      city: "Jakarta Selatan",
      registrationDate: "24 Oct 2024",
      status: "pending",
      image:
        "https://bertuahpos.com/wp-content/uploads/2022/09/IMG_20220929_195232_604.jpg",
      documents: {
        siup: true,
        npwp: true,
        ktp: true,
      },
    },
    {
      id: "TSA-2024-004",
      name: "Toko Sejahtera Abadi",
      ownerName: "Budi Santoso",
      category: "Sembako",
      phone: "0812-3456-7890",
      city: "Jakarta Selatan",
      registrationDate: "24 Oct 2024",
      status: "pending",
      image:
        "https://bertuahpos.com/wp-content/uploads/2022/09/IMG_20220929_195232_604.jpg",
      documents: {
        siup: true,
        npwp: true,
        ktp: true,
      },
    },
  ];

  const filterOptions: FilterOption[] = [
    { label: "Semua", value: "all", count: 24 },
    { label: "Menunggu", value: "pending", count: 12 },
    { label: "Disetujui", value: "approved", count: 8 },
    { label: "Ditolak", value: "rejected", count: 4 },
  ];

  const FilterPill: React.FC<FilterPillProps> = ({
    label,
    value,
    count,
    isSelected,
    onPress,
    theme,
  }) => (
    <TouchableOpacity
      onPress={() => onPress(value)}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: isSelected
          ? theme.filterPill.selectedBackground
          : theme.filterPill.background,
        borderWidth: 1,
        borderColor: isSelected
          ? theme.filterPill.selectedBackground
          : theme.border,
        marginRight: 8,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: "500",
          color: isSelected
            ? theme.filterPill.selectedText
            : theme.filterPill.text,
        }}
      >
        {`${label} (${count})`}
      </Text>
    </TouchableOpacity>
  );

  const StoreCard: React.FC<StoreCardProps> = ({ store, theme }) => {
    const getStatusConfig = (status: Store["status"]) => {
      const configs = {
        pending: {
          backgroundColor: "#FEF3C7",
          textColor: "#D97706",
          text: "Menunggu Review",
        },
        approved: {
          backgroundColor: "#DCFCE7",
          textColor: "#16A34A",
          text: "Disetujui",
        },
        rejected: {
          backgroundColor: "#FEE2E2",
          textColor: "#DC2626",
          text: "Ditolak",
        },
      };
      return configs[status];
    };

    const statusConfig = getStatusConfig(store.status);

    const DocumentBadge = ({ label }: { label: string }) => (
      <View
        style={{
          backgroundColor: "#DCFCE7",
          borderWidth: 1,
          borderColor: "#16A34A",
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 4,
          marginRight: 8,
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: "500",
            color: "#16A34A",
          }}
        >
          {label} ✓
        </Text>
      </View>
    );

    return (
      <View
        style={{
          backgroundColor: theme.cardBackground,
          borderRadius: 16,
          marginBottom: 24,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        <Image
          source={{ uri: store.image }}
          style={{
            width: "100%",
            height: 192,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
          resizeMode="cover"
        />

        <View style={{ padding: 16 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  marginBottom: 4,
                  color: theme.text,
                }}
              >
                {store.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    color: theme.secondaryText,
                  }}
                >
                  ID: {store.id}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: theme.secondaryText,
                    marginHorizontal: 8,
                  }}
                >
                  •
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: theme.secondaryText,
                  }}
                >
                  Daftar: {store.registrationDate}
                </Text>
              </View>
            </View>

            <View
              style={{
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 20,
                backgroundColor: statusConfig.backgroundColor,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "500",
                  color: statusConfig.textColor,
                }}
              >
                {statusConfig.text}
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: theme.infoBackground,
              borderRadius: 12,
              padding: 16,
              marginTop: 16,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginBottom: 12,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: theme.secondaryText,
                    marginBottom: 4,
                  }}
                >
                  Pemilik
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: theme.text,
                  }}
                >
                  {store.ownerName}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: theme.secondaryText,
                    marginBottom: 4,
                  }}
                >
                  Kategori
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: theme.text,
                  }}
                >
                  {store.category}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 12,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: theme.secondaryText,
                    marginBottom: 4,
                  }}
                >
                  Telepon
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: theme.text,
                  }}
                >
                  {store.phone}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: theme.secondaryText,
                    marginBottom: 4,
                  }}
                >
                  Kota
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "500",
                    color: theme.text,
                  }}
                >
                  {store.city}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 16 }}>
            <View
              style={{
                flexDirection: "row",
                marginBottom: 16,
              }}
            >
              {store.documents.siup && <DocumentBadge label="SIUP" />}
              {store.documents.npwp && <DocumentBadge label="NPWP" />}
              {store.documents.ktp && <DocumentBadge label="KTP" />}
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              {store.status === "pending" && (
                <>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#FEE2E2",
                      borderWidth: 1,
                      borderColor: "#DC2626",
                      borderRadius: 8,
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      marginRight: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: "#DC2626",
                        fontWeight: "500",
                      }}
                    >
                      Tolak
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#22C55E",
                      borderRadius: 8,
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      marginRight: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: "#FFFFFF",
                        fontWeight: "500",
                      }}
                    >
                      Setujui
                    </Text>
                  </TouchableOpacity>
                </>
              )}
              <TouchableOpacity
                style={{
                  backgroundColor: "#EFF6FF",
                  borderWidth: 1,
                  borderColor: "#3B82F6",
                  borderRadius: 8,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                }}
                onPress={() =>
                  router.push({
                    pathname: "components/Penyedia/detailPenyedia",
                    params: { name: store.name },
                  })
                }
              >
                <Text
                  style={{
                    color: "#3B82F6",
                    fontWeight: "500",
                  }}
                >
                  Detail
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.background,
      }}
    >
      <View
        style={{
          backgroundColor: theme.background,
          padding: 16,
          borderBottomWidth: 1,
          borderBottomColor: theme.border,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "600",
            marginBottom: 16,
            color: theme.text,
          }}
        >
          Daftar Pengajuan Toko
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: theme.inputBackground,
            borderWidth: 1,
            borderColor: theme.border,
            borderRadius: 12,
            paddingHorizontal: 12,
            marginBottom: 16,
          }}
        >
          <Ionicons name="search" size={20} color={theme.secondaryText} />
          <TextInput
            style={{
              flex: 1,
              paddingVertical: 12,
              marginLeft: 8,
              color: theme.text,
            }}
            placeholder="Cari toko..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={theme.secondaryText}
          />
        </View>

        <FlatList
          horizontal
          data={filterOptions}
          keyExtractor={(item) => item.value}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <FilterPill
              {...item}
              isSelected={selectedFilter === item.value}
              onPress={setSelectedFilter}
              theme={theme}
            />
          )}
          style={{ flexGrow: 0, marginBottom: 8 }}
        />
      </View>

      <FlatList
        data={stores}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <StoreCard store={item} theme={theme} />}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
};

export default StoreListScreen;
