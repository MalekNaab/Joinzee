import React from "react";

import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { COLORS } from "../../constants/theme";

function getRole(item) {
  const type =
    item?.accountType ||
    item?.role ||
    item?.type ||
    "member";

  if (type === "young_person") {
    return "Young Person";
  }

  if (type === "young-person") {
    return "Young Person";
  }

  if (type === "parent") {
    return "Parent";
  }

  if (type === "coach") {
    return "Coach";
  }

  return String(type)
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

function getInitials(item) {
  const text =
    item?.name ||
    item?.email ||
    "Member";

  if (text.includes("@")) {
    return text
      .substring(0, 2)
      .toUpperCase();
  }

  return text
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function OrgMemberRow({
  item,
}) {
  const router = useRouter();

  const id =
    item?._id ||
    item?.id;

  const email =
    item?.email ||
    "";

  const name =
    item?.name ||
    "";

  const accountType =
    item?.accountType ||
    item?.role ||
    item?.type ||
    "";

  const openMember = () => {
    if (!id) {
      console.warn(
        "Cannot open member: missing id",
        item
      );
      return;
    }

    router.push({
      pathname:
        "/organisation-dashboard/member/[id]",
      params: {
        id: String(id),
        email: String(email),
        name: String(name),
        accountType: String(accountType),
      },
    });
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.row,
        pressed && styles.pressed,
      ]}
      onPress={openMember}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {getInitials(item)}
        </Text>
      </View>

      <View style={styles.details}>
        <Text style={styles.name}>
          {name || email || "Member"}
        </Text>

        <Text style={styles.role}>
          {getRole(item)}
        </Text>
      </View>

      <View style={styles.status}>
        <Text style={styles.statusText}>
          Active
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color={COLORS.white}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 70,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  pressed: {
    opacity: 0.7,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.purple,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: COLORS.white,
    fontWeight: "900",
    fontSize: 13,
  },

  details: {
    flex: 1,
    marginLeft: 12,
  },

  name: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "800",
  },

  role: {
    color: COLORS.secondary,
    fontSize: 10,
    marginTop: 3,
  },

  status: {
    backgroundColor: "rgba(34,197,94,0.22)",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 7,
    marginRight: 8,
  },

  statusText: {
    color: "#43F58E",
    fontSize: 9,
    fontWeight: "900",
  },
});
