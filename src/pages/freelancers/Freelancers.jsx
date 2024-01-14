import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTable } from "react-table";
import Styles from "./freelancers.module.scss";

const Freelancers = () => {
  const [freelancerData, setFreelancerData] = useState([]);

  useEffect(() => {
    const fetchFreelancerData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/freelancer/"
        );
        setFreelancerData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchFreelancerData();
  }, []);

  // Define table columns
  const columns = React.useMemo(
    () => [
      // {
      //   Header: "ID",
      //   accessor: "_id",
      // },
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Country",
        accessor: "country",
      },
      {
        Header: "City",
        accessor: "city",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Years of Experience",
        accessor: "yearsOfExperience",
      },
      // Add more columns as needed
    ],
    []
  );

  // Create an instance of the table
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: freelancerData });

  return (
    <div className={Styles.tableContainer}>
      <h1>Freelancers</h1>
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

export default Freelancers;
