import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { useMemo, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import JoinziieLogo from "../../../components/JoinziieLogo";
import { COLORS } from "../../../constants/theme";

const attendees = [
  {
    id: "1",
    initials: "JS",
    name: "Jayden Smith",
    status: "Confirmed",
  },
  {
    id: "2",
    initials: "AM",
    name: "Aaliyah Mohammed",
    status: "Confirmed",
  },
  {
    id: "3",
    initials: "FS",
    name: "Fatima Said",
    status: "Pending",
  },
  {
    id: "4",
    initials: "CR",
    name: "Chris Roberts",
    status: "Confirmed",
  },
  {
    id: "5",
    initials: "LW",
    name: "Lucas White",
    status: "Confirmed",
  },
];

export default function SessionAttendeesScreen() {
  const router = useRouter();

  const safeBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/organisation-dashboard/sessions");
    }
  };
  const { id } = useLocalSearchParams();

  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();

    if (!value) {
      return attendees;
    }

    return attendees.filter((person) =>
      person.name.toLowerCase().includes(value)
    );
  }, [query]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <Pressable onPress={safeBack} style={styles.back}>
            <Ionicons
              name="chevron-back"
              size={29}
              color={COLORS.white}
            />
          </Pressable>

          <JoinziieLogo />

          <View style={styles.spacer} />
        </View>

        <Text style={styles.heading}>
          Attendees
        </Text>

        <Text style={styles.subtitle}>
          Session #{id} participant list
        </Text>

        <View style={styles.search}>
          <Ionicons
            name="search-outline"
            size={21}
            color={COLORS.secondary}
          />

          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search attendees..."
            placeholderTextColor={COLORS.muted}
            style={styles.input}
          />
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryValue}>
            12 / 20
          </Text>

          <Text style={styles.summaryLabel}>
            Registered
          </Text>
        </View>

        <View style={styles.list}>
          {filtered.map((person) => {
            const confirmed =
              person.status === "Confirmed";

            return (
              <View key={person.id} style={styles.person}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {person.initials}
                  </Text>
                </View>

                <View style={styles.personInfo}>
                  <Text style={styles.personName}>
                    {person.name}
                  </Text>

                  <Text style={styles.personMeta}>
                    Participant
                  </Text>
                </View>

                <View
                  style={[
                    styles.status,
                    confirmed
                      ? styles.confirmed
                      : styles.pending,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      confirmed
                        ? styles.confirmedText
                        : styles.pendingText,
                    ]}
                  >
                    {person.status}
                  </Text>
                </View>
              </View>
            );
          })}
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
    padding: 18,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  back: {
    width: 44,
    height: 44,
    justifyContent: "center",
  },

  spacer: {
    width: 44,
  },

  heading: {
    color: COLORS.white,
    fontSize: 29,
    fontWeight: "900",
    marginTop: 30,
  },

  subtitle: {
    color: COLORS.secondary,
    fontSize: 12,
    marginTop: 4,
  },

  search: {
    minHeight: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
    gap: 8,
    marginTop: 18,
  },

  input: {
    flex: 1,
    color: COLORS.white,
    fontSize: 12,
  },

  summary: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    padding: 16,
    marginTop: 15,
  },

  summaryValue: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "900",
  },

  summaryLabel: {
    color: COLORS.secondary,
    fontSize: 10,
    marginTop: 4,
  },

  list: {
    marginTop: 14,
  },

  person: {
    minHeight: 70,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 23,
    backgroundColor: "#39206D",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  avatarText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "800",
  },

  personInfo: {
    flex: 1,
  },

  personName: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "800",
  },

  personMeta: {
    color: COLORS.secondary,
    fontSize: 9,
    marginTop: 3,
  },

  status: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  confirmed: {
    backgroundColor: "#103722",
  },

  pending: {
    backgroundColor: "#35280B",
  },

  statusText: {
    fontSize: 8,
    fontWeight: "800",
  },

  confirmedText: {
    color: "#53EF94",
  },

  pendingText: {
    color: "#FFBD43",
  },
});

