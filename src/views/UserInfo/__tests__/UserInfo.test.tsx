import React from 'react'
import { render, fireEvent } from 'react-native-testing-library'

import UserInfo from '..'
import { getUserInfo } from '../../../api/getUserInfo'

jest.mock('@react-navigation/core');


const navigation = {
    navigate: jest.fn(),
    goBack: jest.fn()
};


it('renders default elements', async () => {
    const { toJSON } = render(<UserInfo navigation />)
    expect(toJSON()).toMatchSnapshot();
})

// it('create record moves to new screen', async () => {
//     const { getByText } = render(
//         <UserInfo navigation={navigation} />
//     )

//     fireEvent.press(getByText('Create Record'))

// })
