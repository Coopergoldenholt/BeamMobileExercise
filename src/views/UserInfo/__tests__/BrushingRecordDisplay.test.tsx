import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import BrushingRecordDisplay from '../components/BrushingRecordDisplay'

let record = {
    date: new Date(2018, 11, 24, 10, 33, 30, 0),
    duration: {
        minutes: '2',
        seconds: '32'
    },
    id: 'as8df9hawionr2w'
}

let navigation = {
    navigate: jest.fn()
}
const alertBrushingRecord = jest.fn()


test('renders correctly', () => {

    const { toJSON } = render(<BrushingRecordDisplay
        alertBrushingRecord={alertBrushingRecord}
        record={record}
        navigation
    />)
    expect(toJSON()).toMatchSnapshot();
})

test('it navigates on press', () => {
    const { getByTestId } = render(<BrushingRecordDisplay
        alertBrushingRecord={alertBrushingRecord}
        record={record}
        navigation={navigation}
    />)

    fireEvent.press(getByTestId('Navigate.Button'))
    expect(navigation.navigate).toBeCalledWith('BrushingRecord', { record })
})

test('it calls delete button', () => {
    const { getByText } = render(<BrushingRecordDisplay
        alertBrushingRecord={alertBrushingRecord}
        record={record}
        navigation={navigation}
    />)
    fireEvent.press(getByText('Delete'))
    expect(alertBrushingRecord).toBeCalled()
})

test('it renders correct time', () => {
    const { getByText } = render(<BrushingRecordDisplay
        alertBrushingRecord={alertBrushingRecord}
        record={record}
        navigation={navigation}
    />)

    expect(getByText('Minutes: 2')).not.toBeNull()
    expect(getByText('Seconds: 32')).not.toBeNull()
})