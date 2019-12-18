export interface MessageModel {
    _id: string;
    userID: string;
    sender: string;
    text: string;
    latitude: number;
    longitude: number;
    coefficient?: number;
    liked?: boolean;
}
