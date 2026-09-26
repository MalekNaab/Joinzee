import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import JoinziieLogo from "../../../components/JoinziieLogo";

import {
  COLORS,
  GRADIENT,
} from "../../../constants/theme";

const initialPeople = [
  {
    id: "1",
    initials: "JS",
    name: "Jayden Smith",
    attended: true,
  },
  {
    id: "2",
    initials: "AM",
    name: "Aaliyah Mohammed",
    attended: true,
  },
  {
    id: "3",
    initials: "FS",
    name: "Fatima Said",
    attended: false,
  },
  {
    id: "4",
    initials: "LW",
    name: "Lucas White",
    attended: false,
  },
];

export default function ManageAttendanceScreen() {
  const router = useRouter();

  const safeBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/organisation-dashboard/sessions");
    }
  };
  const { id } = useLocalSearchParams();

  const [people, setPeople] =
    useState(initialPeople);

  const toggle = (personId) => {
    setPeople((current) =>
      current.map((person) =>
        person.id === personId
          ? {
              ...person,
              attended: !person.attended,
            }
          : person
      )
    );
  };

  const attendedCount =
    people.filter((person) => person.attended).length;

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
          Manage Attendance
        </Text>

        <Text style={styles.subtitle}>
          Session #{id}
        </Text>

        <View style={styles.summary}>
          <Text style={styles.summaryValue}>
            {attendedCount} / {people.length}
          </Text>

          <Text style={styles.summaryLabel}>
            Marked present
          </Text>
        </View>

        {people.map((person) => (
          <Pressable
            key={person.id}
            onPress={() => toggle(person.id)}
            style={styles.row}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {person.initials}
              </Text>
            </View>

            <Text style={styles.name}>
              {person.name}
            </Text>

            <View
              style={[
                styles.attendance,
                person.attended
                  ? styles.present
                  : styles.absent,
              ]}
            >
              <Ionicons
                name={
                  person.attended
                    ? "checkmark-circle"
                    : "ellipse-outline"
                }
                size={18}
                color={
                  person.attended
                    ? "#53EF94"
                    : "#A7AFC2"
                }
              />

              <Text
                style={[
                  styles.attendanceText,
                  person.attended
                    ? styles.presentText
                    : styles.absentText,
                ]}
              >
                {person.attended
                  ? "Present"
                  : "Absent"}
              </Text>
            </View>
          </Pressable>
        ))}

        <Pressable
          onPress={safeBack}
        >
          <LinearGradient
            colors={GRADIENT}
            style={styles.save}
          >
            <Text style={styles.saveText}>
              Save Attendance
            </Text>
          </LinearGradient>
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
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
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

  summary: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    padding: 16,
    marginTop: 18,
    marginBottom: 15,
  },

  summaryValue: {
    color: COLORS.white,
    fontSize: 23,
    fontWeight: "900",
  },

  summaryLabel: {
    color: COLORS.secondary,
    fontSize: 10,
    marginTop: 3,
  },

  row: {
    minHeight: 72,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 22,
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

  name: {
    flex: 1,
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "800",
  },

  attendance: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },

  present: {
    backgroundColor: "#103722",
  },

  absent: {
    backgroundColor: "#171D2B",
  },

  attendanceText: {
    fontSize: 9,
    fontWeight: "800",
  },

  presentText: {
    color: "#53EF94",
  },

  absentText: {
    color: "#A7AFC2",
  },

  save: {
    minHeight: 54,
    borderRadius: 14,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  saveText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "900",
  },
});

