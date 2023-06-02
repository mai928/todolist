import { Text, StyleSheet, View, TouchableOpacity, Modal } from "react-native";
import React, { Component } from "react";
import Colors from "../../Colors";
import AddTaskModel from "./addTaskModel";
export default class TodoList extends React.Component {
	state = {
		addModel: false,
	};

	showModel() {
		 this.setState({ addModel: !this.state.addModel });
	}
	render() {
		const task = this.props.task;
		const completedCount = task.todos.filter((todo) => todo.completed).length;
		const remaining = task.todos.length - completedCount;
		return (
			<View>
				<Modal
					animationType="slide"
					onRequestClose={() => this.showModel()}
					visible={this.state.addModel}
				>
					<AddTaskModel   updateList={this.props.updateList}
					 task={task} closeModel={() => this.showModel()} />
				</Modal>
				<TouchableOpacity
					onPress={() => {
						this.showModel();
					}}
					style={[styles.listContainer, { backgroundColor: task.color }]}
				>
					<Text style={styles.listTitle} numberOfLines={1}>
						{task.name}
					</Text>

					<View style={{ alignItems: "center" }}>
						<Text style={styles.count}>{completedCount}</Text>
						<Text style={styles.subtitle}>completed</Text>
					</View>

					<View style={{ alignItems: "center" }}>
						<Text style={styles.count}>{remaining}</Text>
						<Text style={styles.subtitle}>remaining</Text>
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	listContainer: {
		paddingVertical: 32,
		paddingHorizontal: 16,
		borderRadius: 6,
		marginHorizontal: 12,
		alignItems: "center",
		width: 200,
	},
	listTitle: {
		fontSize: 24,
		fontWeight: "700",
		marginBottom: 18,
		color: Colors.White,
	},
	count: {
		fontSize: 40,
		fontWeight: "200",
		color: Colors.White,
	},
	subtitle: {
		fontSize: 12,
		fontWeight: "700",
		color: Colors.White,
	},
});
