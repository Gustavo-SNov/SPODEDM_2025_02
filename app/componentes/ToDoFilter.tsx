import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {FilterOptions} from "@/lib/types";


const ToDoFilter = ({ selectedValue, setFilter }: { selectedValue: FilterOptions, setFilter: (value: FilterOptions) => void }) => {
    return (
        <View style={filterStyles.filterMenu}>
            <TouchableOpacity
                style={[filterStyles.button, filterStyles.buttonAll, selectedValue === FilterOptions.All && filterStyles.buttonAllSelected]}
                onPress={() => setFilter(FilterOptions.All)}
            >
                <Text style={[filterStyles.label, filterStyles.buttonAllLabel, selectedValue === FilterOptions.All && filterStyles.buttonAllSelectedLabel]}>Todos</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[filterStyles.button, filterStyles.buttonPending, selectedValue === FilterOptions.Pending && filterStyles.buttonPendingSelected]}
                onPress={() => setFilter(FilterOptions.Pending)}
            >
                <Text style={[filterStyles.label, filterStyles.buttonPendingLabel, selectedValue === FilterOptions.Pending && filterStyles.buttonPendingSelectedLabel]}>Pendentes</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[filterStyles.button, filterStyles.buttonDone, selectedValue === FilterOptions.Done && filterStyles.buttonDoneSelected]}
                onPress={() => setFilter(FilterOptions.Done)}
            >
                <Text style={[filterStyles.label, filterStyles.buttonDoneLabel, selectedValue === FilterOptions.Done && filterStyles.buttonDoneSelectedLabel]}>Concluídos</Text>
            </TouchableOpacity>
        </View>
    );
}

const filterStyles = StyleSheet.create({
    filterMenu: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 20,
        marginTop: 10
    },

    button: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 50,
        alignSelf: 'flex-start',
        marginHorizontal: '1%',
        marginBottom: 6,
        minWidth: '28%',
        textAlign: 'center',
    },

    label: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },

    buttonAll: {
        backgroundColor: 'lightgreen',
    },
    buttonAllSelected: {
        backgroundColor: 'darkgreen',
    },

    buttonAllLabel: {
        color: 'darkgreen',
    },

    buttonAllSelectedLabel: {
        color: 'lightgreen',
    },

    buttonPending: {
        backgroundColor: 'oldlace',
    },
    buttonPendingSelected: {
        backgroundColor: 'coral',
    },

    buttonPendingLabel: {
        color: 'coral',
    },
    buttonPendingSelectedLabel: {
        color: 'oldlace',
    },

    buttonDone: {
        backgroundColor: 'lightblue',
    },
    buttonDoneSelected: {
        backgroundColor: 'royalblue',
    },
    buttonDoneLabel: {
        color: 'royalblue',
    },
    buttonDoneSelectedLabel: {
        color: 'lightblue',
    },

    selectedLabel: {
        color: 'white',
    },
});

export default ToDoFilter;