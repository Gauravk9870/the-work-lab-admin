import React from "react";
import Styles from "./home.module.scss";
import axios from "axios";
import UserRegistrationChart from "../../components/UserRegistrationChart";

const Home = () => {
  const [freelancerData, setFreelancerData] = React.useState([]);
  const [organizationData, setOrganizationData] = React.useState([]);

  React.useEffect(() => {
    const fetchFreelancerData = async () => {
      const response = await axios.get("http://localhost:3000/api/freelancer/");
      console.log(response.data);
      setFreelancerData(response.data);
    };

    const fetchOrganizationData = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/organization/"
      );
      console.log(response.data);
      setOrganizationData(response.data);
    };

    fetchFreelancerData();
    fetchOrganizationData();
  }, []);

  // Process the data to extract months and counts
  const processUserData = (users) => {
    const registrationsByMonth = {};

    // Count user registrations for each month
    users.forEach((user) => {
      const month = new Date(user.createdAt).toLocaleString("default", {
        month: "long",
      });

      if (registrationsByMonth[month]) {
        registrationsByMonth[month]++;
      } else {
        registrationsByMonth[month] = 1;
      }
    });

    const months = Object.keys(registrationsByMonth);
    const counts = Object.values(registrationsByMonth);

    return { months, counts };
  };

  return (
    <div className={Styles.home}>
      <div className={Styles.container}>
        <div className={Styles.top}>
          <div className={Styles.grid}>
            <div className={Styles.card}>
              <div className={Styles[`card-container`]}>
                <div className={Styles[`card-container-left`]}>
                  <div className={`${Styles.icon} ${Styles.freelancer}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                </div>
                <div className={Styles[`card-container-right`]}>
                  <span className={Styles.title}>Freelancers</span>
                  <span className={Styles.count}>{freelancerData.length}</span>
                </div>
              </div>
            </div>
            <div className={Styles.card}>
              <div className={Styles[`card-container`]}>
                <div className={Styles[`card-container-left`]}>
                  <div className={`${Styles.icon} ${Styles.organization}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                      <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                      <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                      <path d="M10 6h4" />
                      <path d="M10 10h4" />
                      <path d="M10 14h4" />
                      <path d="M10 18h4" />
                    </svg>
                  </div>
                </div>
                <div className={Styles[`card-container-right`]}>
                  <span className={Styles.title}>Organizations</span>
                  <span className={Styles.count}>
                    {organizationData.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={Styles.bottom}>
          <UserRegistrationChart
            freelancerData={processUserData(freelancerData)}
            organizationData={processUserData(organizationData)}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
