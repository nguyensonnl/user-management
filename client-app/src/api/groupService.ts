import axiosClient from "./axiosClient";

const groupService:any = {};

groupService.getAllGroup = () =>{
    const url = `/group/read`;
    return axiosClient.get(url)
}

export default groupService;