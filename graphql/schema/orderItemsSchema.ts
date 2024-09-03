import { gql } from 'graphql-tag';

export const orderItemsTypeDefs = gql`
type OrderItem {
  id: Int!
  quantity: Int!
  productId: Int!
  orderId: Int!
}

type Product {
    id: Int!
    name: String!
    price: Float!
  }

type Query {
  orderItems(orderId: Int!): [OrderItem!]!
  products: [Product!]!
}

type Mutation {
  createOrderItem(orderId: Int!, productId: Int!, quantity: Int!): OrderItem!
  deleteOrderItem(id: Int!): OrderItem!
}
`;