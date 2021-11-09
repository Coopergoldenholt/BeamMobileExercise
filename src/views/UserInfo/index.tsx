import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useCallback, useEffect, useState } from 'react'
import { useIsFocused } from '@react-navigation/core'
import { View, Text, ActivityIndicator, ScrollView, RefreshControl, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import { getUserInfo } from '../../api/getUserInfo'
import { IBrushingRecord, IUser } from '../../types'
import BrushingRecordDisplay from './components/BrushingRecordDisplay'

interface UserInfoProps {
    navigation: any;
}

const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const UserInfo: React.FC<UserInfoProps> = ({ navigation }) => {
    const [userInfo, setUserInfo] = useState<IUser | null>(null)
    const [refreshing, setRefreshing] = useState(false);
    const [brushingRecords, setBrushingRecords] = useState<IBrushingRecord[]>([])
    const [invalidUser, setInvalidUser] = useState(false)
    const isFocused = useIsFocused()

    useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        getData()
    }, [isFocused])

    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('brushingRecords')

            if (value !== null) {

                setBrushingRecords(JSON.parse(value))
            }
        } catch (e) {
            Alert.alert('Could not get your brushing record.')
        }
    }

    const alertBrushingRecord = (id: string) => {
        Alert.alert(
            "Delete Record?",
            "Are you sure you want to delete this brushing record?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                { text: "OK", onPress: () => deleteBrushingRecord(id) }
            ]
        );
    }

    const deleteBrushingRecord = async (id: string) => {
        const filtRecords = brushingRecords.filter(rec => rec.id !== id)
        try {
            const stringifiedRecords = JSON.stringify(filtRecords)
            await AsyncStorage.setItem('brushingRecords', stringifiedRecords)
            setBrushingRecords(filtRecords)
        } catch (e) {
            Alert.alert('Could not delete your brushing record.')
        }
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getUser()
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const getUser = async () => {
        let info = await getUserInfo()
        if (typeof info === 'string') {
            setInvalidUser(true)
            setUserInfo(null)
        } else {
            setInvalidUser(false)
            //@ts-ignore
            setUserInfo(info)
        }
    }

    return (
        userInfo ?
            <View style={styles.container}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <Text style={styles.nameText}>Welcome, {userInfo.name}</Text>
                    <View>
                        <Text style={styles.shippingText}>Shipping Address:</Text>
                        <Text style={styles.addressText}>
                            {userInfo.shipping_address}
                        </Text>
                        <Text style={styles.addressText}>
                            {userInfo.shipping_city}, {userInfo.shipping_state} {userInfo.shipping_zip_code}
                        </Text>
                    </View>
                </ScrollView>
                <TouchableOpacity
                    testID='CreateRecord.Button'
                    style={styles.button}
                    onPress={() => navigation.navigate('BrushingRecord')}
                >
                    <Text style={styles.buttonText}>Create Record</Text>
                </TouchableOpacity>

                {brushingRecords.length > 0 ?
                    <FlatList
                        data={brushingRecords}
                        renderItem={({ item }: { item: IBrushingRecord }) => <BrushingRecordDisplay
                            record={item}
                            alertBrushingRecord={alertBrushingRecord}
                            navigation={navigation}
                        />
                        }
                        keyExtractor={item => item.id}
                    /> :
                    <Text testID='no-records'>You don't have any brushing records to display.</Text>
                }
            </View>


            : invalidUser ? <Text>Could not find User. Please try again.</Text> : <ActivityIndicator />
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    nameText: {
        fontSize: 22,
        paddingBottom: 15
    },
    shippingText: {
        fontSize: 20,
        paddingBottom: 8
    },
    addressText: {
        fontSize: 18
    },
    button: {
        alignSelf: 'center',
        backgroundColor: '#20a9ff',
        borderRadius: 5,
        height: 40,
        width: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 20
    },
    buttonText: {
        color: 'white'
    },
})

export default UserInfo