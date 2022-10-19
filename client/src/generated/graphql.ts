import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Employee = {
  __typename?: "Employee";
  department: Maybe<Scalars["String"]>;
  jobTitle: Maybe<Scalars["String"]>;
  name: Maybe<Scalars["String"]>;
  picturePath: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  employees: Maybe<Array<Maybe<Employee>>>;
};

export type EmployeeComponentFragment = {
  __typename?: "Employee";
  name: string | null;
  jobTitle: string | null;
  department: string | null;
  picturePath: string | null;
};

export type GetEmployeesQueryVariables = Exact<{ [key: string]: never }>;

export type GetEmployeesQuery = {
  __typename?: "Query";
  employees: Array<{
    __typename?: "Employee";
    name: string | null;
    jobTitle: string | null;
    department: string | null;
    picturePath: string | null;
  } | null> | null;
};

export const EmployeeComponentFragmentDoc = gql`
  fragment EmployeeComponent on Employee {
    name
    jobTitle
    department
    picturePath
  }
`;
export const GetEmployeesDocument = gql`
  query GetEmployees {
    employees {
      ...EmployeeComponent
    }
  }
  ${EmployeeComponentFragmentDoc}
`;

/**
 * __useGetEmployeesQuery__
 *
 * To run a query within a React component, call `useGetEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmployeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmployeesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEmployeesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetEmployeesQuery,
    GetEmployeesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetEmployeesQuery, GetEmployeesQueryVariables>(
    GetEmployeesDocument,
    options
  );
}
export function useGetEmployeesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetEmployeesQuery,
    GetEmployeesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetEmployeesQuery, GetEmployeesQueryVariables>(
    GetEmployeesDocument,
    options
  );
}
export type GetEmployeesQueryHookResult = ReturnType<
  typeof useGetEmployeesQuery
>;
export type GetEmployeesLazyQueryHookResult = ReturnType<
  typeof useGetEmployeesLazyQuery
>;
export type GetEmployeesQueryResult = Apollo.QueryResult<
  GetEmployeesQuery,
  GetEmployeesQueryVariables
>;
