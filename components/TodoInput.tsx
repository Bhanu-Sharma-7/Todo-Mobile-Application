import { View, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import useTheme from '@/hooks/useTheme'
import { createHomeStyles } from '@/assets/styles/home.styles'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

const TodoInput = () => {

  const { colors } = useTheme()
  const homeStyles = createHomeStyles(colors)

  const [newTodo, setNewTodo] = useState('')
  const addTodo = useMutation(api.todos.addTodo)

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        await addTodo({text: newTodo.trim()})
        setNewTodo('')
      } catch (error) {
        console.log("Error adding a todo", error)
        Alert.alert("Error", "Failed to add todo.")
      }
    }
  }
  return (
    <View style={homeStyles.inputSection}>
      <View style={homeStyles.inputWrapper}>
        <TextInput
          style={homeStyles.input}
          placeholder="What needs to be done?"
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleAddTodo}
          placeholderTextColor={colors.textMuted}
        />
        <TouchableOpacity
          onPress={handleAddTodo}
          activeOpacity={0.8}
          disabled={!newTodo.trim()}
        >
          <LinearGradient
            colors={newTodo.trim() ? colors.gradients.primary : colors.gradients.muted}
            style={[homeStyles.addButton, !newTodo.trim() && homeStyles.addButtonDisabled]}
          >
            <Ionicons name='add' size={24} color='#fff'/>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TodoInput