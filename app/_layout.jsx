import { Stack } from 'expo-router';


export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: '#19918F',
        headerTitleStyle: {
          fontWeight: 'bold'
        },
      }}>

      {/* Optionally configure static options outside the route.*/}
      <Stack.Screen name="(home)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="tnc" options={{ title: "Terms and Condition", presentation: 'modal',}} />
    </Stack>
  );
}


