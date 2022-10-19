import { gql } from "@apollo/client";
import { EmployeeComponent } from "./EmployeeComponent";
import { useGetEmployeesQuery } from "./generated/graphql";
import { nonNullArray } from "./nonNullArray";

//This is read by GraphQL codegen to generate types
gql`
  query GetEmployees {
    employees {
      ...EmployeeComponent
    }
  }
`;

export const EmployeeListing = () => {
  const { loading, error, data } = useGetEmployeesQuery();
  if (loading) return <>Loading...</>;
  if (error) return <>error happened</>;
  if (!data || !data.employees) return <>empty data</>;

  const employees = nonNullArray(data.employees);
  return (
    <div>
      {employees.map((employee) => (
        <EmployeeComponent fragment={employee} />
      ))}
    </div>
  );
};
