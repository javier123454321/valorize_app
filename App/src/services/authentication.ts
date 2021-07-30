import { User, emptyUser } from "../models/user"

export default {
  async isLoggedIn(): Promise<{ isLoggedIn: boolean, user: User }> {
    const response = { isLoggedIn: false, user: emptyUser }
    const requestOptions = {
      method: "GET",
      credentials: "include",
    } as RequestInit
    const apiResponse = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/v0/me", requestOptions)

    if (apiResponse.status === 200) {
      const user = await apiResponse.json()
      response.isLoggedIn = true
      response.user = user
    }

    return response
  },
  async logout(): Promise<void> {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    } as RequestInit
    const apiResponse = await fetch(import.meta.env.VITE_BACKEND_URL + "/logout", requestOptions)
    if (apiResponse.status === 200) {
      return
    }
    throw new Error("Logout failed")
  },
}