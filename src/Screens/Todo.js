import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	Modal,
} from "react-native";
import React, { Component } from "react";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../../Colors";
import Data from "../../Data";
import TodoList from "../Components/TodList";
import AddListModel from "../Components/addListModel";

export default class Todo extends React.Component {
	state = {
		addTodoVisiable: false,
		Lists: Data,
	};

	toggleAddTodoModel() {
		this.setState({ addTodoVisiable: !this.state.addTodoVisiable });
	}

	renderList = (list) => {
		return <TodoList task={list} updateList={this.updateList} />;
	};

	addList = (list) => {
		this.setState({
			Lists: [
				...this.state.Lists,
				{ ...list, id: this.state.Lists.length + 1, todos: [] },
			],
		});
	};

	updateList =list =>(
		this.setState({
			lists :this.state.Lists.map((item)=>{
				return item.id === list.id ?list :item
			})
		})
	);

	render() {
		return (
			<View style={styles.container}>
				<Modal
					animationType="slide"
					visible={this.state.addTodoVisiable}
					onRequestClose={() => this.toggleAddTodoModel()}
				>
					<AddListModel  addList={this.addList}
					 closeModel={() => this.toggleAddTodoModel()} />
				</Modal>

				<View style={{ flexDirection: "row" }}>
					<View style={styles.divider} />
					<Text style={styles.title}>
						Todo{" "}
						<Text style={{ color: Colors.Blue, fontWeight: "400" }}>Lists</Text>
					</Text>
					<View style={styles.divider} />
				</View>

				<View style={{ marginVertical: 40 }}>
					<TouchableOpacity
						onPress={() => this.toggleAddTodoModel()}
						style={styles.addList}
					>
						<AntDesign name="plus" size={16} color={Colors.Blue} />
					</TouchableOpacity>

					<Text style={styles.add}>Add List</Text>
				</View>

				<View style={{ height: 275, paddingHorizontal: 2 }}>
					<FlatList
						horizontal
						showsHorizontalScrollIndicator={false}
						data={this.state.Lists}
						keyExtractor={(item) => item.name}
						renderItem={({ item }) => this.renderList(item)}
						keyboardShouldPersistTaps='always'
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	divider: {
		backgroundColor: Colors.LightBlue,
		height: 1,
		flex: 1,
		alignSelf: "center",
	},
	title: {
		fontSize: 38,
		fontWeight: "800",
		color: Colors.Black,
		paddingHorizontal: 64,
	},
	addList: {
		borderWidth: 2,
		borderColor: Colors.LightBlue,
		padding: 16,
		borderRadius: 4,
		alignItems: "center",
		justifyContent: "center",
	},
	add: {
		color: Colors.Blue,
		fontSize: 14,
		fontWeight: "600",
		marginTop: 8,
	},
});
