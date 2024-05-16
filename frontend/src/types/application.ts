export type TApplication = {
    id?: number;
    organization: number;
    status: "Approved" | "Denied" | "Waiting";
    amount: number;
    fullname: string;
}