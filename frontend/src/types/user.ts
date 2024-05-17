export type TUser = {
    id: number;
    fullname: string;
    type?: "user" | "admin";
}