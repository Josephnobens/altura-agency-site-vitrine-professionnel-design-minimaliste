import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface ContactMessage {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export type Time = bigint;
export interface Service {
    id: string;
    title: string;
    icon: ExternalBlob;
    description: string;
}
export interface Project {
    id: string;
    title: string;
    createdAt: Time;
    description: string;
    image: ExternalBlob;
}
export interface backendInterface {
    addProject(id: string, title: string, description: string, image: ExternalBlob): Promise<void>;
    addService(id: string, title: string, description: string, icon: ExternalBlob): Promise<void>;
    clearAllData(): Promise<void>;
    getAllContactMessages(): Promise<Array<ContactMessage>>;
    getAllProjects(): Promise<Array<Project>>;
    getAllServices(): Promise<Array<Service>>;
    getProject(id: string): Promise<Project>;
    getService(id: string): Promise<Service>;
    isVisible(user: Principal): Promise<boolean>;
    removeProject(title: string): Promise<void>;
    setVisibility(isVisible: boolean): Promise<void>;
    submitContactMessage(name: string, email: string, message: string): Promise<void>;
    toggleVisibility(user: Principal): Promise<void>;
    updateProject(id: string, title: string, description: string): Promise<void>;
}
