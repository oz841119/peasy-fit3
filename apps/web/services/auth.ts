export const loginWithCredential = async (credential: {
  email: string;
  password: string;
}) => {
  return fetch("/api/auth/signin", {
    method: "POST",
    body: JSON.stringify(credential),
  }).then(res => res.json());
};
