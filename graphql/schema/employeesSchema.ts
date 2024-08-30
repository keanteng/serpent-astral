import { gql } from 'graphql-tag';

export const employeesTypeDefs = gql`
    scalar DateTime

    type Employee {
        id: String!
        age: Int!
        name: String!
        gender: String!
        date_of_birth: DateTime!
        address: String!
        state: String!
        phone_number: String!
        email: String!
        nationality: String!
        resident_status: String!
        marital_status: String!
        role: String!
        salary: Int!
        hire_date: DateTime!
        epf_number: Int!
        socso_number: Int!
        bank_account: String!
    }

    type Query {
        employees: [Employee!]!
    }
`