import axiosClient from "./axiosClient";

const roleService:any = {};

roleService.getAllRole = () =>{
    const url = `/role/read`;
    return axiosClient.get(url)
}

// roleService.createRole = (role: any[]) =>{
//     const url = `/role/create`;
//     return axiosClient.post(url, [...role])
// }
roleService.createRole = (data:any) =>{
    const url = `/role/create`;
    return axiosClient.post(url, data)
}

roleService.getRolesByGroup = (groupId:number) =>{
    const url = `/role/by-group/${groupId}`;
    return axiosClient.get(url);
}

roleService.assignRolesToGroup = (data:any)=>{
    const url = `/role/assign-to-group`;
    return axiosClient.post(url, {data})
}

export default roleService;