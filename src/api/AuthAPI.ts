import api from "@/lib/axios";
import { userSchema } from "../types";
import type { LoginMessage, changePasswordForm, ConfirmToken, Message, RequestNewToken, UserLoginForm, UserRegisterForm, User, UserUpdateForm } from "../types";
import { isAxiosError } from "axios";

export type newPassword = {
    token: ConfirmToken['token'];
    password: changePasswordForm['password'];
}

export async function registerUser(formData: UserRegisterForm) {
    try {
        const { data } = await api.post<Message>("/auth/register", formData);
        return data.message;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error);
        }
    }
}

export async function confirmToken(token: ConfirmToken['token']) {
    try {
        const { data } = await api.post<Message>("/auth/confirm-account", { token });
        return data.message;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error);
        }
    }
}

export async function requestNewToken({ email }: RequestNewToken) {
    try {
        const { data } = await api.post<Message>("/auth/requestCode", { email });
        return data.message;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error);
        }
    }
}

export async function forgotPassword({ email }: RequestNewToken) {
    try {
        const { data } = await api.post<Message>("/auth/forgot-password", { email });
        return data.message;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error);
        }
    }
}

export async function validToken(token: ConfirmToken['token']) {
    try {
        const { data } = await api.post<Message>("/auth/validate-token", { token });
        return data.message;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error);
        }
    }
}

export async function changePassword({ token, password }: newPassword) {
    try {
        const url = `/auth/${token}/updated-password`;
        const { data } = await api.post<Message>(url, { password });
        return data.message;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error);
        }
    }
}

export async function login(formData: UserLoginForm) {
    try {
        const { data } = await api.post<LoginMessage>("/auth/login", formData);
        return data;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error);
        }
    }
}

export async function getUser() {
    try {
        const { data } = await api<User>("/auth/user");
        const response = userSchema.safeParse(data);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error);
        }
    }
}

export async function updateUser(formData: UserUpdateForm) {
    try {
        const { data } = await api.put<Message>("/auth/updated-user", formData);
        return data.message;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error);
        }
    }
}

export async function uploadImage(file: File) {
    let formData = new FormData();
    formData.append("image", file);
    try {
        const { data } = await api.put<Message>("/auth/upload-image", formData);
        return data.message;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error);
        }
    }
}
export async function uploadCV(cv: File) {
    let formData = new FormData();
    formData.append("cv", cv);
    try {
        const { data } = await api.put<Message>("/auth/upload-cv", formData);
        return data.message;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.error);
        }
    }
}