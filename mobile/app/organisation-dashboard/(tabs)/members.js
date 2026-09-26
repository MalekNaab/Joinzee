import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import OrgDashboardLayout from "../../../components/organisation/OrgDashboardLayout";
import OrgMemberRow from "../../../components/organisation/OrgMemberRow";
import OrgStatCard from "../../../components/organisation/OrgStatCard";
import OrgAnalyticsChart from "../../../components/organisation/OrgAnalyticsChart";

import { ORG_MEMBERS, ORG_ANALYTICS } from "../../../data/organisationDemo";
import { COLORS } from "../../../constants/theme";

const filters = ["All", "Coaches", "Participants", "Pending"];

export default function OrganisationMembersScreen() {
  return (
    <OrgDashboardLayout
      title="Members"
      subtitle="Manage your community."
      actionTitle="Invite"
      actionVariant="gradient"
    >
      <View style={styles.searchBar}>
        <Ionicons
          name="search-outline"
          size={22}
          color={COLORS.secondary}
        />
        <TextInput
          placeholder="Search members..."
          placeholderTextColor={COLORS.secondary}
          style={styles.input}
        />
      </View>

      <View style={styles.filterRow}>
        {filters.map((filter, index) => {
          const active = index === 0;

          return (
            <Pressable
              key={filter}
              style={[
                styles.filterPill,
                active && styles.activePill,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  active && styles.activePillText,
                ]}
              >
                {filter}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {ORG_MEMBERS.map((member) => (
        <OrgMemberRow key={member.id} item={member} />
      ))}

      <Pressable style={styles.viewAllButton}>
        <Text style={styles.viewAllText}>View all members</Text>
      </Pressable>

      <View style={styles.analyticsHeader}>
        <Text style={styles.analyticsTitle}>Analytics</Text>

        <Pressable style={styles.rangePill}>
          <Text style={styles.rangeText}>Last 30 days</Text>
          <Ionicons
            name="chevron-down"
            size={16}
            color={COLORS.white}
          />
        </Pressable>
      </View>

      <View style={styles.statsRow}>
        <OrgStatCard
          value={ORG_ANALYTICS.members}
          label="Total Members"
          change="↑ 12%"
          accent="#43F58E"
        />

        <OrgStatCard
          value={ORG_ANALYTICS.sessionsHeld}
          label="Sessions Held"
          change="↑ 21%"
          accent="#43F58E"
        />

        <OrgStatCard
          value={ORG_ANALYTICS.attendance}
          label="Avg. Attendance"
          change="↑ 8%"
          accent="#43F58E"
        />

        <View style={styles.emptyCard} />
      </View>

      <OrgAnalyticsChart />
    </OrgDashboardLayout>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 10,
  },

  input: {
    flex: 1,
    color: COLORS.white,
    fontSize: 14,
  },

  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
  },

  filterPill: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    alignItems: "center",
    justifyContent: "center",
  },

  activePill: {
    backgroundColor: COLORS.purple,
    borderColor: COLORS.purple,
  },

  filterText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "700",
  },

  activePillText: {
    color: COLORS.white,
  },

  viewAllButton: {
    height: 54,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "rgba(255,255,255,0.02)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },

  viewAllText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "700",
  },

  analyticsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  analyticsTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "900",
  },

  rangePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
    paddingHorizontal: 12,
  },

  rangeText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "700",
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  emptyCard: {
    width: "23.5%",
  },
});
