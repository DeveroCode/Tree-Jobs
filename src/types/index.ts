import { z } from "zod";

/** Type for messages */
export type Message = {
    message: string;
}

export type LoginMessage = {
    message: string;
    token: string;
}

/** Job Schema */
export const workShema = z.object({
    _id: z.string(),
    title: z.string(),
    isSaved: z.boolean().optional(),
    company: z.string().optional(),
    description: z.string(),
    location: z.string().optional(),
    salary: z.number().optional(),
    endDate: z.string(),
    enabled: z.boolean().optional(),
});

export type Work = z.infer<typeof workShema>;

export const SavedJobSchema = z.array(
    z.object({
        _id: z.string(),
        createdAt: z.string(),
        work: workShema
    })
);

export type SavedJobs = z.infer<typeof SavedJobSchema>;

export const dashboardWorksSchema = z.array(
    workShema.pick({
        _id: true,
        title: true,
        company: true,
        description: true,
        location: true,
        salary: true,
        endDate: true,
        enabled: true
    })
);

export type WorkRegistrationForm = Pick<Work, "title" | "company" | "description" | "location" | "salary" | "endDate">;
/** User Schema */
export const roles = ["recrutier", "candidate"] as const;
export type UserRole = (typeof roles)[number];

export const userSchema = z.object({
    _id: z.string(),
    name: z.string(),
    last_name: z.string().optional(),
    role: z.enum(roles),
    email: z.string().email(),
    company: z.string().optional(),
    image: z.string().optional(),
    cv: z.string().optional(),
    createdAt: z.string(),
    profession: z.string().optional(),
    phone_number: z.string().optional()
});

export type User = z.infer<typeof userSchema>;
export type UserUpdateForm = Pick<User, "name" | "last_name" | "email" | "role" | "company" | "cv" | "profession" | "phone_number"> & {
    password?: string;
    password_confirm?: string;
};
export type RequestNewToken = Pick<User, "email">;
export type UserRegisterForm = Pick<User, "email" | "name" | "role"> & {
    password: string,
    password_confirm: string;
}
export type changePasswordForm = Pick<UserRegisterForm, "password" | "password_confirm">
export type UserLoginForm = Pick<User, "email"> & {
    password: string;
};
export type ConfirmToken = {
    token: string;
};

/** postulations */
export const JobSchema = z.array(
    workShema.pick({
        _id: true,
        title: true,
        isSaved: true,
        company: true,
        description: true,
        location: true,
        salary: true,
        endDate: true,
    }).extend({
        user: userSchema,
        createdAt: z.string()
    })
);

export const JobPaginateSchema = z.object({
    works: JobSchema,
    currentPage: z.number(),
    total: z.number(),
    totalPages: z.number(),
});

export type JobsCardData = z.infer<typeof JobPaginateSchema>;
export type JobCardData = z.infer<typeof JobSchema>[number]

export const postulationSchema = z.object({
    work: z.string(),
    recrutier: z.string(),
    cv: z.string()
});

export type Postulation = z.infer<typeof postulationSchema>;

export const postulationsSchema = z.array(
    z.object({
        _id: z.string(),
        candidate: z.string(),
        cv: z.string(),
        status: z.string(),
        createdAt: z.string()
    })
);

export type PostulationData = z.infer<typeof postulationsSchema>;

/** Update Status */
export const status = ['pending', 'under_review', 'accepted', 'reject'] as const;
export type Status = (typeof status)[number];

/** Candidates */
export const CandidateSchema = z.array(
    z.object({
        _id: z.string(),
        status: z.string(),
        createdAt: z.string(),
        candidate: userSchema.pick({
            _id: true,
            name: true,
            last_name: true,
            email: true,
            company: true,
            cv: true,
            profession: true,
            phone_number: true
        }),
        work: workShema.pick({
            _id: true,
            title: true,
            description: true
        })
    })
);
export type CandidateInformation = z.infer<typeof CandidateSchema>;
export type updateStatusForm = {
    status: Status;
    postulationId: string;
}

export const ApplicationDataSchema = z.array(
    z.object({
        _id: z.string(),
        status: z.string(),
        work: workShema.pick({
            title: true,
            description: true,
            company: true,
            location: true,
            salary: true
        }),
        recrutier: userSchema.pick({
            _id: true,
            email: true,
            name: true,
            last_name: true
        }),
    })
)

export type ApplicationData = z.infer<typeof ApplicationDataSchema>;

/** Send Messages to Recruiters */
export type recrutiersSMS = Pick<User, '_id' | 'name' | 'last_name' | 'image'>;

export const statusTypes = ['sent', 'received', 'read'] as const;
export type StatusMessage = (typeof statusTypes)[number];
export type SMS = {
    sender: string;
    receiver: string;
    body: string;
    status: StatusMessage;
}

/** Send Email for Application */
export type EmailApplication = {
    to: string;
    from: string;
    workTitle: string;
    nameCandidate: string;
    fullNameRecrutier: string;
    idRecrutier: string;
}

export const ChatMessageSchema = z.object({
    _id: z.string(),
    sender: userSchema.pick({
        _id: true,
        name: true,
        last_name: true,
        image: true
    }),
    receiver: userSchema.pick({
        _id: true,
        name: true,
        last_name: true,
        image: true
    }),
    body: z.string(),
    status: z.string(),
    createdAt: z.string()
});

export type ChatMessage = z.infer<typeof ChatMessageSchema>;

/** Notifications */
export const notificationSchema = z.array(z.object({
    _id: z.string(),
    user: z.string(),
    message: z.string(),
    isRead: z.boolean(),
    createdAt: z.string()
}));

export type Notification = z.infer<typeof notificationSchema>;

// Filters
export type Filters = {
    location: string;
    salary: string;
    title: string;
}