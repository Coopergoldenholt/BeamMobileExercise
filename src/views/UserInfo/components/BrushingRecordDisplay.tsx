import { duration } from 'moment'
import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
import { formatDateTime } from '../../../functions/formatDateTime'
import { IBrushingRecord } from '../../../types'

interface BrushingRecordProps {
    record: IBrushingRecord;
    navigation: any;
    alertBrushingRecord: any;
}

const BrushingRecordDisplay: React.FC<BrushingRecordProps> = ({ record, navigation, alertBrushingRecord }) => {
    const { date, duration, id } = record

    return (
        <TouchableOpacity
            testID='Navigate.Button'
            style={styles.brushingRecord}
            onPress={() => navigation.navigate('BrushingRecord', { record })}>
            <Text style={styles.dateText}>{formatDateTime(date)}</Text>
            <Text>Duration:</Text>
            <View style={styles.durationContainer}>
                <Text>Minutes: {duration.minutes}</Text>
                <Text>Seconds: {duration.seconds}</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={() => alertBrushingRecord(id)}>
                <Text>Delete</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    brushingRecord: {
        paddingTop: 15,
        borderColor: 'grey',
        borderTopWidth: 1
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
    durationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    dateText: {
        fontSize: 20,
        paddingBottom: 10
    },

    deleteButton: {
        alignSelf: 'center',
        backgroundColor: 'tomato',
        borderRadius: 5,
        height: 20,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 30
    }
})

export default BrushingRecordDisplay