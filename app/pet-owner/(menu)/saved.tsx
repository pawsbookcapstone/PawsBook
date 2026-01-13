import { Colors } from "@/shared/colors/Colors";
import HeaderWithActions from "@/shared/components/HeaderSet";
import HeaderLayout from "@/shared/components/MainHeaderLayout";
import { screens, ShadowStyle } from "@/shared/styles/styles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

type PostItem = {
  id: string;
  title: string;
  images: string[];
  description: string;
  time: string;
};

type MarketplaceItem = {
  id: string;
  name: string;
  price: string;
  images: string[];
  description: string;
};

type SavedItem = PostItem | MarketplaceItem;

const dummyPosts: PostItem[] = [
  {
    id: "1",
    title: "Cute Puppy Moments",
    images: [
      "https://placedog.net/400/300?id=1",
      "https://placedog.net/400/301?id=2",
      "https://placedog.net/400/302?id=3",
      "https://placedog.net/400/303?id=4",
    ],
    description: "Watch these adorable pups having fun at the park!",
    time: "2h ago",
  },
  {
    id: "2",
    title: "Funny Cat Series",
    images: [
      "https://placekitten.com/400/300",
      "https://placekitten.com/401/300",
      "https://placekitten.com/402/300",
    ],
    description: "These cats never fail to make me laugh 😂",
    time: "5h ago",
  },
];

const dummyMarketplace: MarketplaceItem[] = [
  {
    id: "1",
    name: "Pet Collar Set",
    price: "$20",
    images: [
      "https://placedog.net/400/300?id=5",
      "https://placedog.net/401/300?id=6",
    ],
    description: "Stylish and comfy collars for your pets 🐾",
  },
  {
    id: "2",
    name: "Cat Scratcher",
    price: "$25",
    images: [
      "https://placekitten.com/400/301",
      "https://placekitten.com/400/302",
      "https://placekitten.com/400/303",
    ],
    description: "Keep your cat happy and your furniture safe!",
  },
];

const Saved = () => {
  const [activeTab, setActiveTab] = useState<"Posts" | "Marketplace">("Posts");
  const [posts, setPosts] = useState(dummyPosts);
  const [marketplace, setMarketplace] = useState(dummyMarketplace);

  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedPostImages, setSelectedPostImages] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openImageModal = (images: string[], index: number) => {
    setSelectedPostImages(images);
    setSelectedIndex(index);
    setImageModalVisible(true);
  };

  const removeItem = (id: string) => {
    if (activeTab === "Posts") setPosts(posts.filter((p) => p.id !== id));
    else setMarketplace(marketplace.filter((m) => m.id !== id));
  };

  const renderItem = ({ item }: { item: SavedItem }) => {
    const images =
      activeTab === "Posts"
        ? (item as PostItem).images
        : (item as MarketplaceItem).images;

    const maxImagesToShow = 4;
    const extraImages = images.length - maxImagesToShow;

    return (
      <View style={styles.card}>
        {/* 🧩 Image Grid */}
 {/* 🧩 Image Grid */}
{images.length > 0 && (
  <View style={styles.imageGrid}>
    {images.slice(0, 3).map((img, idx) => {
      const extraImages = images.length - 3;
      return (
        <TouchableOpacity
          key={idx}
          style={styles.imageWrapper}
          onPress={() => openImageModal(images, idx)}
          activeOpacity={0.8}
        >
          <Image
            source={{ uri: img }}
            style={styles.gridImage}
            resizeMode="cover"
          />
          {idx === 2 && extraImages > 0 && (
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>+{extraImages}</Text>
            </View>
          )}
        </TouchableOpacity>
      );
    })}
  </View>
)}


        <View style={styles.content}>
          <Text style={styles.title}>
            {activeTab === "Posts"
              ? (item as PostItem).title
              : (item as MarketplaceItem).name}
          </Text>
          <Text style={styles.description}>{item.description}</Text>

          {activeTab === "Posts" && (
            <Text style={styles.time}>{(item as PostItem).time}</Text>
          )}
          {activeTab === "Marketplace" && (
            <Text style={styles.price}>{(item as MarketplaceItem).price}</Text>
          )}
        </View>

        {/* 🗑️ Trash Button */}
        <TouchableOpacity
          style={styles.trashButton}
          onPress={() => removeItem(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color={Colors.white} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={screens.screen}>
      <HeaderLayout noBorderRadius bottomBorder>
        <HeaderWithActions
          title="Saved"
          onBack={() => router.back()}
          centerTitle
        />
      </HeaderLayout>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === "Posts" && styles.activeTab]}
          onPress={() => setActiveTab("Posts")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Posts" && styles.activeTabText,
            ]}
          >
            Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "Marketplace" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("Marketplace")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "Marketplace" && styles.activeTabText,
            ]}
          >
            Marketplace
          </Text>
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={activeTab === "Posts" ? posts : marketplace}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No saved items in this category.
            </Text>
          </View>
        }
      />

      {/* 🖼️ Modal Viewer */}
      {imageModalVisible && (
        <Modal visible={imageModalVisible} transparent>
          <View style={styles.modalBackground}>
            <FlatList
              data={selectedPostImages}
              horizontal
              pagingEnabled
              initialScrollIndex={selectedIndex}
              getItemLayout={(_, index) => ({
                length: Dimensions.get("window").width,
                offset: Dimensions.get("window").width * index,
                index,
              })}
              keyExtractor={(_, i) => i.toString()}
              renderItem={({ item }) => (
                <View style={styles.fullImageWrapper}>
                  <Image
                    source={{ uri: item }}
                    style={styles.fullImage}
                    resizeMode="contain"
                  />
                </View>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setImageModalVisible(false)}
            >
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Saved;

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    marginLeft: 15,
    gap: 10,
    marginTop: 15,
    marginBottom: 10,
  },
  tabButton: {
    paddingHorizontal: 25,
    paddingVertical: 8,
    backgroundColor: "#d9d9d9",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    fontSize: 15,
    fontFamily: "RobotoSemiBold",
    color: "#000",
  },
  activeTabText: {
    color: Colors.white,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    marginBottom: 16,
    overflow: "hidden",
    ...ShadowStyle,
  },
  imageGrid: {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 5,
  marginTop: 10,
  paddingHorizontal: 10,
},
imageWrapper: {
  width: "32%",
  aspectRatio: 1,
  borderRadius: 8,
  overflow: "hidden",
  position: "relative",
},
gridImage: {
  width: "100%",
  height: "100%",
},
overlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: "rgba(0,0,0,0.5)",
  justifyContent: "center",
  alignItems: "center",
},
overlayText: {
  color: "white",
  fontSize: 18,
  fontWeight: "600",
},

  content: {
    padding: 16,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: Colors.black,
  },
  description: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 8,
    lineHeight: 20,
  },
  time: {
    fontSize: 12,
    color: "#999",
    marginTop: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.primary,
    marginTop: 6,
  },
  trashButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 6,
    ...ShadowStyle,
  },
  emptyContainer: {
    marginTop: 80,
    alignItems: "center",
  },
  emptyText: {
    color: Colors.gray,
    fontSize: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImageWrapper: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "90%",
    height: "70%",
    borderRadius: 12,
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    padding: 10,
  },
  closeText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
