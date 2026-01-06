import { Todo } from "../constants"

const baseURL = "http://localhost:3000/api"

// Get auth token from localStorage
function getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
        return localStorage.getItem("authToken");
    }
    return null;
}

// Handle API responses and token expiration
async function handleApiResponse(response: Response) {
    if (response.status === 401) {
        // Token expired or invalid - clear localStorage and redirect to login
        if (typeof window !== 'undefined') {
            localStorage.removeItem("authToken");
            window.location.href = "/login";
        }
        throw new Error("Authentication required");
    }

    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    return response.json();
}

async function fetch_main(path: string, options: RequestInit = {}) {
    const token = getAuthToken();

    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...options.headers,
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(baseURL + path, {
        ...options,
        headers,
    });

    return handleApiResponse(response);
}

export async function getTodos(): Promise<Array<Todo>> {
    return await fetch_main("/todos");
}

export async function getTodoById(id: string): Promise<Todo> {
    return await fetch_main(`/todos/${id}`);
}

export async function createTodo(todo: { title: string; description?: string }): Promise<Todo> {
    return await fetch_main("/todos", {
        method: "POST",
        body: JSON.stringify(todo),
    });
}

export async function updateTodo(id: string, updates: { title?: string; description?: string; completed?: boolean }): Promise<Todo> {
    return await fetch_main(`/todos/${id}`, {
        method: "PUT",
        body: JSON.stringify(updates),
    });
}

export async function deleteTodo(id: string): Promise<{ success: boolean }> {
    return await fetch_main(`/todos/${id}`, {
        method: "DELETE",
    });
}

export async function getUserProfile() {
    return await fetch_main("/users");
}

export async function updateUserProfile(updates: { name: string }) {
    return await fetch_main("/users", {
        method: "PUT",
        body: JSON.stringify(updates),
    });
}
