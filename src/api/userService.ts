import axiosClient from "./axiosClient";

const userService:any = {};

userService.register = (email:string, phone:string, username:string, password:string) =>{
    const url = `/regiser`;
    return axiosClient.post(url, {email, phone, username, password});
}

userService.login  = (data:any) =>{
    const url = `/login`;
    return axiosClient.post(url, {data});
}

userService.getAllUser = (page: number, limit: number) =>{
    let url = `/user`;
    
    if(page && limit){
        url = `/user?page=${page}&limit=${limit}`;
    }
    return axiosClient.get(url)
}

userService.getAccount = () =>{
    const url = `/account`;
    return axiosClient.get(url);
}

userService.logout = () =>{
    const url = `/logout`;
    return axiosClient.post(url)
}

userService.createNewUser = (data: object) =>{
    const url = `/user/create`;
    return axiosClient.post(url, data)
}

userService.deleteUser = (data: object)=>{
    const url = `/user/delete`;
    return axiosClient.delete(url, data);
}

userService.updateUser = (data: object)=>{
    const url = `/user/update`;
    return axiosClient.put(url, data)
}

export default userService;