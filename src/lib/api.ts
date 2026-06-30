import axios from "axios"
import { InteractionRequiredAuthError } from "@azure/msal-browser"
import { msalInstance, apiTokenRequest } from "@/lib/msalConfig"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5150",
  headers: { "Content-Type": "application/json" },
})

api.interceptors.request.use(async (config) => {
  const accounts = msalInstance.getAllAccounts()
  if (accounts.length === 0) return config

  try {
    const { accessToken } = await msalInstance.acquireTokenSilent({
      ...apiTokenRequest,
      account: accounts[0],
    })
    config.headers.Authorization = `Bearer ${accessToken}`
  } catch (err) {
    if (err instanceof InteractionRequiredAuthError) {
      // Token expired and can't be refreshed silently.
      // Send the user back to login — never hijack navigation with acquireTokenRedirect
      // mid-session as it breaks the SPA navigation flow.
      window.location.replace("/login")
    }
  }

  return config
})

export default api
