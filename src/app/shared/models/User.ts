export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  birthDate: Date;
  profilePicture?: string;
  role: 'particulier' | 'collecteur';
}
