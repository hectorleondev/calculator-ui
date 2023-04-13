import {object, string, TypeOf} from "zod";
import {useEffect, useState} from "react";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import AuthService from "../../api/auth";

export const useLogin = () => {
    const registerSchema = object({
        email: string().nonempty('Email is required').email('Email is invalid'),
        password: string()
            .nonempty('Password is required')
            .min(8, 'Password must be more than 8 characters')
            .max(32, 'Password must be less than 32 characters')
    });

    type RegisterInput = TypeOf<typeof registerSchema>;
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const {
        register,
        formState: { errors, isSubmitSuccessful },
        reset,
        handleSubmit,
    } = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
    });

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSubmitSuccessful]);

    const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
        setLoading(true);
        setErrorMessage('');
        AuthService.login(values.email, values.password)
            .then((response: any) => {
                const token = response.data.token;
                localStorage.setItem("auth_token", token);
                window.location.href = "/";
            }).catch((e: any) => {
                setErrorMessage(e.response.data.message);
            }).finally(()=> {
                setLoading(false);
            });
    };

    return {
        onSubmitHandler,
        register,
        errors,
        loading,
        handleSubmit,
        errorMessage,
        setErrorMessage,
        setLoading
    }
}