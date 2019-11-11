export interface MessageModel {
    _id: string;
    userID: number;
    sender: string;
    text: string;
    liked?: boolean;
}
