import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import JoinziieLogo from "../../../components/JoinziieLogo";
import { COLORS } from "../../../constants/theme";

const mainItems = [
  {
    id: "profile",
    icon: "business-outline",
    title: "Organisation Profile",
    subtitle: "Update your organisation details",
  },

  {
    id: "verification",
    icon: "shield-checkmark-outline",
    title: "Verification & Documents",
    subtitle: "Manage your verification status",
    verified: true,
  },

  {
    id: "staff",
    icon: "people-outline",
    title: "Staff & Roles",
    subtitle: "Manage your team and permissions",
  },

  {
    id: "billing",
    icon: "card-outline",
    title: "Payments & Billing",
    subtitle: "View invoices and manage payments",
  },

  {
    id: "analytics",
    icon: "bar-chart-outline",
    title: "Reports & Analytics",
    subtitle: "View insights and organisation growth",
  },

  {
    id: "safety",
    icon: "shield-outline",
    title: "Safeguarding & Safety",
    subtitle: "Access resources and policies",
  },
];

const secondaryItems = [
  {
    id: "support",
    icon: "help-circle-outline",
    title: "Help & Support",
    subtitle: "Get help or contact our team",
  },

  {
    id: "logout",
    icon: "log-out-outline",
    title: "Log Out",
    subtitle: "Sign out of your organisation account",
  },
];

export default function OrganisationMoreScreen() {
  const router = useRouter();

  const handleItem = (id) => {
    if (id === "logout") {
      router.replace("/");
      return;
    }

    if (id === "verification") {
      // Later we will connect this to the verification flow.
      return;
    }
  };

  const renderRow = (item, index, total) => {
    return (
      <Pressable
        key={item.id}
        onPress={() => handleItem(item.id)}
        style={[
          styles.row,
          index !== total - 1 &&
            styles.rowBorder,
        ]}
      >
        <View style={styles.iconBox}>
          <Ionicons
            name={item.icon}
            size={26}
            color={COLORS.white}
          />
        </View>

        <View style={styles.rowContent}>
          <Text style={styles.rowTitle}>
            {item.title}
          </Text>

          <Text style={styles.rowSubtitle}>
            {item.subtitle}
          </Text>
        </View>

        {item.verified && (
          <View style={styles.verifiedSmall}>
            <Text style={styles.verifiedSmallText}>
              Verified
            </Text>
          </View>
        )}

        <Ionicons
          name="chevron-forward"
          size={22}
          color="#D5DCEB"
        />
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* TOP BAR */}

        <View style={styles.topBar}>
          <Pressable style={styles.topButton}>
            <Ionicons
              name="menu-outline"
              size={31}
              color={COLORS.white}
            />
          </Pressable>

          <JoinziieLogo />

          <Pressable style={styles.topButton}>
            <Ionicons
              name="notifications-outline"
              size={27}
              color={COLORS.white}
            />

            <View style={styles.notificationDot} />
          </Pressable>
        </View>

        {/* ORGANISATION HEADER */}

        <View style={styles.organisationHeader}>
          <View style={styles.logoCard}>
            <Text style={styles.logoWhite}>
              1WAYFIT
            </Text>

            <Text style={styles.logoRed}>
              MMA
            </Text>
          </View>

          <View style={styles.organisationInfo}>
            <Text style={styles.welcome}>
              Welcome back,
            </Text>

            <Text style={styles.organisationName}>
              1WAYFIT{"\n"}MMA
            </Text>

            <Text style={styles.organisationType}>
              Organisation
            </Text>

            <View style={styles.verified}>
              <Ionicons
                name="checkmark-circle"
                size={19}
                color="#002F1A"
              />

              <Text style={styles.verifiedText}>
                Verified
              </Text>
            </View>
          </View>

          <Pressable style={styles.profileButton} onPress={() => router.push("/organisation-dashboard/profile")}>
            <Text style={styles.profileButtonText}>
              View Profile
            </Text>
          </Pressable>
        </View>

        {/* PAGE */}

        <Text style={styles.heading}>
          More
        </Text>

        <Text style={styles.subtitle}>
          Extra organisation settings and tools.
        </Text>

        {/* MAIN SETTINGS */}

        <View style={styles.settingsCard}>
          {mainItems.map((item, index) =>
            renderRow(
              item,
              index,
              mainItems.length
            )
          )}
        </View>

        {/* SUPPORT */}

        <View style={styles.settingsCard}>
          {secondaryItems.map((item, index) =>
            renderRow(
              item,
              index,
              secondaryItems.length
            )
          )}
        </View>
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
    paddingHorizontal: 20,
    paddingTop: 17,
    paddingBottom: 35,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 26,
  },

  topButton: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  notificationDot: {
    position: "absolute",
    right: 4,
    top: 4,
    width: 11,
    height: 11,
    borderRadius: 10,
    backgroundColor: "#FF3C71",
  },

  organisationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 34,
  },

  logoCard: {
    width: 105,
    height: 105,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#3B465E",
    backgroundColor: "#050505",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  logoWhite: {
    color: COLORS.white,
    fontSize: 19,
    fontWeight: "900",
    fontStyle: "italic",
  },

  logoRed: {
    color: "#FF2B1F",
    fontSize: 18,
    fontWeight: "900",
    fontStyle: "italic",
  },

  organisationInfo: {
    flex: 1,
  },

  welcome: {
    color: "#B1B9CD",
    fontSize: 14,
  },

  organisationName: {
    color: COLORS.white,
    fontSize: 24,
    lineHeight: 28,
    fontWeight: "900",
    marginTop: 4,
  },

  organisationType: {
    color: "#B5BDD0",
    fontSize: 14,
    marginTop: 4,
  },

  verified: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 6,
    backgroundColor: "#35E980",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 25,
    marginTop: 9,
  },

  verifiedText: {
    color: "#002F1A",
    fontWeight: "900",
    fontSize: 13,
  },

  profileButton: {
    minWidth: 130,
    height: 55,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#35425D",
    backgroundColor: "#0B1224",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  profileButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "800",
  },

  heading: {
    color: COLORS.white,
    fontSize: 34,
    fontWeight: "900",
  },

  subtitle: {
    color: "#B6BED2",
    fontSize: 16,
    marginTop: 4,
    marginBottom: 19,
  },

  settingsCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#35425D",
    backgroundColor: "#091020",
    paddingHorizontal: 14,
    marginBottom: 18,
  },

  row: {
    minHeight: 94,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },

  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#2A344A",
  },

  iconBox: {
    width: 54,
    height: 54,
    borderRadius: 13,
    backgroundColor: "#24205E",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  rowContent: {
    flex: 1,
  },

  rowTitle: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "900",
  },

  rowSubtitle: {
    color: "#AFB8CC",
    fontSize: 11,
    marginTop: 4,
  },

  verifiedSmall: {
    backgroundColor: "#35E980",
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 20,
    marginRight: 10,
  },

  verifiedSmallText: {
    color: "#002F1A",
    fontSize: 10,
    fontWeight: "900",
  },
});


