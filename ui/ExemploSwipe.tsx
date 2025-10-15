
import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
    SharedValue,
    useAnimatedStyle,
} from 'react-native-reanimated';

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
    const styleAnimation = useAnimatedStyle(() => {
        console.log('showRightProgress:', prog.value);
        console.log('appliedTranslation:', drag.value);

        return {
            transform: [{ translateX: drag.value + 50 }],
        };
    });

    return (
        <Reanimated.View style={styleAnimation}>
            <Text style={styles.rightAction}>Text</Text>
        </Reanimated.View>
    );
}

function LeftAction(prog: SharedValue<number>, drag: SharedValue<number>) {
    const styleAnimation = useAnimatedStyle(() => {
        console.log('showLeftProgress:', prog.value);
        console.log('appliedTranslation:', drag.value);

        return {
            transform: [{ translateX: drag.value - 50 }],
        };
    });

    return (
        <Reanimated.View style={styleAnimation}>
            <Text style={styles.leftAction}>Left</Text>
        </Reanimated.View>
    );
}

export default function ExemploSwipe() {
    return (
        <GestureHandlerRootView>
            <ReanimatedSwipeable
                containerStyle={styles.swipeable}
                friction={2}
                enableTrackpadTwoFingerGesture
                rightThreshold={40}
                leftThreshold={40}
                renderRightActions={RightAction}
                renderLeftActions={LeftAction}
            >
                <Text>Swipe me!</Text>
            </ReanimatedSwipeable>
        </GestureHandlerRootView>
    );
}


const styles = StyleSheet.create({
    rightAction: { width: 50, height: 50, backgroundColor: 'purple' },
    leftAction: {
        width: 50,
        height: 50,
        backgroundColor: 'blue',
        color: 'white',
        textAlign: 'center',
        lineHeight: 50,
    },
    separator: {
        width: '100%',
        borderTopWidth: 1,
    },
    swipeable: {
        height: 50,
        backgroundColor: 'papayawhip',
        alignItems: 'center',
    },
});