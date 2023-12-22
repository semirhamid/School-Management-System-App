import { useRoute } from "@react-navigation/native";
import { View, Text } from "react-native";

export default function Notification() {
  const route = useRoute();
  return (
    <View>
      <Text>Notification</Text>
    </View>
  );
}
