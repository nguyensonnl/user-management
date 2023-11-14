import axiosClient from "./axiosClient";

const permisisonService:any = {};

permisisonService.getPermission = () =>{
    const url = `/permission`;
    return axiosClient.get(url)
}

//multipe permission
// roleService.createRole = (role: any[]) =>{
//     const url = `/role/create`;
//     return axiosClient.post(url, [...role])
// }

//single permission
permisisonService.createPermission = (data:any) =>{
    const url = `/permission/create`;
    return axiosClient.post(url, data)
}

permisisonService.getPermissionByRole = (groupId:number) =>{
    const url = `/permission/by-group/${groupId}`;
    return axiosClient.get(url);
}

permisisonService.assignPermissionToRole = (data:any)=>{
    const url = `/permission/assign-to-group`;
    return axiosClient.post(url, {data})
}

export default permisisonService;