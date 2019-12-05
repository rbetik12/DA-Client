export class Endpoints {
    private static ip = 'ec2-3-16-157-218.us-east-2.compute.amazonaws.com';
    private static port = ':4000';
    private static address = 'http://' + Endpoints.ip + Endpoints.port;

    public static login = Endpoints.address + '/api/login';
    public static register = Endpoints.address + '/api/register';
    public static globalChat = Endpoints.ip + ':5000';
    public static profile = Endpoints.address + '/api/profile';
}
