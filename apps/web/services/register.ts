export const postRegister = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    });
    if (!response.ok) {
      throw new Error("Failed to register");
    }
    return response.json();
  } catch (error) {
    throw error;
  }
};
