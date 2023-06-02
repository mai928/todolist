import { View } from "react-native";
import Todo from "./src/Screens/Todo";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Colors from "./Colors";
import React from "react";
export default App = () => {
	const Stack = createStackNavigator();
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Todo"
					component={Todo}
					options={{
						headerShown: false,
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};
