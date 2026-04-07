// Set the base url
const BASE_URL = "http://localhost:8000"

// Built a wrapper function to make service function api calls simpler
export async function request(path: string, options?: RequestInit) {
    const headers: Record<string, string> = {
        // Leave headers alone if defined by parameter
        ...(options?.headers as Record<string, string>),
        // Provide default headers for POST
        ...(options?.method === "POST"
            ? { "Content-Type": "application/json" }
            : {})
    }

    // Make the call
    try {
        const response = await fetch(BASE_URL + path, { ...options, headers })
        
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }

        const result = await response.json()
        return result
    } catch (error) {
        console.error(error)
        throw error
    }
}