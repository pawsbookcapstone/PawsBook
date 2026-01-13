import { Colors } from "@/shared/colors/Colors";
import HeaderWithActions from "@/shared/components/HeaderSet";
import HeaderLayout from "@/shared/components/MainHeaderLayout";
import { screens } from "@/shared/styles/styles";
import { Octicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const categories = ["Dogs", "Cats", "Food", "Accessories"];
const conditions = ["New", "Like New", "Used", "Old"];

const Sell = () => {
  const { address } = useLocalSearchParams();
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
    name: string;
  } | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState<string[]>([]);
  const [modalType, setModalType] = useState<"category" | "condition">(
    "category"
  );

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uris = result.assets.map((asset) => asset.uri);
      setImages(uris);
    }
  };

  const openModal = (type: "category" | "condition") => {
    setModalType(type);
    setModalOptions(type === "category" ? categories : conditions);
    setModalVisible(true);
  };

  const handleSelectOption = (option: string) => {
    if (modalType === "category") setCategory(option);
    else setCondition(option);
    setModalVisible(false);
  };

  const handlePublish = () => {
    if (
      !images.length ||
      !title ||
      !price ||
      !description ||
      !category ||
      !condition ||
      !location
    ) {
      alert("Please fill all required fields.");
      return;
    }

    console.log({
      images,
      title,
      price,
      category,
      condition,
      description,
      location,
    });
    alert("Item published!");
  };

  const removeImage = (uri: string) => {
    setImages((prev) => prev.filter((img) => img !== uri));
  };

  return (
    <ScrollView
      style={screens.screen}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <HeaderLayout noBorderRadius bottomBorder>
        <HeaderWithActions
          title="Sell Item"
          onBack={() => router.back()}
          centerTitle={false}
        />
        <TouchableOpacity style={styles.publishBtn} onPress={handlePublish}>
          <Text style={styles.publishText}>Publish</Text>
        </TouchableOpacity>
      </HeaderLayout>

      <View style={styles.formContainer}>
        {/* Images Carousel */}
        <View style={styles.imageCard}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          >
            <TouchableOpacity onPress={pickImage} style={styles.addImageBtn}>
              <Text style={{ fontSize: 28, color: "#888" }}>+</Text>
              <Text style={{ fontSize: 12, color: "#888" }}>Add Photos</Text>
            </TouchableOpacity>

            {images.map((img, index) => (
              <View key={index} style={styles.imageWrapper}>
                <Image source={{ uri: img }} style={styles.selectedImage} />
                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => removeImage(img)}
                >
                  <Text style={{ color: "#fff", fontSize: 12 }}>X</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Input Fields */}
        <View style={styles.inputCard}>
          <TextInput
            placeholder="Title"
            style={styles.input}
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            placeholder="Price"
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.selectionBtn}
            onPress={() => openModal("category")}
          >
            <Text style={{ color: category ? "#000" : "#888" }}>
              {category || "Select Category"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.selectionBtn}
            onPress={() => openModal("condition")}
          >
            <Text style={{ color: condition ? "#000" : "#888" }}>
              {condition || "Select Condition"}
            </Text>
          </TouchableOpacity>
          <TextInput
            placeholder="Description"
            style={[styles.input, { height: 120 }]}
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>

        {/* Location Card */}
        <View style={styles.locationCard}>
          <Octicons name="location" size={22} color={Colors.primary} />
          <Text style={styles.locationText}>{address}</Text>
          <TouchableOpacity
            onPress={() => router.push("/pet-owner/(market)/map")}
          >
            <Text style={styles.locationBtn}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal */}
      <Modal transparent visible={modalVisible} animationType="slide">
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {modalType === "category"
                ? "Select Category"
                : "Select Condition"}
            </Text>
            <FlatList
              data={modalOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => handleSelectOption(item)}
                >
                  <Text style={styles.modalOptionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </ScrollView>
  );
};

export default Sell;

const styles = StyleSheet.create({
  publishBtn: {
    position: "absolute",
    right: 15,
    top: 35,
    backgroundColor: Colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  publishText: { color: "#fff", fontWeight: "600", fontSize: 14 },
  formContainer: { padding: 20, gap: 20 },
  imageCard: {
    minHeight: 150,
    borderRadius: 15,
    backgroundColor: "#fafafa",
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  addImageBtn: {
    width: 100,
    height: 120,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
  },
  imageWrapper: { position: "relative", marginHorizontal: 6 },
  selectedImage: {
    width: 100,
    height: 120,
    borderRadius: 12,
    resizeMode: "cover",
  },
  removeBtn: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(0,0,0,0.7)",
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
  inputCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 16,
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 48,
    fontSize: 15,
    backgroundColor: "#fafafa",
  },
  selectionBtn: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
    height: 48,
    justifyContent: "center",
    paddingHorizontal: 14,
    backgroundColor: "#fafafa",
  },
  locationCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    gap: 10,
  },
  locationText: { flex: 1, fontSize: 15, fontFamily: "Roboto", color: "#555" },
  locationBtn: { fontSize: 15, fontFamily: "Roboto", color: Colors.primary },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    maxHeight: "50%",
  },
  modalTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
  modalOption: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalOptionText: { fontSize: 15 },
});
