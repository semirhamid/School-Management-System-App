import React, { useState, useEffect } from 'react';
import { Modal, Button, Box, Checkbox, VStack, Text, ScrollView, Icon, Pressable, HStack } from 'native-base';
import { MaterialIcons } from '@expo/vector-icons';

interface Option {
    id: string;
    name: string;
}

interface CustomMultiSelectProps {
    options: Option[];
    selectedValues: string[];
    onSelectionDone: (selected: string[]) => void;
    placeholder?: string;
}

const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({
    options,
    selectedValues,
    onSelectionDone,
    placeholder = "Select items",
}) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selected, setSelected] = useState<string[]>(selectedValues);

    useEffect(() => {
        setSelected(selectedValues);
    }, [selectedValues]);

    const toggleSelection = (id: string) => {
        setSelected((prevSelected) => prevSelected.includes(id) ? prevSelected.filter(item => item !== id) : [...prevSelected, id]);
    };

    const displaySelectedItems = () => {
        const selectedOptions = options.filter(option => selected.includes(option.id));
        return selectedOptions.map(option => option.name).length.toString() + " items selected";
    };

    return (
        <>
            <Pressable onPress={() => setShowModal(true)} borderWidth={1} borderColor="coolGray.300" borderRadius="5" py="1" px="1" >
                <HStack justifyContent="space-between" alignItems="center">
                    <Text color={'gray.600'} mx="3" fontSize="xs">{selected.length > 0 ? displaySelectedItems() : placeholder}</Text>
                    <Icon as={MaterialIcons} name="keyboard-arrow-down" size="9" mx="2" />
                </HStack>
            </Pressable>

            <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="full" justifyContent="center" p="4">
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header>Select Items</Modal.Header>
                    <Modal.Body>
                        <ScrollView>
                            <VStack space={2} accessibilityLabel="options">
                                {options.map((option) => (
                                    <HStack key={option.id} alignItems="center" my={2}>
                                        <Checkbox
                                            value={option.id}
                                            isChecked={selected.includes(option.id)}
                                            onChange={() => toggleSelection(option.id)}
                                            colorScheme="primary"
                                            size="lg"
                                        />
                                        <Text fontSize="md" ml={2}>
                                            {option.name}
                                        </Text>
                                    </HStack>
                                ))}
                            </VStack>
                        </ScrollView>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button variant="ghost" onPress={() => setShowModal(false)}>Cancel</Button>
                            <Button onPress={() => {
                                onSelectionDone(selected);
                                setShowModal(false);
                            }}>Done</Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </>
    );
};

export default CustomMultiSelect;
