import React from 'react'
import { formatDateTime } from '../formatDateTime'

test('return a string', () => {
    expect(formatDateTime(new Date(2018, 11, 24, 10, 33, 30, 0))).toEqual('December 24, 2018 10:33 AM')
})