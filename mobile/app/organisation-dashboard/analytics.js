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

import JoinziieLogo from "../../components/JoinziieLogo";
import OrgAnalyticsChart from "../../components/organisation/OrgAnalyticsChart";

import { COLORS } from "../../constants/theme";

const analytics = [
  {
    label: "Total Members",
    value: "1,250",
    change: "↑ 12%",
  },

  {
    label: "Sessions Held",
    value: "34",
    change: "↑ 21%",
  },

  {
    label: "Attendance",
    value: "87%",
    change: "↑ 8%",
  },

  {
    label: "Average Rating",
    value: "4.8",
    change: "★ 4.8",
  },
];

export default function OrganisationAnalytics() {
  const router = useRouter();

  const safeBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/organisation-dashboard/sessions");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <Pressable
            onPress={safeBack}
            style={styles.back}
          >
            <Ionicons
              name="chevron-back"
              size={29}
              color={COLORS.white}
            />
          </Pressable>

          <JoinziieLogo />

          <View style={styles.spacer} />
        </View>

        <View style={styles.titleRow}>
          <View>
            <Text style={styles.heading}>
              Analytics
            </Text>

            <Text style={styles.subtitle}>
              Track your organisation performance.
            </Text>
          </View>

          <Pressable style={styles.range}>
            <Text style={styles.rangeText}>
              Last 30 days
            </Text>

            <Ionicons
              name="chevron-down"
              size={15}
              color={COLORS.white}
            />
          </Pressable>
        </View>

        <View style={styles.stats}>
          {analytics.map(
            (item) => (
              <View
                key={item.label}
                style={styles.stat}
              >
                <Text style={styles.statValue}>
                  {item.value}
                </Text>

                <Text style={styles.statLabel}>
                  {item.label}
                </Text>

                <Text style={styles.statChange}>
                  {item.change}
                </Text>
              </View>
            )
          )}
        </View>

        <OrgAnalyticsChart />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Booking Overview
          </Text>

          <Metric
            label="Total bookings"
            value="286"
          />

          <Metric
            label="Confirmed"
            value="248"
          />

          <Metric
            label="Pending"
            value="21"
          />

          <Metric
            label="Cancelled"
            value="17"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Popular Sessions
          </Text>

          <Popular
            title="No-Gi Fundamentals"
            bookings="94"
          />

          <Popular
            title="Strength & Conditioning"
            bookings="76"
          />

          <Popular
            title="Striking for MMA"
            bookings="61"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Metric({
  label,
  value,
}) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>
        {label}
      </Text>

      <Text style={styles.metricValue}>
        {value}
      </Text>
    </View>
  );
}

function Popular({
  title,
  bookings,
}) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>
        {title}
      </Text>

      <Text style={styles.bookings}>
        {bookings} bookings
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor:
      COLORS.background,
  },

  container: {
    width: "100%",
    maxWidth: 520,
    alignSelf: "center",
    padding: 18,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
  },

  back: {
    width: 44,
    height: 44,
    justifyContent: "center",
  },

  spacer: {
    width: 44,
  },

  titleRow: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "flex-end",
    marginTop: 30,
    marginBottom: 18,
  },

  heading: {
    color: COLORS.white,
    fontSize: 29,
    fontWeight: "900",
  },

  subtitle: {
    color: COLORS.secondary,
    fontSize: 12,
    marginTop: 4,
  },

  range: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 40,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 11,
  },

  rangeText: {
    color: COLORS.white,
    fontSize: 9,
  },

  stats: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    marginBottom: 15,
  },

  stat: {
    width: "23.5%",
    minHeight: 105,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor:
      COLORS.surface,
    padding: 11,
  },

  statValue: {
    color: COLORS.white,
    fontSize: 19,
    fontWeight: "900",
  },

  statLabel: {
    color: COLORS.secondary,
    fontSize: 8,
    lineHeight: 11,
    marginTop: 7,
  },

  statChange: {
    color: COLORS.success,
    fontSize: 8,
    fontWeight: "800",
    marginTop: 10,
  },

  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor:
      COLORS.surface,
    padding: 15,
    marginTop: 15,
  },

  cardTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 8,
  },

  metric: {
    minHeight: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:
      "space-between",
    borderBottomWidth: 1,
    borderBottomColor:
      COLORS.border,
  },

  metricLabel: {
    color: COLORS.secondary,
    fontSize: 11,
  },

  metricValue: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "800",
  },

  bookings: {
    color: COLORS.pink,
    fontSize: 10,
    fontWeight: "800",
  },
});

