import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserRole } from "./types";

// This is a mock authentication for demo purposes
// In a real application, you would validate against a database
const users = [
  {
    id: "1",
    name: "John Interviewer",
    email: "interviewer@example.com",
    password: "password123",
    role: "interviewer" as UserRole,
  },
  {
    id: "2",
    name: "Jane Candidate",
    email: "candidate@example.com",
    password: "password123",
    role: "candidate" as UserRole,
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = users.find(
          (user) => user.email === credentials.email && user.password === credentials.password
        );

        if (!user) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
};

// Helper function to check if user is authenticated
export function isUserAuthenticated(session: any): boolean {
  return !!session?.user;
}

// Helper function to check if user has specific role
export function hasRole(session: any, role: UserRole): boolean {
  return session?.user?.role === role;
}