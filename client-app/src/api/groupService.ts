import axiosClient from "./axiosClient";

const groupService:any = {};

groupService.getAllGroup = () =>{
    const url = `/group/read`;
    return axiosClient.get(url)
}

groupService.createNewGroup = (data:any) =>{
    const url = `/group/create`;
    return axiosClient.post(url, data)
}

export default groupService;