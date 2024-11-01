import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  useColorScheme,
  Dimensions,
} from "react-native";
import { AlertCircle } from "lucide-react-native";

const { width } = Dimensions.get("window");

const ConfirmationModal = ({ visible, onClose, onConfirm, type }: any) => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <View
          style={{
            width: width - 40,
            backgroundColor: isDarkMode ? "#1F2937" : "#fff",
            borderRadius: 12,
            padding: 20,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: type === "approve" ? "#E3F2FD" : "#FFEBEE",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <AlertCircle
              size={30}
              color={type === "approve" ? "#2196F3" : "#F44336"}
            />
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: isDarkMode ? "#e5e7eb" : "#1a1a1a",
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            {type === "approve" ? "Approve Product" : "Tolak Product"}
          </Text>

          <Text
            style={{
              color: isDarkMode ? "#9ca3af" : "#666",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Apakah Anda yakin ingin{" "}
            {type === "approve" ? "menyetujui" : "menolak"} produk ini?
          </Text>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              gap: 12,
            }}
          >
            <TouchableOpacity
              onPress={onClose}
              style={{
                flex: 1,
                padding: 14,
                borderRadius: 8,
                backgroundColor: isDarkMode ? "#374151" : "#f5f5f5",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: isDarkMode ? "#e5e7eb" : "#666",
                  fontWeight: "600",
                }}
              >
                Batal
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              style={{
                flex: 1,
                padding: 14,
                borderRadius: 8,
                backgroundColor: type === "approve" ? "#2196F3" : "#F44336",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "600",
                }}
              >
                Ya, {type === "approve" ? "Setuju" : "Tolak"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;
