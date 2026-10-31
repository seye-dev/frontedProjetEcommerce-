export interface User {

 id: number; 
 name: string;
email: string;
}


// Informations d'un utilisateur enregistré
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string | null;
  adresse: string | null;
  created_at?: string;
  updated_at?: string;
}

// Informations envoyées à Laravel
export interface UserData {
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  role?: string;
  phone?: string | null;
  adresse?: string | null;
}

// Réponse de Laravel
export interface UserResponse {
  success?: boolean;
  message: string;
  user?: User;
  data?: User | User[];
  token?: string;
}


export interface Credentials {
 email: string;
password: string;
}
export interface Registration extends Credentials {
 name: string;
  password_confirmation: string;
}
export interface AuthResponse { token: string; user: User; }