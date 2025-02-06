export async function getCurrentUser(token: string) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
    const response = await fetch(`${apiUrl}/api/user/get-current`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API response in getCurrentUser:", data);

    if (!data.user) {
      throw new Error("No user data in API response");
    }

    return data.user;
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    throw error;
  }
}