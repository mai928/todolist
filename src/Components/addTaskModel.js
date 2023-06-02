import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
	FlatList,
	TextInput,
	KeyboardAvoidingView,
	SafeAreaView,
	Keyboard,
} from "react-native";
import React, { Component } from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import Colors from "../../Colors";
export default class AddTaskModel extends Component {
	state = {
		// name: this.props.task.name,
		// color: this.props.task.color,
		// todos: this.props.task.todos,

		newTodos: "",
	};

	toggleTodoCompleted = (index) => {
		let list = this.props.task;
		list.todos[index].completed = !list.todos[index].completed;

		this.props.updateList(list);
	};

	addTodo=()=>{
		let list =this.props.task;
		list.todos.push({title :this.state.newTodos ,completed: false})

		this.props.updateList(list)
		this.setState({newTodos:''})

		Keyboard.dismiss()
	}

	renderTask = (taskItem, index) => {
		return (
			<View style={styles.taskcontainer}>
				<TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
					<Ionicons
						name={taskItem.completed ? "ios-square" : "ios-square-outline"}
						size={24}
						style={{ width: 32 }}
						color={this.props.task.color}
					/>
				</TouchableOpacity>
				<Text
					style={[
						styles.task,
						{ color: Colors.Black },
						{
							textDecorationLine: taskItem.completed ? "line-through" : "none",
						},
					]}
				>
					{taskItem.title}
				</Text>
			</View>
		);
	};
	render() {
		const task = this.props.task;

		const taskNumber = task.todos.length;
		const completed = task.todos.filter((task) => task.completed).length;
		console.log(taskNumber);
		console.log(completed);
		return (
			<SafeAreaView style={styles.container}>
				<TouchableOpacity
					onPress={this.props.closeModel}
					style={{ position: "absolute", top: 35, right: 30 }}
				>
					<AntDesign name="close" size={24} />
				</TouchableOpacity>

				<View
					style={[
						styles.section,
						styles.header,
						{ borderBottomColor: task.color },
					]}
				>
					<Text style={styles.title}>{task.name}</Text>
					<Text style={styles.taskcount}>
						{completed} of {taskNumber} tasks
					</Text>
				</View>

				<View style={[styles.section, { flex: 3 }]}>
					<FlatList
						contentContainerStyle={{
							paddingHorizontal: 32,
							paddingVertical: 35,
						}}
						data={task.todos}
						keyExtractor={(item) => item.title}
						renderItem={({ item, index }) => this.renderTask(item, index)}
					/>
				</View>
				<KeyboardAvoidingView style={[styles.section, styles.footer]}>
					<TextInput
						value={this.state.newTodos}
						onChangeText={(txt) => this.setState({ newTodos: txt })}
						style={[styles.input, { borderColor: task.color }]}
						placeholder="Add New Task"
					/>
					<TouchableOpacity
					onPress={()=>this.addTodo()}
						style={[styles.addTask, { backgroundColor: task.color }]}
					>
						<AntDesign name="plus" size={16} color={Colors.White} />
					</TouchableOpacity>
				</KeyboardAvoidingView>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	section: {
		flex: 1,
		alignSelf: "stretch",
	},
	header: {
		justifyContent: "flex-end",
		marginStart: 64,
		borderBottomWidth: 3,
		marginTop: 50,
	},
	title: {
		fontSize: 30,
		fontWeight: "800",
		color: Colors.Black,
	},
	taskcount: {
		color: "gray",
		fontWeight: "600",
		marginTop: 4,
		marginBottom: 16,
	},
	footer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: 20,
	},
	input: {
		borderWidth: 1,
		flex: 1,
		height: 48,
		borderRadius: 6,
		paddingStart: 20,
		marginRight: 8,
	},
	addTask: {
		height: 48,
		width: 48,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 6,
	},
	taskcontainer: {
		paddingVertical: 16,
		flexDirection: "row",
		alignItems: "center",
	},
	task: {
		color: Colors.Black,
		fontSize: 16,
		fontWeight: "700",
	},
});
