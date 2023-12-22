import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Box, Card, HStack, Text } from 'native-base'

export default function ClassesBox({ grade }: { grade: string }) {
    return (
        <Card
            py={5}
            borderRadius={20}
            style={styles.card}
            my={2}
            backgroundColor={'#00557A'}
            maxW={'30%'}
        >
            <HStack justifyContent={'space-between'} px={5} alignItems={'center'}>
                <Text fontSize={20} color={'white'} fontWeight={'bold'}>
                    {grade}
                </Text>
            </HStack>
        </Card>
    )
}

const styles = StyleSheet.create({
    card: {
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
})
