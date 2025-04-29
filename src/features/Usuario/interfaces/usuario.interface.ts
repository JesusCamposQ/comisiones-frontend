export interface Usuario {
    id?: number;
    nombre: string;
    apellidos: string;
    username: string;
    password?: string;
    rol: string;
}

export enum Role {
    ADMIN = "admin",
    USER = "user",
}