import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserInfo from '../views/UserInfo';
import BrushingRecord from '../views/BrushingRecord';
//@ts-ignore
import LogoSvg from '../../assets/images/beam_logo.svg'


const Stack = createNativeStackNavigator();

const Navigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={UserInfo}
                    options={{ headerTitle: () => <LogoSvg /> }}
                />
                <Stack.Screen name="BrushingRecord" component={BrushingRecord}
                    options={{ headerShown: false }}

                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigator;
