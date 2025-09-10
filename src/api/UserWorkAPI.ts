import api from "@/lib/axios";
import type { ChatMessage, EmailApplication, Message, Postulation, SMS, updateStatusForm, User, Work } from "../types";
import { ApplicationDataSchema, CandidateSchema, JobSchema, notificationSchema, postulationsSchema } from "../types";
import { isAxiosError } from "axios";

export async function getPostulationsWorks() {
    try {
        const { data } = await api('/work/postulations/works');
        const response = JobSchema.safeParse(data.works);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error)) {
            return error.response?.data.message;
        }
    }
}

export async function postulateToWork(formData: Postulation) {
    try {
        const url = `/work/postulations/${formData.work}/postulate`
        const { data } = await api.post<Message>(url, formData);
        return data.message;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.message);
        }
    }
}

export async function saveJobs(workId: Work['_id']){
    try {
        const { data } = await api.post<Message>(`/work/candidate/save-job/${workId}`);
        return data.message;
    } catch (error) {
          if (isAxiosError(error)) {
            throw new Error(error.response?.data?.message);
        }
    }
}

export async function getNotifications() {
    try {
        const { data } = await api('/work/notifications');
        const response = notificationSchema.safeParse(data.notifications);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.message);
        }
    }
}

export async function confirmNotification(id: string) {
    try {
        const { data } = await api.put<Message>(`/work/notifications/${id}`);
        return data.message;
    } catch (error) {
        if (isAxiosError(error)) {
            return error.response?.data.message;
        }
    }
}

export async function getCandidateInformation() {
    try {
        const { data } = await api('/work/postulations/getCandidates');
        const response = CandidateSchema.safeParse(data.candidates);
        if (response.success) {
            return response.data;
        } else {
            return [];
        }
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.message);
        }

        return [];
    }
}

export async function getAllPostulations() {
    try {
        const { data } = await api('/work/postulations/getAll');
        const response = postulationsSchema.safeParse(data.postulations);
        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.message);
        }
    }
}

export async function updateStatus(formData: updateStatusForm) {
    const { postulationId, status } = formData;
    try {
        const url = `/work/postulations/${postulationId}/updateStatus`;
        const { data } = await api.put<Message>(url, { status });
        return data.message;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.message);
        }
    }
}

export async function rejectPostulation(postulationId: updateStatusForm['postulationId']) {
    try {
        const url = `/work/postulations/${postulationId}/reject`;
        const { data } = await api.put<Message>(url);
        return data.message;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.message);
        }
    }
}

// This sectio is for the Candidte Applications
export async function getAllMyPostulations() {
    try {
        const { data } = await api('/work/candidate/getAllMyPostulations');
        const response = ApplicationDataSchema.safeParse(data.postulations);
        if (response.success) {
            return response.data;
        } else {
            return [];
        }
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.message);
        }
        return [];
    }
}

export async function sendEmailFollowUp(formData: EmailApplication) {
    try {
        const { data } = await api.post<Message>('/work/candidate/sendEmailFollowUp', formData);
        return data.message;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.message);
        }
    }
}

// Messages between Candidate and Recruiters
export async function chatParners() {
    try {
        const { data } = await api.get('/work/messages/chatParners');
        return data.recrutiers;
    } catch (error) {
        if (isAxiosError(error)) {
            throw new Error(error.response?.data?.message);
        }
        return [];
    }
}

export async function sendMessage(formData: SMS) {
    try {
        const { data } = await api.post<Message>('/work/messages/send', formData);
        return data.message;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data?.message);
        }
    }
}

export async function getAllMessages(receiver: User['_id']) {
    try {
        const { data } = await api.get<{ messages: ChatMessage[] }>(`/work/messages/getAll/${receiver}`);
        return data.messages;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response?.data?.message);
        }
    }
}