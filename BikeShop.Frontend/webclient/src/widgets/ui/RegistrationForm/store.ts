import {create} from 'zustand';
import $api from '../../../shared/http/axios';
import RegistrationData from "../../../entities/models/RegistrationData";
import {AxiosResponse} from "axios";

interface RegistrationFormState {
    registrationFetch: (data: RegistrationData) => Promise<AxiosResponse>;
}

const useRegistrationForm = create<RegistrationFormState>((set) => ({
    registrationFetch: (data) => {
        return $api.post('auth/register', data)
    },
}));

export default useRegistrationForm;
