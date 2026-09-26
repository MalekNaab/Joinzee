import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import JoinziieLogo from "../JoinziieLogo";
import { COLORS, GRADIENT } from "../../constants/theme";

export default function OrgDashboardLayout({
  title,
  subtitle,
  actionTitle = "View Profile",
  actionVariant = "outline",
  children,
}) {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <Pressable style={styles.iconButton}>
            <Ionicons
              name="menu-outline"
              size={27}
              color={COLORS.white}
            />
          </Pressable>

          <JoinziieLogo />

          <Pressable style={styles.iconButton}>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={COLORS.white}
            />
            <View style={styles.dot} />
          </Pressable>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.logoCard}>
            <Text style={styles.logoWhite}>1WAYFIT</Text>
            <Text style={styles.logoRed}>MMA</Text>
          </View>

          <View style={styles.summaryText}>
            <Text style={styles.welcome}>Welcome back,</Text>
            <Text style={styles.orgName}>1WAYFIT MMA</Text>
            <Text style={styles.orgType}>Organisation</Text>

            <View style={styles.verifiedPill}>
              <Ionicons
                name="checkmark-circle"
                size={18}
                color="#0B2213"
              />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          </View>

          {actionVariant === "gradient" ? (
            <Pressable style={styles.actionWrap} onPress={() => actionTitle === "Create Session" ? router.push("/organisation-dashboard/create-session") : null}>
              <LinearGradient
                colors={GRADIENT}
                style={styles.gradientAction}
              >
                <Text style={styles.gradientActionText}>
                  {actionTitle}
                </Text>
              </LinearGradient>
            </Pressable>
          ) : (
            <Pressable style={styles.outlineAction} onPress={() => router.push("/organisation-dashboard/profile")}>
              <Text style={styles.outlineActionText}>
                {actionTitle}
              </Text>
            </Pressable>
          )}
        </View>

        {!!title && (
          <View style={styles.pageHeader}>
            <Text style={styles.pageTitle}>{title}</Text>
            {!!subtitle && (
              <Text style={styles.pageSubtitle}>{subtitle}</Text>
            )}
          </View>
        )}

        {children}
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
    maxWidth: 480,
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  iconButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  dot: {
    position: "absolute",
    right: 8,
    top: 7,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FF3B73",
  },

  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  logoCard: {
    width: 82,
    height: 82,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#040404",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  logoWhite: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "900",
    fontStyle: "italic",
  },

  logoRed: {
    color: "#FF1B1B",
    fontSize: 16,
    fontWeight: "900",
    fontStyle: "italic",
    marginTop: -2,
  },

  summaryText: {
    flex: 1,
  },

  welcome: {
    color: COLORS.secondary,
    fontSize: 11,
  },

  orgName: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "900",
    marginTop: 2,
  },

  orgType: {
    color: COLORS.secondary,
    fontSize: 12,
    marginTop: 2,
  },

  verifiedPill: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#39D96F",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 6,
  },

  verifiedText: {
    color: "#0B2213",
    fontSize: 11,
    fontWeight: "800",
  },

  actionWrap: {
    marginLeft: 10,
  },

  gradientAction: {
    minWidth: 128,
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  gradientActionText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "800",
  },

  outlineAction: {
    minWidth: 110,
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "rgba(255,255,255,0.03)",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    marginLeft: 10,
  },

  outlineActionText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "700",
  },

  pageHeader: {
    marginBottom: 14,
  },

  pageTitle: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: "900",
  },

  pageSubtitle: {
    color: COLORS.secondary,
    fontSize: 14,
    marginTop: 4,
  },
});



