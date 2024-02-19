import React from 'react';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { HStack, Text, Button, Icon, Box, VStack, Pressable } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Ensure you have this installed
import { MaterialIcons } from '@expo/vector-icons';

interface MenuItemsProps {
    name: string;
    onPress: () => void;
    iconName: string;
    description: string;
    mainBG: string;
    subBG: string;
}

const MenuItems: React.FC<MenuItemsProps> = ({ name, onPress, iconName, description, mainBG, subBG }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ ...styles.card, backgroundColor: mainBG }}>
            <HStack space={3} alignItems="center">
                <VStack p={3} style={{ ...styles.iconContainer, backgroundColor: subBG }}>
                    <Icon as={MaterialIcons} name={iconName} size={9} color="#004E6D" />
                </VStack>
                <VStack>
                    <Text fontWeight="semibold" fontSize="xl" color="#004E6D">
                        {name}
                    </Text>
                    <Text fontWeight="medium" fontSize="sm" color="#627D98">
                        {description}
                    </Text>
                </VStack>
            </HStack>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '95%',
        marginVertical: 10,
        paddingHorizontal: 16,
        paddingVertical: 20,
        backgroundColor: '#F7F9FA', // Soft off-white background
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E2E8F0', // Light border for subtle definition
        ...Platform.select({
            ios: {
                shadowColor: '#004E6D',
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.1,
                shadowRadius: 15,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    iconContainer: {
        backgroundColor: '#E3F2FD', // Light blue background for the icon container
        borderRadius: 8,
        marginRight: 12,
    },
});

export default MenuItems;
