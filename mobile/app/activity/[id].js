import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import ActivityImagePlaceholder from "../../components/activities/ActivityImagePlaceholder";
import GradientButton from "../../components/GradientButton";

import { getActivityById } from "../../data/activities";
import { COLORS } from "../../constants/theme";

export default function ActivityDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const activity = getActivityById(id);

  if (!activity) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>
            Activity not found.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.hero}>
          <ActivityImagePlaceholder
            category={activity.category}
            height={280}
          />

          <Pressable
            onPress={() => router.back()}
            style={styles.back}
          >
            <Text style={styles.backText}>←</Text>
          </Pressable>

          <Pressable style={styles.heart}>
            <Text style={styles.heartText}>♡</Text>
          </Pressable>
        </View>

        <View style={styles.content}>
          <View style={styles.categoryPill}>
            <Text style={styles.categoryText}>
              {activity.category}
            </Text>
          </View>

          <Text style={styles.title}>
            {activity.title}
          </Text>

          <View style={styles.orgRow}>
            <Text style={styles.organisation}>
              {activity.organisation}
            </Text>

            {activity.verified && (
              <View style={styles.verified}>
                <Text style={styles.verifiedText}>✓</Text>
              </View>
            )}
          </View>

          <View style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>AGE</Text>
              <Text style={styles.infoValue}>
                {activity.ageRange}
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>DISTANCE</Text>
              <Text style={styles.infoValue}>
                {activity.distance}
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>DAY</Text>
              <Text style={styles.infoValue}>
                {activity.day}
              </Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>TIME</Text>
              <Text style={styles.infoValue}>
                {activity.time}
              </Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>
            About this activity
          </Text>

          <Text style={styles.description}>
            {activity.description}
          </Text>

          <Text style={styles.sectionTitle}>
            Location
          </Text>

          <View style={styles.locationCard}>
            <Text style={styles.locationTitle}>
              {activity.location}
            </Text>

            <Text style={styles.locationText}>
              {activity.distance} away
            </Text>
          </View>

          <View style={styles.priceRow}>
            <View>
              <Text style={styles.priceLabel}>PRICE</Text>

              <Text
                style={[
                  styles.price,
                  activity.price === 0 && styles.free,
                ]}
              >
                {activity.price === 0
                  ? "FREE"
                  : `£${activity.price}`}
              </Text>
            </View>

            <View style={styles.spacesWrap}>
              <Text style={styles.spaces}>
                {activity.spaces} spaces remaining
              </Text>
            </View>
          </View>

          <GradientButton
            title={
              activity.price === 0
                ? "Join Now"
                : `Book Now — £${activity.price}`
            }
          />

          <Pressable style={styles.saveButton}>
            <Text style={styles.saveText}>
              ♡ Save for later
            </Text>
          </Pressable>
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
    paddingBottom: 35,
  },

  hero: {
    position: "relative",
  },

  back: {
    position: "absolute",
    left: 16,
    top: 16,
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: "rgba(3,6,23,0.86)",
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    color: COLORS.white,
    fontSize: 20,
  },

  heart: {
    position: "absolute",
    right: 16,
    top: 16,
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: "rgba(3,6,23,0.86)",
    alignItems: "center",
    justifyContent: "center",
  },

  heartText: {
    color: COLORS.white,
    fontSize: 21,
  },

  content: {
    padding: 18,
  },

  categoryPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#17103A",
    borderWidth: 1,
    borderColor: COLORS.purple,
  },

  categoryText: {
    color: COLORS.white,
    fontSize: 9,
    fontWeight: "700",
  },

  title: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: "900",
    marginTop: 14,
  },

  orgRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 7,
  },

  organisation: {
    color: COLORS.secondary,
    fontSize: 12,
  },

  verified: {
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
  },

  verifiedText: {
    color: COLORS.white,
    fontSize: 8,
    fontWeight: "900",
  },

  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 20,
  },

  infoCard: {
    width: "48.8%",
    minHeight: 67,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    padding: 12,
  },

  infoLabel: {
    color: COLORS.muted,
    fontSize: 8,
    fontWeight: "700",
  },

  infoValue: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 5,
  },

  sectionTitle: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "900",
    marginTop: 24,
  },

  description: {
    color: COLORS.secondary,
    fontSize: 11,
    lineHeight: 18,
    marginTop: 8,
  },

  locationCard: {
    marginTop: 10,
    minHeight: 68,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    padding: 13,
  },

  locationTitle: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 12,
  },

  locationText: {
    color: COLORS.secondary,
    fontSize: 9,
    marginTop: 4,
  },

  priceRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 24,
    marginBottom: 16,
  },

  priceLabel: {
    color: COLORS.muted,
    fontSize: 8,
  },

  price: {
    color: COLORS.orange,
    fontSize: 21,
    fontWeight: "900",
    marginTop: 3,
  },

  free: {
    color: COLORS.success,
  },

  spacesWrap: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: "#0B2416",
  },

  spaces: {
    color: COLORS.success,
    fontSize: 9,
    fontWeight: "700",
  },

  saveButton: {
    minHeight: 46,
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },

  saveText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "700",
  },

  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  notFoundText: {
    color: COLORS.white,
  },
});
