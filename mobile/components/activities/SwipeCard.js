import {
  Animated,
  Dimensions,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useRef } from "react";
import { useRouter } from "expo-router";

import ActivityImagePlaceholder from "./ActivityImagePlaceholder";
import { COLORS } from "../../constants/theme";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SWIPE_THRESHOLD = 110;

export default function SwipeCard({
  activity,
  onLike,
  onPass,
}) {
  const router = useRouter();

  const position = useRef(
    new Animated.ValueXY()
  ).current;

  const rotate = position.x.interpolate({
    inputRange: [
      -SCREEN_WIDTH,
      0,
      SCREEN_WIDTH,
    ],
    outputRange: [
      "-12deg",
      "0deg",
      "12deg",
    ],
  });

  const likeOpacity =
    position.x.interpolate({
      inputRange: [0, 80, 160],
      outputRange: [0, 0.5, 1],
      extrapolate: "clamp",
    });

  const passOpacity =
    position.x.interpolate({
      inputRange: [-160, -80, 0],
      outputRange: [1, 0.5, 0],
      extrapolate: "clamp",
    });

  const reset = () => {
    Animated.spring(position, {
      toValue: {
        x: 0,
        y: 0,
      },
      useNativeDriver: true,
    }).start();
  };

  const swipeOut = (direction) => {
    const x =
      direction === "right"
        ? SCREEN_WIDTH + 150
        : -SCREEN_WIDTH - 150;

    Animated.timing(position, {
      toValue: {
        x,
        y: 0,
      },
      duration: 220,
      useNativeDriver: true,
    }).start(() => {
      position.setValue({
        x: 0,
        y: 0,
      });

      if (direction === "right") {
        onLike(activity);
      } else {
        onPass(activity);
      }
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () =>
        true,

      onPanResponderMove: (
        event,
        gesture
      ) => {
        position.setValue({
          x: gesture.dx,
          y: gesture.dy * 0.18,
        });
      },

      onPanResponderRelease: (
        event,
        gesture
      ) => {
        if (
          gesture.dx > SWIPE_THRESHOLD
        ) {
          swipeOut("right");
          return;
        }

        if (
          gesture.dx < -SWIPE_THRESHOLD
        ) {
          swipeOut("left");
          return;
        }

        reset();
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.card,
        {
          transform: [
            ...position.getTranslateTransform(),
            { rotate },
          ],
        },
      ]}
    >
      <Animated.View
        pointerEvents="none"
        style={[
          styles.likeOverlay,
          { opacity: likeOpacity },
        ]}
      >
        <Text style={styles.likeOverlayText}>
          LIKE
        </Text>
      </Animated.View>

      <Animated.View
        pointerEvents="none"
        style={[
          styles.passOverlay,
          { opacity: passOpacity },
        ]}
      >
        <Text style={styles.passOverlayText}>
          PASS
        </Text>
      </Animated.View>

      <ActivityImagePlaceholder
        category={activity.category}
        height={300}
      />

      <View style={styles.category}>
        <Text style={styles.categoryText}>
          {activity.category}
        </Text>
      </View>

      <View style={styles.distance}>
        <Text style={styles.distanceText}>
          📍 {activity.distance}
        </Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          {activity.title}
        </Text>

        <View style={styles.infoRow}>
          <Text style={styles.meta}>
            👥 Ages {activity.ageRange}
          </Text>

          <Text style={styles.meta}>
            ◷ {activity.day},{" "}
            {activity.time}
          </Text>
        </View>

        <Text style={styles.meta}>
          📍 {activity.location}
        </Text>

        <Text style={styles.description}>
          {activity.description}
        </Text>

        <View style={styles.tags}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>
              Beginner Friendly
            </Text>
          </View>

          <View style={styles.tag}>
            <Text style={styles.tagText}>
              Social
            </Text>
          </View>

          <View style={styles.tag}>
            <Text style={styles.tagText}>
              Local
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable
            style={[
              styles.action,
              styles.pass,
            ]}
            onPress={() =>
              swipeOut("left")
            }
          >
            <Text style={styles.passIcon}>
              ×
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.action,
              styles.info,
            ]}
            onPress={() =>
              router.push(
                `/activity/${activity.id}`
              )
            }
          >
            <Text style={styles.infoIcon}>
              i
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.action,
              styles.like,
            ]}
            onPress={() =>
              swipeOut("right")
            }
          >
            <Text style={styles.likeIcon}>
              ♥
            </Text>
          </Pressable>
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    maxWidth: 430,
    backgroundColor: "#07101F",
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "#27354D",
    overflow: "hidden",
    elevation: 8,
  },

  category: {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: "#1DAA65",
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
  },

  categoryText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "800",
  },

  distance: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor:
      "rgba(12,17,31,0.85)",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  distanceText: {
    color: COLORS.white,
    fontSize: 10,
  },

  content: {
    padding: 18,
  },

  title: {
    color: COLORS.white,
    fontSize: 25,
    fontWeight: "900",
  },

  infoRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 13,
    marginTop: 11,
  },

  meta: {
    color: "#E4E7F0",
    fontSize: 11,
    marginTop: 5,
  },

  description: {
    color: COLORS.secondary,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 13,
  },

  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    marginTop: 13,
  },

  tag: {
    borderWidth: 1,
    borderColor: "#53627B",
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  tagText: {
    color: COLORS.white,
    fontSize: 9,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 22,
  },

  action: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    backgroundColor: "#07101F",
  },

  pass: {
    width: 72,
    height: 72,
    borderRadius: 40,
    borderColor: "#FF4386",
  },

  info: {
    width: 58,
    height: 58,
    borderRadius: 32,
    borderColor: "#4278D8",
  },

  like: {
    width: 72,
    height: 72,
    borderRadius: 40,
    borderColor: "#48E0BC",
  },

  passIcon: {
    color: "#FF4386",
    fontSize: 48,
    fontWeight: "500",
  },

  infoIcon: {
    color: "#4A86FF",
    fontSize: 33,
    fontWeight: "900",
    fontStyle: "italic",
  },

  likeIcon: {
    color: "#48E0BC",
    fontSize: 37,
  },

  likeOverlay: {
    position: "absolute",
    zIndex: 20,
    top: 80,
    left: 25,
    borderWidth: 3,
    borderColor: "#48E0BC",
    borderRadius: 9,
    paddingHorizontal: 15,
    paddingVertical: 7,
    transform: [
      { rotate: "-12deg" },
    ],
  },

  likeOverlayText: {
    color: "#48E0BC",
    fontSize: 24,
    fontWeight: "900",
  },

  passOverlay: {
    position: "absolute",
    zIndex: 20,
    top: 80,
    right: 25,
    borderWidth: 3,
    borderColor: "#FF4386",
    borderRadius: 9,
    paddingHorizontal: 15,
    paddingVertical: 7,
    transform: [
      { rotate: "12deg" },
    ],
  },

  passOverlayText: {
    color: "#FF4386",
    fontSize: 24,
    fontWeight: "900",
  },
});
