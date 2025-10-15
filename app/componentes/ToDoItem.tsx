import {SwipeDirection, TodoItem} from "@/lib/types";
import {StyleSheet, Text,View} from "react-native";
import React, {useRef} from "react";
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
    Extrapolate,
    interpolate,
    SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';
import {Ionicons} from '@expo/vector-icons';

export interface SwipeProps {
    progress: SharedValue<number>,
    swipeType: SwipeDirection,
}

function SwipeAction({progress, swipeType}: SwipeProps) {
    const animatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(progress.value, [0, 1], [0.5, 1], Extrapolate.CLAMP);
        const opacity = interpolate(progress.value, [0, 0.8], [0, 1], Extrapolate.CLAMP);

        return {
            opacity,
            transform: [{scale}],
        };
    });

    const handleConfigType = (swipeType: SwipeDirection) => {
        switch (swipeType) {
            case SwipeDirection.LEFT:
                return {
                    icon: 'checkmark-circle-outline' as const,
                    text: 'Concluído',
                    backgroundColor: '#27ae60',
                }
            case SwipeDirection.RIGHT:
                return {
                    icon: 'time-outline' as const,
                    text: 'Pendente',
                    backgroundColor: '#e67e22',
                }
            default:
                return {
                    icon: 'help-outline' as const,
                    text: 'Ação',
                    backgroundColor: '#95a5a6',
                }
        }
    }

    const { icon, text, backgroundColor } = handleConfigType(swipeType);

    return (
        <View style={[styles.actionContainer, { backgroundColor }]}>
            <Reanimated.View style={animatedStyle}>
                <Ionicons name={icon} size={32} color="white" />
            </Reanimated.View>
            <Reanimated.Text style={[styles.actionText, animatedStyle]}>
                {text}
            </Reanimated.Text>
        </View>
    );

}

const ToDoItem = ({todoItem, toggleTodo}: { todoItem: TodoItem; toggleTodo: (todoItem: TodoItem) => void }) => {
    const swipeableRef = useRef<ReanimatedSwipeable>(null);


    const handleSwipeOpen = (swipeDirection: SwipeDirection) => {
        const shouldToggle = (swipeDirection === SwipeDirection.LEFT && todoItem.done) ||
            (swipeDirection === SwipeDirection.RIGHT && !todoItem.done);

        if (shouldToggle) {
            toggleTodo(todoItem);
        }

        // Fecha o swipeable após um pequeno atraso
        setTimeout(() => {
            swipeableRef.current?.close();
        }, 300);
    };

    const formatDate = (date: Date | string) => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('pt-BR');
    }

    const renderLeftActions = (progress: SharedValue<number>) => (
        <SwipeAction progress={progress} swipeType={SwipeDirection.LEFT} />
    );

    const renderRightActions = (progress: SharedValue<number>) => (
        <SwipeAction progress={progress} swipeType={SwipeDirection.RIGHT} />
    );

    return (
        <ReanimatedSwipeable
            ref={swipeableRef}
            friction={2}
            enableTrackpadTwoFingerGesture
            leftThreshold={80}
            rightThreshold={80}
            renderLeftActions={!todoItem.done ? renderLeftActions : undefined}
            renderRightActions={todoItem.done ? renderRightActions : undefined}
            onSwipeableOpen={handleSwipeOpen}
            containerStyle={styles.swipeableContainer}
        >
            <View style={[
                styles.itemContainer,
                todoItem.done && styles.itemContainerDone
            ]}>
                <View style={styles.textContainer}>
                    <Text style={[
                        styles.itemText,
                        todoItem.done && styles.itemTextDone
                    ]}>
                        {todoItem.text}
                    </Text>
                    {todoItem.createdAt && (
                        <Text style={styles.timestamp}>
                            {formatDate(todoItem.createdAt)}
                        </Text>
                    )}
                </View>
            </View>
        </ReanimatedSwipeable>
    );
}

const styles = StyleSheet.create({
    swipeableContainer: {
        marginVertical: 6,
        marginHorizontal: 10,
        borderRadius: 12,
        overflow: 'hidden',
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: 16,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        borderLeftWidth: 4,
        borderLeftColor: "#3498db",
    },
    itemContainerDone: {
        backgroundColor: "#f8f9fa",
        borderLeftColor: "#27ae60",
        opacity: 0.8,
    },
    textContainer: {
        flex: 1,
        marginRight: 12,
    },
    itemText: {
        fontSize: 16,
        fontWeight: "500",
        color: "#2c3e50",
        lineHeight: 22,
    },
    itemTextDone: {
        textDecorationLine: "line-through",
        color: "#7f8c8d",
        fontWeight: "400",
    },
    timestamp: {
        fontSize: 12,
        color: "#95a5a6",
        marginTop: 4,
    },
    actionContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        flexDirection: 'row',
        gap: 8,
    },
    actionText: {
        color: "white",
        fontSize: 16,
        fontWeight: '600',
    }
});

export default ToDoItem;