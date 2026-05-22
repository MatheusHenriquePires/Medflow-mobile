export const APP_ROLES = ['ADMIN', 'DOCTOR', 'PATIENT'] as const;

export type AppRole = (typeof APP_ROLES)[number];
