import React, { useEffect, useState } from "react";
import styles from "./organizationDetails.module.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/loading/Loading";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const OrganizationDetails = () => {
  const [organizationData, setOrganizationData] = useState({});
  const { organizationId } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrganizationData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/api/organization/${organizationId}`
        );

        if (response.status === 200) {
          console.log(response.data);

          setOrganizationData(response.data);
          setLoading(false);
        } else {
          console.error("Failed to fetch organization data");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching organization data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizationData();
  }, [organizationId]);

  return (
    <div className={styles.organizationDetails}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.right}>
            <div className={styles.name}>
              <h1>{organizationData?.companyName}</h1>
              <p>Ogranization</p>
            </div>
            <div className={styles[`right-container`]}>
              <div className={styles.location}>
                <div className={styles.item}>
                  <h6>Trade Name</h6>
                  <p>{organizationData?.tradeName}</p>
                </div>

                <div className={styles.item}>
                  <h6>Year of Incorporation</h6>
                  <p>{organizationData?.yearOfIncorporation}</p>
                </div>
              </div>

              <div className={styles.location}>
                <div className={styles.item}>
                  <h6>GSTIN</h6>
                  <p>{organizationData?.GSTIN}</p>
                </div>

                <div className={styles.item}>
                  <h6>Number of Employees</h6>
                  <p>{organizationData?.numberOfEmployees}</p>
                </div>
              </div>

              <div className={styles.location}>
                <div className={styles.item}>
                  <h6>Industry</h6>
                  <p>{organizationData?.industry}</p>
                </div>

                <div className={styles.item}>
                  <h6>Sector</h6>
                  <p>{organizationData?.sector}</p>
                </div>
              </div>

              <div className={styles.location}>
                <div className={styles.item}>
                  <h6>Type of Company</h6>
                  <p>{organizationData?.typeOfCompany}</p>
                </div>

                <div className={styles.item}>
                  <h6>Website</h6>
                  <a>{organizationData?.companyWebsite}</a>
                </div>
              </div>

              <div className={styles.turnover}>
                <div className={styles.item}>
                  <h6>Annual Turnover</h6>
                  <p>{organizationData?.annualTurnover}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.item}>
            <h6>About the Company</h6>
            <p>{organizationData?.aboutCompany}</p>
          </div>

          <div className={styles[`item`]}>
            <h6>Relationship to company </h6>
            <p>{organizationData?.relationshipToCompany}</p>
          </div>

          <div className={styles[`item`]}>
            <h6>Phone number of contact Person</h6>
            <p>{organizationData?.contactPersonPhoneNumber}</p>
          </div>

          <div className={styles.item}>
            <h6>Email ID of the contact person</h6>
            <p>{organizationData?.contactPersonEmail}</p>
          </div>

          <div className={styles.item}>
            <h6>Email ID of Company Director</h6>
            <p>{organizationData?.companyDirectorEmail}</p>
          </div>

          <div className={styles.item}>
            <h6>Phone Number of Company Director</h6>
            <p>{organizationData?.companyDirectorPhoneNumber}</p>
          </div>
          <div className={styles.item}>
            <h6>Services would you liked to explore</h6>
            <p>{organizationData?.servicesToExplore}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetails;
