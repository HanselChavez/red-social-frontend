export interface User {
  id: number
  email: string
  role: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: User
}
