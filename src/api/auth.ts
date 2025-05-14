const API_URL = 'http://localhost:5000/api/v1/auth';

export interface SignupData {
    username: string;
    password: string;
}

export interface LoginData {
    username: string;
    password: string;
}

export const signupUser = async (userData: SignupData) => {
    const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Signup failed');
    return data;
};

export const loginUser = async (credentials: LoginData) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Login failed');
    return data;
};
