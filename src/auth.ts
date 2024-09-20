import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          const response = await axios.post(
            "http://your-backend-url/api/login",
            {
              email: credentials.email,
              password: credentials.password,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          const user = response.data;

          if (response.status === 200 && user) {
            return user;
          } else {
            throw new Error("Invalid credentials");
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            // Axios specific error
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              throw new Error(
                error.response.data.message || "Authentication failed"
              );
            } else if (error.request) {
              // The request was made but no response was received
              throw new Error("No response from authentication server");
            } else {
              // Something happened in setting up the request that triggered an Error
              throw new Error("Error setting up the request");
            }
          } else {
            // Generic error
            throw new Error("An unexpected error occurred");
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
        token.userType = user.userType;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.userType = token.userType;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
