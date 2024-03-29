import axiosClient from "./axiosClient";

const roleService:any = {};

roleService.getRole = () =>{
    const url = `/role`;
    return axiosClient.get(url)
}

roleService.createRole = (data:any) =>{
    const url = `/role/create`;
    return axiosClient.post(url, data)
}

roleService.getRoleV2 = (query: string)=>{
    const url = `/role/v2?${query}`;
    return axiosClient.get(url)
}

export default roleService;