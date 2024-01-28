import React from 'react';
import { StyleSheet } from 'react-native';
import { HStack, Text, Button } from 'native-base';

interface MenuItemsProps {
    name: string;
    onPress: () => void; // Here we define an onPress prop
}

const MenuItems: React.FC<MenuItemsProps> = ({ name, onPress }) => {
    return (
        <Button
            style={styles.button}
            onPress={onPress} // Use the onPress prop here
        >
            <HStack style={styles.content}>
                <Text style={styles.text}>
                    {name}
                </Text>
            </HStack>
        </Button>
    );
};

const styles = StyleSheet.create({
    button: {
        elevation: 10,
        borderRadius: 10,
        width: '95%',
        height: 100,
        marginVertical: 8,
        backgroundColor: '#004E6D',
    },
    content: {
        height: 80,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default MenuItems;
