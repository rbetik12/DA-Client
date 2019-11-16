export interface MessageModel {
    _id: string;
    userID: string;
    sender: string;
    text: string;
    liked?: boolean;
}
