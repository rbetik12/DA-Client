export interface MessageModel {
    id: number;
    sender: string;
    text: string;
    liked?: boolean;
}
