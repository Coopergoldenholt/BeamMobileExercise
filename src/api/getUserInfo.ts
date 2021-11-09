import axios from "axios"
import { IUser } from "../types"

export const getUserInfo = async (): Promise<IUser | string> => {
    try {
        let response = await axios.get('https://member-data.beam.dental/memberInfoHistory.json')

        let sortResp = response.data.sort((a: IUser, b: IUser) => {
            var effectiveDateA = a.effective_date
            var effectiveDateB = b.effective_date
            if (effectiveDateA < effectiveDateB) {
                return 1;
            }
            if (effectiveDateA > effectiveDateB) {
                return -1;
            }

            return 0;
        });

        return sortResp[0]
    }
    catch {
        return 'User not found'
    }
}