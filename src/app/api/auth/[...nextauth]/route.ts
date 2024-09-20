import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await axios.post(
            "http://your-express-backend.com/api/login",
            {
              email: credentials?.email,
              password: credentials?.password,
            }
          );

          const user = response.data; // { name, email, userType, token }

          if (user && user.token) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error("Login failed:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.email = user.email;
        token.userType = user.userType;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        name: token.name,
        email: token.email,
        userType: token.userType,
        accessToken: token.accessToken,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export { authOptions };
export default NextAuth(authOptions);
