import {
	Text,
	StyleSheet,
	View,
	KeyboardAvoidingView,
	TouchableOpacity,
	TextInput,
} from "react-native";
import React, { Component } from "react";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../Colors";
import Data from "../../Data";
export default class AddListModel extends Component {
	backgroundColors = [
		"#af4d7a",
		"#d3ed00",
		"#eec9d2",
		"#005b96",
		"#451e3e",
		"#fe8a71",
		"#d62d20",
	];

	state = {
		name: "",
		color: this.backgroundColors[0],
	};

	renderColor() {
		return this.backgroundColors.map((color) => (
			<TouchableOpacity
				key={color}
				style={[styles.colorSelect, { backgroundColor: color }]}
				onPress={() => this.setState({ color })}
			/>
		));
	}

	createTodo = () => {
		const { name, color } = this.state;

		Data.push({ name, color, todos: [] });

		this.setState({ name: "" });

		this.props.closeModel();
	};

	

	render() {
		return (
			<KeyboardAvoidingView style={styles.container} behavior="padding">
				<TouchableOpacity
					onPress={this.props.closeModel}
					style={{ position: "absolute", top: 35, right: 30 }}
				>
					<AntDesign name="close" size={24} color={Colors.Black} />
				</TouchableOpacity>

				<View style={{ alignSelf: "stretch", marginHorizontal: 25 }}>
					<Text style={styles.title}>Create Todo List</Text>
					<TextInput
						style={styles.input}
						placeholder="List Name?"
						onChangeText={(text) => this.setState({ name: text })}
					/>

					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							marginTop: 20,
						}}
					>
						{this.renderColor()}
					</View>

					<TouchableOpacity
						onPress={this.createTodo} 
						style={[styles.create, { backgroundColor: this.state.color }]}
					>
						<Text style={{ color: Colors.White, fontWeight: "600" }}>
							Create
						</Text>
					</TouchableOpacity>
					
				</View>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 28,
		fontWeight: "800",
		color: Colors.Black,
		alignSelf: "center",
		marginBottom: 16,
	},
	input: {
		borderWidth: 1,
		borderColor: Colors.Blue,
		height: 50,
		borderRadius: 6,
		paddingHorizontal: 16,
		fontSize: 18,
		marginTop: 8,
	},
	create: {
		marginTop: 24,
		alignItems: "center",
		height: 50,
		borderRadius: 6,
		justifyContent: "center",
	},
	colorSelect: {
		width: 30,
		height: 30,
		borderRadius: 4,
	},
});
