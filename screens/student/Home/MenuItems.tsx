import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Box, HStack, Text, VStack, Button, ZStack } from 'native-base'
import { AttendanceSVG } from './SVGComponent'
import BackgroundTheme from "../../../assets/theme_bg"
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { BottomTabParamList, MainStackParamList } from '../../../navigation/types/types'

export default function MenuItems() {
    const navigation =
        useNavigation<NativeStackNavigationProp<BottomTabParamList, "Home">>();
    return (
        <Button
            style={{ elevation: 10 }}
            rounded={10}
            width={'95%'}
            height={100}
            my={2}
            backgroundColor={'#004E6D'}
            borderRadius={10}
            onPress={() => navigation.navigate("MaterialStack", {
                screen: "Material",
                params: { id: 1, name: "" },
            })}
        >
            <HStack
                height={100}
                width={"100%"}
                justifyItems={'center'}
                px={5}
                alignContent={'center'}
                alignItems={'center'}
                borderRadius={20}
            >
                <Text fontSize={26} color={'white'} fontWeight={'bold'}>
                    Assessment
                </Text>
            </HStack>
        </Button>
    )
}

const styles = StyleSheet.create({
    banner: {
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
})