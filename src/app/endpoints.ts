export class Endpoints {
    private static ip = '192.168.1.100';
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
}
