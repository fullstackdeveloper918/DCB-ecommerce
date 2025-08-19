export interface User {
  name: string;
  userRole: string;
  email: string;
  user_id: string;
  validAccount: boolean;
  [key: string]: any; 
}