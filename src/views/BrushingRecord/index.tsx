import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import DatePicker from 'react-native-date-picker'
import { formatDateTime } from '../../functions/formatDateTime'
import { IBrushingRecord } from '../../types'
import uuid from 'react-native-uuid';

interface BrushingRecordPros {
    navigation: any;
    route: any;
}

const BrushingRecord: React.FC<BrushingRecordPros> = ({ navigation, route, ...props }) => {
    const [displayTimePicker, setDisplayTimePicker] = useState(false)
    const [date, setDate] = useState(new Date())
    const [duration, setDuration] = useState({ minutes: '0', seconds: '0' })

    useEffect(() => {
        if (route.params) {
            const { date, duration } = route.params.record
            setDate(new Date(date))
            setDuration(duration)
        }
    }, [route])

    const storeBrushingRecord = async () => {
        const brushingRecord: IBrushingRecord = {
            //@ts-ignore
            id: uuid.v4(),
            date,
            duration
        }
        let brushingRecords: any = []

        try {
            const value = await AsyncStorage.getItem('brushingRecords')
            if (value !== null) {
                brushingRecords = JSON.parse(value)
            }
        } catch (e) {
            Alert.alert('Could not save your brushing record.')
        }

        brushingRecords.unshift(brushingRecord)

        try {
            const stringifiedRecords = JSON.stringify(brushingRecords)
            await AsyncStorage.setItem('brushingRecords', stringifiedRecords)
            navigation.goBack()
        } catch (e) {
            Alert.alert('Could not save your brushing record.')
        }
    }

    const updateBrushingRecord = async () => {
        const brushingRecord: IBrushingRecord = {
            id: route.params.record.id,
            date,
            duration
        }

        let brushingRecords: any = []

        try {
            const value = await AsyncStorage.getItem('brushingRecords')
            if (value !== null) {

                brushingRecords = JSON.parse(value)
            }
        } catch (e) {
            Alert.alert('Could not update your brushing record.')
        }

        const updatedRecords = brushingRecords.map((rec: IBrushingRecord) => {
            if (rec.id == route.params.record.id) {
                return brushingRecord
            }
            return rec
        })

        try {
            const stringifiedRecords = JSON.stringify(updatedRecords)
            await AsyncStorage.setItem('brushingRecords', stringifiedRecords)

        } catch (e) {
            Alert.alert('Could not update your brushing record.')
        }

        navigation.goBack()
    }

    return <View style={{ padding: 15, paddingTop: 50 }}>
        <Text testID='Header.Text' style={styles.headerText}>{route.params ? 'Edit Record' : 'Add Record'}</Text>
        <DatePicker
            mode='datetime'
            modal
            open={displayTimePicker}
            date={date}
            onConfirm={(date) => {
                setDisplayTimePicker(false)
                setDate(date)
            }}
            onCancel={() => {
                setDisplayTimePicker(false)
            }}
        />
        <TouchableOpacity
            style={styles.dateDisplay}
            onPress={() => setDisplayTimePicker(!displayTimePicker)}
        >
            <Text style={styles.dateText}>{formatDateTime(date)}</Text>
        </TouchableOpacity>
        <Text style={styles.durationText}>Duration:</Text>
        <View style={styles.rowView}>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Minutes'
                    style={styles.durationInput}
                    value={duration.minutes}
                    keyboardType='number-pad'
                    onChangeText={(minutes) => setDuration({ ...duration, minutes })}
                />
                <Text>Minutes</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder='Seconds'
                    style={styles.durationInput}
                    value={duration.seconds}
                    keyboardType='number-pad'
                    onChangeText={(seconds) => setDuration({ ...duration, seconds })}
                />
                <Text>Seconds</Text>
            </View>
        </View>

        <View style={{ ...styles.rowView, paddingTop: 20 }}>
            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => navigation.goBack()}>
                <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
                testID='SaveRecord.Button'
                style={styles.button}
                onPress={route.params ? () => updateBrushingRecord() : () => storeBrushingRecord()}
            >
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    </View>
}

const styles = StyleSheet.create({
    headerText: {
        fontSize: 22,
        alignSelf: 'center',
        paddingBottom: 25,
        fontWeight: 'bold'
    },
    rowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateText: {
        fontSize: 20
    },
    durationText: {
        fontSize: 18,
        paddingTop: 20,
        paddingBottom: 10
    },
    dateDisplay: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        height: 50,
        justifyContent: 'center',
        paddingLeft: 5,
        backgroundColor: 'white'
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    durationInput: {
        borderColor: 'grey',
        borderWidth: 2,
        minWidth: 75,
        height: 40,
        borderRadius: 5,
        marginRight: 5,
        paddingLeft: 5,
        backgroundColor: 'white'
    },
    button: {
        alignSelf: 'center',
        backgroundColor: '#20a9ff',
        borderRadius: 5,
        height: 40,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        alignSelf: 'center',
        backgroundColor: 'tomato',
        borderRadius: 5,
        height: 40,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white'
    },
})

export default BrushingRecord