import { UserData } from "@/interfaces/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      name: string,
      surname: string,
      patronymic: string,
      login: string,
      email: string,
      password:string,
      password_repeat:string,
      rules: boolean,
      id: number
    }
  }
}


const handler  = NextAuth({
    providers:[
        CredentialsProvider({
            id: 'credentials',
            name:'demosite',
            credentials:{
                password: { label: 'Password', type: 'password' },
                login:{label: 'Login', type: 'login'}
            },
            async authorize(credentials: any, req,) {
                const userRes = await fetch(`http://localhost:8000/user?login=${credentials.login}`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                });
      
                const userData = await userRes.json();
                if (!userRes.ok) {
                  throw new Error(userData.message);
                }

                if (userData[0].password == credentials.password) {
                  return userData[0]
                } else {
                  throw new Error('Неправильный логин или пароль');
                }
            },
          }),
        ],
    secret:process.env.JWT_SECRET,
    pages:{
        signIn:'',
        signOut:''
    },
    session:{
        strategy:'jwt'
    },
    callbacks:{
        async jwt({ token, user, account }:any) {
            if (account && user) {
              return {
                ...token,
                accessToken: user.token,
                refreshToken: user.refreshToken,
                userData:user
              };
            }   
      
            return token;
          },
      
          async session({ session, token }:any) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.accessTokenExpires = token.accessTokenExpires;
            session.user = token.userData;
            

            return Promise.resolve(session);
          },
        },
})

export { handler as GET, handler as POST }