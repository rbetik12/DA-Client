export class Endpoints {
    private static ip = 'ec2-18-222-93-236.us-east-2.compute.amazonaws.com';
    private static port = ':4000';
    private static address = 'http://' + Endpoints.ip + Endpoints.port;

    public static login = Endpoints.address + '/api/login';
    public static register = Endpoints.address + '/api/register';
    public static globalChat = Endpoints.ip + ':5000';
    public static profile = Endpoints.address + '/api/profile';
    public static like = Endpoints.address + '/api/like';
    public static userLikes = Endpoints.address + '/api/user_likes';
    public static uploadPhoto = Endpoints.address + '/api/photo/upload';
    public static getPhotos = Endpoints.address + '/api/photo/get';
    public static deletePhotos = Endpoints.address + '/api/photo/delete';
    public static getMutualUsers = Endpoints.address + '/api/users/mutual-like/';
}


