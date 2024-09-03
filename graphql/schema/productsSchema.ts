import { gql } from 'graphql-tag';

export const productsTypeDefs = gql`
  type Query {
    searchProducts(term: String!): [Product!]!
    allProducts: [Product!]!
  }
  
  type Mutation {
    createProduct(name: String!, price: Float!): Product!
    deleteProduct(id: Int!): Product!
    updateProduct(id: Int!, name: String, price: Float): Product!
  }

  type Product {
    id: Int!
    name: String!
    price: Float!
  }
`;