import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import BrushingRecord from '..'
import AsyncStorage from '@react-native-async-storage/async-storage';

const route = {
    params: {
        record: {
            date: new Date(),
            duration: { minutes: '2', seconds: '34' }
        }
    }
}

const navigation = {
    navigate: jest.fn(),
    goBack: jest.fn()
};

test('renders correctly', () => {
    const { toJSON } = render(<BrushingRecord navigation route={route} />)
    expect(toJSON()).toMatchSnapshot();
})


test('Button fires with params', async () => {

    const { getByTestId } = render(<BrushingRecord navigation route={route} />)

    fireEvent.press(getByTestId('SaveRecord.Button'))
    expect(AsyncStorage.getItem).toBeCalledWith('brushingRecords');
})

test('Button fires without params', () => {
    const { getByTestId } = render(<BrushingRecord navigation={navigation} route={{ params: null }} />)

    fireEvent.press(getByTestId('SaveRecord.Button'))
    expect(AsyncStorage.getItem).toBeCalledWith('brushingRecords');
    expect(AsyncStorage.setItem).toBeCalledWith('brushingRecords', '[]');
})

test('header is Edit Record', () => {
    const { getByText } = render(<BrushingRecord navigation route={route} />)

    expect(getByText('Edit Record')).not.toBeNull()
})

test('header is Add Record', () => {
    const { getByText } = render(<BrushingRecord navigation route={{ params: null }} />)

    expect(getByText('Add Record')).not.toBeNull()
})

test('minutes value is equal to 2', () => {
    const { getByPlaceholderText, getAllByDisplayValue } = render(
        <BrushingRecord
            navigation
            route={{ params: null }}
        />
    )

    fireEvent.changeText(
        getByPlaceholderText('Minutes'),
        '2'
    );
    const minutes = getAllByDisplayValue('2');
    expect(minutes).toHaveLength(1)
})

test('seconds value is equal to 34', () => {
    const { getByPlaceholderText, getAllByDisplayValue } = render(
        <BrushingRecord
            navigation
            route={{ params: null }}
        />
    )

    fireEvent.changeText(
        getByPlaceholderText('Seconds'),
        '34'
    );
    const seconds = getAllByDisplayValue('34');
    expect(seconds).toHaveLength(1)
})