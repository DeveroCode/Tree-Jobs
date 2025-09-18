import api from "@/lib/axios";
import { dashboardWorksSchema, JobPaginateSchema, SavedJobSchema } from "../types";
import type { Filters, Message, Work, WorkRegistrationForm } from '../types';
import { isAxiosError } from "axios";

export async function addWork(formData: WorkRegistrationForm) {
    try {
        const { data } = await api.post('/work/create', formData);
        return data.message;
    } catch (error) {
        if (isAxiosError(error)) {
            return error.response?.data.message;
        }
    }
}

export async function getWorks() {
    try {
        const url = '/work';
        const { data } = await api(url);
        const response = dashboardWorksSchema.safeParse(data.works);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error)) {
            return error.response?.data.message;
        }
    }
}

export async function getProyectById(workId: Work['_id']) {
    try {
        const { data } = await api(`/work/${workId}`);
        return data.work;
    } catch (error) {
        if (isAxiosError(error)) {
            return error.response?.data.message;
        }
    }
}

type WorkAPIType = {
    formData: WorkRegistrationForm,
    workId: Work['_id']
}

export async function updateWork({ formData, workId }: WorkAPIType) {
    try {
        const { data } = await api.put(`/work/${workId}/update`, formData);
        return data.message;
    } catch (error) {
        if (isAxiosError(error)) {
            return error.response?.data.message;
        }
    }
}

export async function updateWorkEnabled({ workId }: { workId: Work['_id'] }) {
    try {
        const { data } = await api.put<Message>(`/work/update/${workId}`);
        return data.message;
    } catch (error) {
        if (isAxiosError(error)) {
            return error.response?.data.message;
        }
    }
}

export async function getAllSavedJobs() {
    try {
        const { data } = await api('/work/candidate/getSavedJobs');
        const response = SavedJobSchema.safeParse(data.jobs);
        if (response.success) {
            console.log(response);
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error)) {
            return error.response?.data.message;
        }
    }
}

export type WorkFilterParams = {
    title?: Filters['title'];
    location?: Filters['location'];
}
export async function workFilter({ title, location }: WorkFilterParams) {
    try {
        const { data } = await api('/work/filters', { params: { title, location } });
        const response = JobPaginateSchema.safeParse(data);
        console.log(response)
        if (response.success) {
            return response.data;
        } else {
            console.error(response.error);
            return null;
        }
    } catch (error) {
        if (isAxiosError(error)) {
            console.log(error);
            return error.response?.data.message;
        }
    }
}