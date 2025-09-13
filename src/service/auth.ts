import axios from "axios";

interface LoginPayload {
  username: string;
  password: string;
  email?: string;
}
export interface LoginRes{
  accessToken:string;
  refreshToken:string;
  id:string|number;
  username:string;
  email:string;
  firstName:string;
  lastName:string;
  gender:string;
  image:string;
}
export const userLogin = async (payload: LoginPayload) => {
  const res = await axios.post("https://dummyjson.com/auth/login", payload);
  return res.data as LoginRes; 
};
