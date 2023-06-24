import NextAuth from 'next-auth'

export default NextAuth({
    providers: [
        {
            id: "worldcoin",
            name: "Worldcoin",
            type: "oauth",
            wellKnown: "https://id.worldcoin.org/.well-known/openid-configuration",
            idToken: true,
            clientId: "app_staging_0af5473e8e0e5c8eae581173d8a04603",
            clientSecret: "sk_58e057152ee876b958a28a40aaea3f70a0ad0696a4960461",
            profile(profile) {
                return {
                    id: profile.sub,
                    credential_type: profile["https://id.worldcoin.org/beta"].credential_type,
                }
            },
        }
    ],
})
