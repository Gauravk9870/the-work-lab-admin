import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTable } from "react-table";
import Styles from "./organization.module.scss";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Organization = () => {
  const [organizationData, setOrganizationData] = useState([]);
  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/organization/`);
        setOrganizationData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOrganizationData();
  }, []);

  // Define table columns
  const columns = React.useMemo(
    () => [
      {
        Header: "Company Name",
        accessor: "companyName",
      },
      {
        Header: "Trade Name",
        accessor: "tradeName",
      },
      {
        Header: "GSTIN",
        accessor: "GSTIN",
      },
      {
        Header: "Year of Incorporation",
        accessor: "yearOfIncorporation",
      },
      {
        Header: "Number of Employees",
        accessor: "numberOfEmployees",
      },
      // Add more columns as needed
    ],
    []
  );

  // Create an instance of the table
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: organizationData,
    });
  return (
    <div className={Styles.tableContainer}>
      <h1>Organizations</h1>
      <table {...getTableProps()} className={Styles.customTable}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Organization;
