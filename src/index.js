const {GraphQLServer} = require('graphql-yoga')

//need types and resolvers
const typeDefs = `
    type Query {
        info: String!
        feed: [Link!]!
    }

    type Link {
        id: ID!
        url: String!
        description: String!
    }

    type Mutation {
        post(url: String! , description: String!): Link!
    }
`

const resolvers = {
    Query : {
        info: () => 'This is a query',
        feed: () => links
    },

    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description ,
                url: args.url

            }
            links.push(link)
            return link
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => console.log('Server is running in http:localhost:4000'))

let links = [
    {
    id : 'links-0',
    url : 'www.reddit.com',
    description : 'omg this guy types so slow'
    },
    {
    id : 'links-1',
    url : 'www.reddit.com/careers',
    description : 'omg this guy types so slow'
    },
]

let idCount = links.length