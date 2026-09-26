import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import JoinziieLogo from "../../../components/JoinziieLogo";

import { ORG_SESSIONS } from "../../../data/organisationDemo";

import {
  COLORS,
  GRADIENT,
} from "../../../constants/theme";

export default function OrganisationSessionDetails() {
  const router = useRouter();

  const safeBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/organisation-dashboard/sessions");
    }
  };

  const { id } =
    useLocalSearchParams();

  const session =
    ORG_SESSIONS.find(
      (item) =>
        item.id === String(id)
    );

  if (!session) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundTitle}>
            Session not found
          </Text>

          <Pressable
            onPress={safeBack}
          >
            <Text style={styles.backLink}>
              Go back
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.container
        }
      >
        <View style={styles.topBar}>
          <Pressable
            onPress={() =>
              router.back()
            }
            style={styles.back}
          >
            <Ionicons
              name="chevron-back"
              size={28}
              color={COLORS.white}
            />
          </Pressable>

          <JoinziieLogo />

          <View style={styles.topSpacer} />
        </View>

        <Text style={styles.pageTitle}>
          Session Details
        </Text>

        <View style={styles.hero}>
          <View style={styles.heroImage}>
            <Text style={styles.heroLabel}>
              {session.label}
            </Text>

            <Text style={styles.placeholder}>
              Session Image Placeholder
            </Text>
          </View>

          <View style={styles.heroContent}>
            <Text style={styles.sessionTitle}>
              {session.title}
            </Text>

            <View style={styles.published}>
              <View
                style={styles.greenDot}
              />

              <Text
                style={
                  styles.publishedText
                }
              >
                Published
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.infoGrid}>
          <InfoCard
            icon="calendar-outline"
            label="Date & Time"
            value={session.date}
          />

          <InfoCard
            icon="location-outline"
            label="Location"
            value={session.location}
          />

          <InfoCard
            icon="people-outline"
            label="Capacity"
            value={session.capacity}
          />

          <InfoCard
            icon="pricetag-outline"
            label="Category"
            value={session.label}
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            About this session
          </Text>

          <Text style={styles.body}>
            A structured session hosted by 1WAYFIT MMA.
            Participants can book through Joinziie and
            attendance can be managed from the organisation dashboard.
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.sectionTitle}>
              Attendees
            </Text>

            <Text style={styles.capacityText}>
              {session.capacity}
            </Text>
          </View>

          <Person
            initials="JS"
            name="Jayden Smith"
            status="Confirmed"
          />

          <Person
            initials="AM"
            name="Aaliyah Mohammed"
            status="Confirmed"
          />

          <Person
            initials="FS"
            name="Fatima Said"
            status="Pending"
          />

          <Pressable
            style={styles.viewAttendees}
          >
            <Text
              style={
                styles.viewAttendeesText
              }
            >
              View all attendees
            </Text>
          </Pressable>
        </View>

        <Pressable>
          <LinearGradient
            colors={GRADIENT}
            style={styles.primaryButton}
          >
            <Ionicons
              name="create-outline"
              size={20}
              color={COLORS.white}
            />

            <Text style={styles.primaryText}>
              Edit Session
            </Text>
          </LinearGradient>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={() => router.push(`/organisation-dashboard/session/${id}-attendance`)}><Ionicons name="checkmark-circle-outline"
            size={20}
            color={COLORS.white}
          />

          <Text style={styles.secondaryText}>
            Manage Attendance
          </Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={() => router.push(`/organisation-dashboard/session/${id}-message`)}><Ionicons name="chatbubble-outline"
            size={20}
            color={COLORS.white}
          />

          <Text style={styles.secondaryText}>
            Message Attendees
          </Text>
        </Pressable>

        <Pressable style={styles.cancelButton} onPress={() => router.replace("/organisation-dashboard/sessions")}>
          <Ionicons
            name="close-circle-outline"
            size={20}
            color="#FF6277"
          />

          <Text style={styles.cancelText}>
            Cancel Session
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoCard({
  icon,
  label,
  value,
}) {
  return (
    <View style={styles.infoCard}>
      <Ionicons
        name={icon}
        size={22}
        color={COLORS.pink}
      />

      <Text style={styles.infoLabel}>
        {label}
      </Text>

      <Text style={styles.infoValue}>
        {value}
      </Text>
    </View>
  );
}

function Person({
  initials,
  name,
  status,
}) {
  const confirmed =
    status === "Confirmed";

  return (
    <View style={styles.person}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {initials}
        </Text>
      </View>

      <Text style={styles.personName}>
        {name}
      </Text>

      <View
        style={[
          styles.personStatus,
          confirmed
            ? styles.confirmed
            : styles.pending,
        ]}
      >
        <Text
          style={[
            styles.personStatusText,
            confirmed
              ? styles.confirmedText
              : styles.pendingText,
          ]}
        >
          {status}
        </Text>
      </View>
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
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 40,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  back: {
    width: 44,
    height: 44,
    justifyContent: "center",
  },

  topSpacer: {
    width: 44,
  },

  pageTitle: {
    color: COLORS.white,
    fontSize: 29,
    fontWeight: "900",
    marginTop: 30,
    marginBottom: 18,
  },

  hero: {
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor:
      COLORS.surface,
  },

  heroImage: {
    height: 210,
    backgroundColor: "#111A2F",
    alignItems: "center",
    justifyContent: "center",
  },

  heroLabel: {
    color: COLORS.pink,
    fontSize: 31,
    fontWeight: "900",
  },

  placeholder: {
    color: COLORS.secondary,
    fontSize: 10,
    marginTop: 8,
  },

  heroContent: {
    padding: 17,
  },

  sessionTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: "900",
  },

  published: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#103722",
  },

  greenDot: {
    width: 7,
    height: 7,
    borderRadius: 6,
    backgroundColor: "#3FE984",
  },

  publishedText: {
    color: "#53EF94",
    fontSize: 10,
    fontWeight: "800",
  },

  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 15,
  },

  infoCard: {
    width: "48.8%",
    minHeight: 110,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor:
      COLORS.surface,
    padding: 14,
  },

  infoLabel: {
    color: COLORS.secondary,
    fontSize: 9,
    marginTop: 10,
  },

  infoValue: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 4,
  },

  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor:
      COLORS.surface,
    padding: 16,
    marginTop: 15,
  },

  sectionTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "900",
  },

  body: {
    color: COLORS.secondary,
    fontSize: 11,
    lineHeight: 18,
    marginTop: 9,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent:
      "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  capacityText: {
    color: COLORS.pink,
    fontWeight: "800",
    fontSize: 11,
  },

  person: {
    minHeight: 59,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor:
      COLORS.border,
  },

  avatar: {
    width: 37,
    height: 37,
    borderRadius: 20,
    backgroundColor: "#39206D",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  avatarText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "800",
  },

  personName: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "700",
    flex: 1,
  },

  personStatus: {
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },

  confirmed: {
    backgroundColor: "#103722",
  },

  pending: {
    backgroundColor: "#35280B",
  },

  personStatusText: {
    fontSize: 8,
    fontWeight: "800",
  },

  confirmedText: {
    color: "#53EF94",
  },

  pendingText: {
    color: "#FFBD43",
  },

  viewAttendees: {
    minHeight: 42,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  viewAttendeesText: {
    color: COLORS.pink,
    fontSize: 10,
    fontWeight: "800",
  },

  primaryButton: {
    height: 54,
    borderRadius: 14,
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  primaryText: {
    color: COLORS.white,
    fontWeight: "900",
    fontSize: 13,
  },

  secondaryButton: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  secondaryText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "700",
  },

  cancelButton: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#73303B",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  cancelText: {
    color: "#FF6277",
    fontSize: 12,
    fontWeight: "800",
  },

  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  notFoundTitle: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "900",
  },

  backLink: {
    color: COLORS.pink,
    marginTop: 15,
  },
});


