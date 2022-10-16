import { gql } from "@apollo/client";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EmployeeComponent } from "./EmployeeComponent";
import { excludeNullFromArray } from "./excludeNullFromArray";
import { Employee, useGetEmployeesQuery } from "./generated/graphql";

//This is read by GraphQL codegen to generate types
gql`
  query GetEmployees {
    employees {
      ...EmployeeComponent
    }
  }
`;

const SearchResultNonEmpty = ({ employees }: { employees: Employee[] }) => (
  <div>
    {employees.map((employee) => (
      <EmployeeComponent fragment={employee} />
    ))}
  </div>
);

export const SearchResult = () => {
  const { loading, error, data } = useGetEmployeesQuery();
  if (loading) {
    return (
      <div>
        <FontAwesomeIcon icon={faSpinner} size={"4x"} spin={true} />
      </div>
    );
  } else if (error) {
    return <div>error happened</div>;
  } else if (!data || !data.employees) {
    return <div>error happened</div>;
  } else {
    const employees = excludeNullFromArray<Employee>(data.employees);
    return <SearchResultNonEmpty employees={employees} />;
  }
};
