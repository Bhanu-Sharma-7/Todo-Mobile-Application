import { createHomeStyles } from "@/assets/styles/home.styles";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Alert, FlatList, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Todo = Doc<"todos">; // coming from the convex data model

export default function Index() {
  const { colors } = useTheme();

  const [editingId, setEditingId] = useState<Id<"todos"> | null>(null);
  const [editText, setEditText] = useState("");

  const homeStyles = createHomeStyles(colors)

  const todos = useQuery(api.todos.getTodos)
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const updateTodo = useMutation(api.todos.updateTodo);

  const isLoading = todos === undefined;

  if (isLoading) return <LoadingSpinner />

  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id })
    } catch (error) {
      console.error("Error toggling todo:", error);
      Alert.alert("Error", "Failed to toggle todo.");
    }
  }

  const handleDeleteTodo = async (id: Id<"todos">) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancle", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: async () => deleteTodo({ id }) },
    ])
  }

  const handleEditTodo = (todo: Todo) => {
    setEditText(todo.text);
    setEditingId(todo._id);
  }

  const handleSaveEdit = async () => {
    try {
      if (editingId) {
        await updateTodo({ id: editingId, text: editText.trim() });
        setEditingId(null);
        setEditText("");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
      Alert.alert("Error", "Failed to update todo.");
    }
  }

  const handleCancleEdit = async () => {
    setEditingId(null);
    setEditText("");
  }

  const reanderTodoItem = ({ item }: { item: Todo }) => {
    const isEditing = editingId === item._id;
    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={homeStyles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleTodo(item._id)}
          >
            <LinearGradient
              colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
              style={[
                homeStyles.checkboxInner,
                { borderColor: item.isCompleted ? "transparent" : colors.border }
              ]}
            >
              {
                item.isCompleted && <Ionicons name="checkmark" size={18} color="#fff" />
              }
            </LinearGradient>
          </TouchableOpacity>
          {isEditing ? (
          <View style={homeStyles.editContainer}>
            <TextInput
              style={homeStyles.editInput}
              value={editText}
              onChangeText={setEditText}
              autoFocus
              placeholder="Edit Your Todo..."
              placeholderTextColor={colors.textMuted}
            />
            <View style={homeStyles.editButton}>
              <TouchableOpacity activeOpacity={0.8} onPress={handleSaveEdit}>
                <LinearGradient colors={colors.gradients.success} style={homeStyles.editButton}>
                  <Ionicons name="checkmark" size={16} color="#fff" />
                  <Text style={homeStyles.editButtonText}>Save</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} onPress={handleCancleEdit}>
                <LinearGradient colors={colors.gradients.muted} style={homeStyles.editButton}>
                  <Ionicons name="close" size={16} color="#fff" />
                  <Text style={homeStyles.editButtonText}>Cancle</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          ): (
          <View style = {homeStyles.todoTextContainer}>
          <Text
            style={[
              homeStyles.todoText,
              item.isCompleted && {
                textDecorationLine: 'line-through',
                color: colors.textMuted,
                opacity: 0.9
              }
            ]}
          >
            {item.text}
          </Text>

          <View style={homeStyles.todoActions}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => handleEditTodo(item)}>
              <LinearGradient colors={colors.gradients.warning} style={homeStyles.actionButton}>
                <Ionicons name="pencil" size={14} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.8} onPress={() => handleDeleteTodo(item._id)}>
              <LinearGradient colors={colors.gradients.danger} style={homeStyles.actionButton}>
                <Ionicons name="trash" size={14} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
        </LinearGradient >
      </View >
    )
}

return (
  <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
    <StatusBar barStyle={colors.statusBarStyle} />
    <SafeAreaView style={homeStyles.container}>
      <Header />
      <TodoInput />
      <FlatList
        data={todos}
        renderItem={reanderTodoItem}
        keyExtractor={(item) => item._id}
        style={homeStyles.todoList}
        contentContainerStyle={homeStyles.todoListContent}
        ListEmptyComponent={<EmptyState />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  </LinearGradient>
);
}