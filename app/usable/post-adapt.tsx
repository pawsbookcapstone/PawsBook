import { Colors } from "@/shared/colors/Colors";
import HeaderWithActions from "@/shared/components/HeaderSet";
import HeaderLayout from "@/shared/components/MainHeaderLayout";
import { screens } from "@/shared/styles/styles";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const CreateAdoptionPost = () => {
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handlePost = () => {
    console.log("Adoption Post Created:", { image, caption });
    router.back();
  };

  return (
    <View style={[screens.screen, { backgroundColor: "#fff", flex: 1 }]}>
      {/* Header */}
      <HeaderLayout noBorderRadius bottomBorder>
        <HeaderWithActions
          title="Create Adoption Post"
          onBack={() => router.back()}
          centerTitle
        />
      </HeaderLayout>

      <View style={styles.container}>
        {/* Caption */}
        <Text style={styles.label}>Caption</Text>
        <TextInput
          style={styles.input}
          placeholder="Write something about your pet..."
          multiline
          value={caption}
          onChangeText={setCaption}
        />

        {/* Image Picker */}
        <Text style={styles.label}>Pet Photo</Text>
        <Pressable style={styles.imagePicker} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          ) : (
            <Feather name="camera" size={28} color="#9CA3AF" />
          )}
        </Pressable>

        {/* Post Button */}
        <Pressable
          style={[styles.postBtn, { opacity: caption ? 1 : 0.7 }]}
          onPress={handlePost}
          disabled={!caption}
        >
          <Text style={styles.postBtnText}>Post</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CreateAdoptionPost;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 12,
    textAlignVertical: "top",
    minHeight: 100,
    marginBottom: 16,
  },
  imagePicker: {
    height: 180,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    backgroundColor: "#F9FAFB",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  postBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  postBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
