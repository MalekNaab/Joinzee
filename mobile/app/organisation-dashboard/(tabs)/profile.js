import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import JoinziieLogo from "../../../components/JoinziieLogo";

import {
  COLORS,
  GRADIENT,
} from "../../../constants/theme";

const organisation = {
  name: "1WAYFIT MMA",

  description:
    "MMA and self-defence classes for all ages and abilities. Build confidence, get fit and learn real skills in a supportive community.",

  email: "info@1wayfitmma.co.uk",

  phone: "+44 20 7946 0123",

  location: "White City, London",

  website: "www.1wayfitmma.co.uk",

  verified: true,

  tags: [
    "MMA",
    "Self-Defence",
    "Fitness",
    "All Ages",
  ],
};

export default function OrganisationProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {/* ================================================= */}
        {/* TOP HEADER */}
        {/* ================================================= */}

        <View style={styles.topBar}>
          <Pressable
            style={styles.menuButton}
          >
            <Ionicons
              name="menu-outline"
              size={31}
              color={COLORS.white}
            />
          </Pressable>

          <JoinziieLogo />

          <Pressable
            style={styles.notificationButton}
          >
            <Ionicons
              name="notifications-outline"
              size={27}
              color={COLORS.white}
            />

            <View
              style={styles.notificationDot}
            />
          </Pressable>
        </View>


        {/* ================================================= */}
        {/* PAGE TITLE */}
        {/* ================================================= */}

        <View style={styles.titleRow}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons
              name="chevron-back"
              size={32}
              color={COLORS.white}
            />
          </Pressable>

          <Text style={styles.pageTitle}>
            Organisation Profile
          </Text>
        </View>


        {/* ================================================= */}
        {/* ORGANISATION OVERVIEW */}
        {/* ================================================= */}

        <View style={styles.card}>
          <View style={styles.organisationRow}>
            <View style={styles.logoCard}>
              <Text style={styles.logoWhite}>
                1WAYFIT
              </Text>

              <Text style={styles.logoRed}>
                MMA
              </Text>
            </View>

            <View style={styles.organisationContent}>
              <Text style={styles.organisationName}>
                {organisation.name}
              </Text>

              <View style={styles.verifiedBadge}>
                <Ionicons
                  name="checkmark-circle"
                  size={21}
                  color="#00351B"
                />

                <Text style={styles.verifiedText}>
                  Verified
                </Text>
              </View>

              <Text style={styles.description}>
                {organisation.description}
              </Text>
            </View>
          </View>
        </View>


        {/* ================================================= */}
        {/* CONTACT INFORMATION */}
        {/* ================================================= */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Contact Information
          </Text>

          <InfoRow
            icon="mail-outline"
            label="Email"
            value={organisation.email}
          />

          <InfoRow
            icon="call-outline"
            label="Phone"
            value={organisation.phone}
          />

          <InfoRow
            icon="location-outline"
            label="Location"
            value={organisation.location}
          />

          <InfoRow
            icon="globe-outline"
            label="Website"
            value={organisation.website}
          />
        </View>


        {/* ================================================= */}
        {/* VERIFICATION */}
        {/* ================================================= */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Verification Status
          </Text>

          <View style={styles.verificationRow}>
            <View style={styles.largeVerifiedIcon}>
              <Ionicons
                name="checkmark"
                size={39}
                color="#012516"
              />
            </View>

            <View style={styles.verificationContent}>
              <Text style={styles.verificationTitle}>
                Verified Organisation
              </Text>

              <Text style={styles.verificationText}>
                This organisation has been verified by Joinziie.
              </Text>

              <Text style={styles.verificationDescription}>
                Verified organisations are trusted by families and can showcase
                their sessions, facilities and contact details publicly.
              </Text>
            </View>
          </View>
        </View>


        {/* ================================================= */}
        {/* PUBLIC PREVIEW */}
        {/* ================================================= */}

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Public Preview
          </Text>

          <Text style={styles.publicIntro}>
            This is how families will see your organisation on Joinziie.
          </Text>

          <View style={styles.previewCard}>
            <View style={styles.previewLogo}>
              <Text style={styles.previewLogoWhite}>
                1WAYFIT
              </Text>

              <Text style={styles.previewLogoRed}>
                MMA
              </Text>
            </View>

            <View style={styles.previewContent}>
              <View style={styles.previewTitleRow}>
                <Text style={styles.previewName}>
                  {organisation.name}
                </Text>

                <View style={styles.previewVerified}>
                  <Ionicons
                    name="checkmark-circle"
                    size={14}
                    color="#00351B"
                  />

                  <Text style={styles.previewVerifiedText}>
                    Verified
                  </Text>
                </View>
              </View>

              <View style={styles.locationRow}>
                <Ionicons
                  name="location-outline"
                  size={17}
                  color={COLORS.white}
                />

                <Text style={styles.locationText}>
                  {organisation.location}
                </Text>
              </View>

              <Text
                style={styles.previewDescription}
                numberOfLines={3}
              >
                MMA and self-defence classes for all ages and abilities.
                Build confidence and get fit.
              </Text>

              <View style={styles.tags}>
                {organisation.tags.map(
                  (tag) => (
                    <View
                      key={tag}
                      style={styles.tag}
                    >
                      <Text style={styles.tagText}>
                        {tag}
                      </Text>
                    </View>
                  )
                )}
              </View>
            </View>
          </View>

          <Pressable
            onPress={() => {
              // We'll connect this to the public organisation page later.
            }}
          >
            <LinearGradient
              colors={GRADIENT}
              start={{
                x: 0,
                y: 0.5,
              }}
              end={{
                x: 1,
                y: 0.5,
              }}
              style={styles.previewButton}
            >
              <Ionicons
                name="eye"
                size={24}
                color={COLORS.white}
              />

              <Text style={styles.previewButtonText}>
                View Public Preview
              </Text>
            </LinearGradient>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


/* ============================================================
   INFO ROW
   ============================================================ */

function InfoRow({
  icon,
  label,
  value,
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoIcon}>
        <Ionicons
          name={icon}
          size={24}
          color={COLORS.white}
        />
      </View>

      <Text style={styles.infoLabel}>
        {label}
      </Text>

      <Text
        style={styles.infoValue}
        numberOfLines={2}
      >
        {value}
      </Text>
    </View>
  );
}


/* ============================================================
   STYLES
   ============================================================ */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },


  container: {
    width: "100%",
    maxWidth: 540,
    alignSelf: "center",
    paddingHorizontal: 18,
    paddingTop: 17,
    paddingBottom: 35,
  },


  /* HEADER */

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },

  menuButton: {
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },

  notificationButton: {
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  notificationDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 11,
    height: 11,
    borderRadius: 10,
    backgroundColor: "#FF3B6F",
  },


  /* TITLE */

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  backButton: {
    width: 45,
    height: 45,
    justifyContent: "center",
    marginRight: 5,
  },

  pageTitle: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: "900",
  },


  /* CARDS */

  card: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#35415B",
    backgroundColor: "#081020",
    padding: 17,
    marginBottom: 16,
  },


  /* ORGANISATION */

  organisationRow: {
    flexDirection: "row",
  },

  logoCard: {
    width: 120,
    height: 120,
    borderRadius: 17,
    backgroundColor: "#050505",
    borderWidth: 1,
    borderColor: "#3C465C",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },

  logoWhite: {
    color: COLORS.white,
    fontSize: 21,
    fontWeight: "900",
    fontStyle: "italic",
  },

  logoRed: {
    color: "#FF261E",
    fontSize: 21,
    fontWeight: "900",
    fontStyle: "italic",
  },

  organisationContent: {
    flex: 1,
  },

  organisationName: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "900",
  },

  verifiedBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#34E57B",
    borderRadius: 25,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 6,
    marginTop: 10,
  },

  verifiedText: {
    color: "#00351B",
    fontSize: 13,
    fontWeight: "900",
  },

  description: {
    color: "#D1D6E2",
    fontSize: 13,
    lineHeight: 19,
    marginTop: 12,
  },


  /* SECTION */

  sectionTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 14,
  },


  /* CONTACT INFO */

  infoRow: {
    minHeight: 46,
    flexDirection: "row",
    alignItems: "center",
  },

  infoIcon: {
    width: 46,
    alignItems: "flex-start",
  },

  infoLabel: {
    width: 105,
    color: "#D8DCE7",
    fontSize: 13,
  },

  infoValue: {
    flex: 1,
    color: COLORS.white,
    fontSize: 13,
  },


  /* VERIFICATION */

  verificationRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  largeVerifiedIcon: {
    width: 65,
    height: 65,
    borderRadius: 40,
    backgroundColor: "#36E77F",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 17,
  },

  verificationContent: {
    flex: 1,
  },

  verificationTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "900",
  },

  verificationText: {
    color: "#BFC6D7",
    fontSize: 12,
    marginTop: 4,
  },

  verificationDescription: {
    color: "#BFC6D7",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 14,
  },


  /* PUBLIC PREVIEW */

  publicIntro: {
    color: "#B8C0D1",
    fontSize: 12,
    marginTop: -5,
    marginBottom: 13,
  },

  previewCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#35415B",
    backgroundColor: "#0B1325",
    padding: 13,
    flexDirection: "row",
  },

  previewLogo: {
    width: 105,
    height: 105,
    borderRadius: 15,
    backgroundColor: "#050505",
    borderWidth: 1,
    borderColor: "#364159",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  previewLogoWhite: {
    color: COLORS.white,
    fontWeight: "900",
    fontStyle: "italic",
    fontSize: 18,
  },

  previewLogoRed: {
    color: "#FF281F",
    fontWeight: "900",
    fontStyle: "italic",
    fontSize: 18,
  },

  previewContent: {
    flex: 1,
  },

  previewTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  previewName: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "900",
  },

  previewVerified: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#34E57B",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 5,
    gap: 4,
  },

  previewVerifiedText: {
    color: "#00351B",
    fontWeight: "900",
    fontSize: 8,
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 6,
  },

  locationText: {
    color: "#D6DBE5",
    fontSize: 11,
  },

  previewDescription: {
    color: "#D1D6E2",
    fontSize: 10.5,
    lineHeight: 15,
    marginTop: 8,
  },

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 9,
  },

  tag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#D326E9",
    backgroundColor: "#28133D",
  },

  tagText: {
    color: COLORS.white,
    fontSize: 8,
    fontWeight: "700",
  },

  previewButton: {
    minHeight: 53,
    borderRadius: 14,
    marginTop: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },

  previewButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "900",
  },
});
