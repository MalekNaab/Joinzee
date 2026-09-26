import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";

import { useRouter } from "expo-router";

import JoinziieLogo from "../../components/JoinziieLogo";

import { COLORS } from "../../constants/theme";
import { useSignup } from "../../context/SignupContext";

const menuItems = [
  "Personal Details",
  "Preferences",
  "Location & Distance",
  "Notifications",
  "Safety & Privacy",
  "Help & Support",
];

export default function ProfileScreen() {
  const router = useRouter();

  const { signupData } = useSignup();

  const isParent =
    signupData.accountType === "parent";

  const name = isParent
    ? signupData.parent.fullName || "Sarah Johnson"
    : signupData.youngPerson.fullName ||
      "Jayden Smith";

  const email = isParent
    ? signupData.parent.email ||
      "sarah@example.com"
    : signupData.youngPerson.email ||
      "jayden@example.com";

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <JoinziieLogo />

        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {name.charAt(0).toUpperCase()}
            </Text>
          </View>

          <Text style={styles.name}>
            {name}
          </Text>

          <Text style={styles.accountType}>
            {isParent
              ? "Parent / Guardian"
              : "Young Person"}
          </Text>

          <Text style={styles.email}>
            {email}
          </Text>
        </View>

        {isParent && (
          <View style={styles.childCard}>
            <View>
              <Text style={styles.childLabel}>
                Child profile
              </Text>

              <Text style={styles.childName}>
                {signupData.child.fullName ||
                  "Daniel Johnson"}
              </Text>
            </View>

            <Text style={styles.manage}>
              Manage
            </Text>
          </View>
        )}

        <View style={styles.menu}>
          {menuItems.map((item) => (
            <Pressable
              key={item}
              style={styles.menuItem}
            >
              <Text style={styles.menuText}>
                {item}
              </Text>

              <Text style={styles.chevron}>
                ›
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={styles.logout}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.logoutText}>
            Log Out
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    padding: 18,
    paddingBottom: 35,
  },

  profile: {
    alignItems: "center",
    marginTop: 30,
    marginBottom: 23,
  },

  avatar: {
    width: 76,
    height: 76,
    borderRadius: 50,
    backgroundColor: "#17103A",
    borderWidth: 1,
    borderColor: COLORS.pink,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: COLORS.white,
    fontSize: 29,
    fontWeight: "900",
  },

  name: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "900",
    marginTop: 13,
  },

  accountType: {
    color: COLORS.pink,
    fontSize: 10,
    marginTop: 4,
  },

  email: {
    color: COLORS.secondary,
    fontSize: 10,
    marginTop: 4,
  },

  childCard: {
    minHeight: 66,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    marginBottom: 16,
  },

  childLabel: {
    color: COLORS.muted,
    fontSize: 9,
  },

  childName: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 3,
  },

  manage: {
    color: COLORS.pink,
    fontSize: 10,
    fontWeight: "700",
  },

  menu: {
    gap: 8,
  },

  menuItem: {
    minHeight: 52,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
  },

  menuText: {
    color: COLORS.white,
    fontSize: 11,
  },

  chevron: {
    color: COLORS.secondary,
    fontSize: 20,
  },

  logout: {
    minHeight: 48,
    marginTop: 22,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.danger,
    alignItems: "center",
    justifyContent: "center",
  },

  logoutText: {
    color: COLORS.danger,
    fontWeight: "800",
    fontSize: 11,
  },
});
