import { gql } from 'graphql-tag';

export const salesTypeDefs = gql`
type Product {
  id: Int!
  name: String!
  price: Float!
}

type Order {
  id: Int!
  customer: String!
  orderItems: [OrderItem!]!
}

type OrderItem {
  id: ID!
  orderId: Int!
  productId: Int!
  quantity: Int!
  product: Product
  order: Order
}

type Query {
  products: [Product!]!
  orders: [Order!]!
}

type Mutation {
  createOrder(customer: String!): Order!
  addOrderItem(orderId: Int!, productId: Int!, quantity: Int!): OrderItem!
}
`