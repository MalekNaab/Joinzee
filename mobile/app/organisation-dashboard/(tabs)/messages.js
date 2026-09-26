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
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import JoinziieLogo from "../../../components/JoinziieLogo";
import { organisationMessages } from "../../../data/organisationMessages";
import { COLORS } from "../../../constants/theme";

const filters = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "unread",
    label: "Unread",
  },
  {
    id: "family",
    label: "Families",
  },
  {
    id: "staff",
    label: "Staff",
  },
];

export default function OrganisationMessagesScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const unreadCount = organisationMessages.filter(
    (message) => message.unread > 0
  ).length;

  const familyCount = organisationMessages.filter(
    (message) => message.type === "Family"
  ).length;

  const staffCount = organisationMessages.filter(
    (message) => message.type === "Staff"
  ).length;

  const getCount = (id) => {
    if (id === "all") {
      return organisationMessages.length;
    }

    if (id === "unread") {
      return unreadCount;
    }

    if (id === "family") {
      return familyCount;
    }

    if (id === "staff") {
      return staffCount;
    }

    return 0;
  };

  const visibleMessages = useMemo(() => {
    const search = query.trim().toLowerCase();

    return organisationMessages.filter((message) => {
      const matchesSearch =
        !search ||
        message.name.toLowerCase().includes(search) ||
        message.subtitle.toLowerCase().includes(search) ||
        message.preview.toLowerCase().includes(search);

      let matchesFilter = true;

      if (activeFilter === "unread") {
        matchesFilter = message.unread > 0;
      }

      if (activeFilter === "family") {
        matchesFilter = message.type === "Family";
      }

      if (activeFilter === "staff") {
        matchesFilter = message.type === "Staff";
      }

      return matchesSearch && matchesFilter;
    });
  }, [query, activeFilter]);

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

        {/* TITLE */}

        <Text style={styles.heading}>
          Messages
        </Text>

        <Text style={styles.subtitle}>
          Organisation conversations
        </Text>

        {/* SEARCH */}

        <View style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={26}
            color="#A7B0C9"
          />

          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search messages..."
            placeholderTextColor="#8D96AE"
            style={styles.searchInput}
          />
        </View>

        {/* FILTERS */}

        <View style={styles.filters}>
          {filters.map((filter) => {
            const active =
              activeFilter === filter.id;

            return (
              <Pressable
                key={filter.id}
                onPress={() =>
                  setActiveFilter(filter.id)
                }
                style={[
                  styles.filterButton,
                  active &&
                    styles.filterButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    active &&
                      styles.filterTextActive,
                  ]}
                >
                  {filter.label} ({getCount(filter.id)})
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* MESSAGE LIST */}

        <View style={styles.messageList}>
          {visibleMessages.map((message) => (
            <Pressable
              key={message.id}
              style={styles.messageRow}
            >
              <View
                style={[
                  styles.avatar,
                  {
                    backgroundColor:
                      message.color,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.avatarText,
                    message.avatar.length > 2 &&
                      styles.avatarTextSmall,
                  ]}
                >
                  {message.avatar}
                </Text>
              </View>

              <View style={styles.messageContent}>
                <Text style={styles.messageName}>
                  {message.name}
                </Text>

                <Text style={styles.messageSubtitle}>
                  {message.subtitle}
                </Text>

                <Text
                  style={styles.messagePreview}
                  numberOfLines={1}
                >
                  {message.preview}
                </Text>
              </View>

              <View style={styles.messageRight}>
                <Text style={styles.messageTime}>
                  {message.time}
                </Text>

                {message.unread > 0 ? (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>
                      {message.unread}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.unreadSpace} />
                )}

                <Ionicons
                  name="chevron-forward"
                  size={21}
                  color="#D4DAE8"
                />
              </View>
            </Pressable>
          ))}
        </View>

        {visibleMessages.length === 0 && (
          <View style={styles.empty}>
            <Ionicons
              name="chatbubbles-outline"
              size={44}
              color={COLORS.purple}
            />

            <Text style={styles.emptyTitle}>
              No messages found
            </Text>

            <Text style={styles.emptyText}>
              Try another search or filter.
            </Text>
          </View>
        )}
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
    fontSize: 17,
    marginTop: 3,
    marginBottom: 18,
  },

  searchBox: {
    minHeight: 58,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#35425D",
    backgroundColor: "#090F20",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    gap: 10,
  },

  searchInput: {
    flex: 1,
    color: COLORS.white,
    fontSize: 14,
  },

  filters: {
    flexDirection: "row",
    gap: 8,
    marginTop: 15,
    marginBottom: 20,
  },

  filterButton: {
    flex: 1,
    minHeight: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#35425D",
    backgroundColor: "#0A1020",
    alignItems: "center",
    justifyContent: "center",
  },

  filterButtonActive: {
    backgroundColor: COLORS.purple,
    borderColor: "#C42EFF",
  },

  filterText: {
    color: "#F0F3FA",
    fontSize: 11,
    fontWeight: "700",
  },

  filterTextActive: {
    color: COLORS.white,
  },

  messageList: {
    marginTop: 2,
  },

  messageRow: {
    minHeight: 112,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#28334A",
    paddingVertical: 13,
  },

  avatar: {
    width: 64,
    height: 64,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    borderWidth: 1,
    borderColor: "#576481",
  },

  avatarText: {
    color: COLORS.white,
    fontSize: 22,
    fontWeight: "700",
  },

  avatarTextSmall: {
    fontSize: 12,
    fontWeight: "900",
  },

  messageContent: {
    flex: 1,
    paddingRight: 8,
  },

  messageName: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "900",
  },

  messageSubtitle: {
    color: "#B4BCD0",
    fontSize: 12,
    marginTop: 3,
  },

  messagePreview: {
    color: "#C9D0DE",
    fontSize: 13,
    marginTop: 4,
  },

  messageRight: {
    minWidth: 58,
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 8,
  },

  messageTime: {
    color: "#B7BED0",
    fontSize: 11,
  },

  unreadBadge: {
    width: 28,
    height: 28,
    borderRadius: 16,
    backgroundColor: COLORS.purple,
    alignItems: "center",
    justifyContent: "center",
  },

  unreadText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "900",
  },

  unreadSpace: {
    height: 28,
  },

  empty: {
    marginTop: 40,
    minHeight: 200,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "800",
    marginTop: 12,
  },

  emptyText: {
    color: COLORS.secondary,
    fontSize: 11,
    marginTop: 5,
  },
});


