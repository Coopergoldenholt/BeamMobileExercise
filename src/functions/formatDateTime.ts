import moment from 'moment'

export const formatDateTime = (date: Date) => {
    return moment(date).format('LLL')
}