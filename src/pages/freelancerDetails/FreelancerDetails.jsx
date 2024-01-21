import React, { useEffect, useState } from "react";
import styles from "./freelancerDetails.module.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/loading/Loading";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const FreelancerDetails = () => {
  const [freelancerData, setFreelancerData] = useState({});
  const { freelancerId } = useParams();
  const [expertise, setExpertise] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFreelancerData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/api/freelancer/${freelancerId}`
        );

        if (response.status === 200) {
          console.log(response.data);

          setFreelancerData(response.data);
          setExpertise(response.data.expertise.split(","));
          setLoading(false);
        } else {
          console.error("Failed to fetch freelancer data");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching freelancer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancerData();
  }, [freelancerId]);

  const downloadResume = async (link) => {
    window.open(link, "_blank");
  };

  return (
    <>
      <div className={styles.freelancerDetails}>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.left}>
              <div className={styles.profile}>
                <img
                  src="https://avatars.githubusercontent.com/u/78679960?v=4"
                  alt=""
                />
              </div>

              <div className={styles.resume}>
                <button onClick={() => downloadResume(freelancerData?.resume)}>
                  Download Resume
                </button>
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.name}>
                <h1>
                  {freelancerData?.firstName} {freelancerData?.lastName}
                </h1>
                <p>Freelancer</p>
              </div>
              <div className={styles[`right-container`]}>
                <div className={styles.location}>
                  <div className={styles.item}>
                    <h6>Email</h6>
                    <p>{freelancerData?.email}</p>
                  </div>

                  {/* <div className={styles.item}>
                    <h6>Phone Number</h6>
                    <p>+91 9871311597</p>
                  </div> */}
                </div>

                <div className={styles.location}>
                  <div className={styles.item}>
                    <h6>Gender</h6>
                    <p>{freelancerData?.gender}</p>
                  </div>

                  <div className={styles.item}>
                    <h6>Date of Birth</h6>
                    <p>{freelancerData?.dateOfBirth}</p>
                  </div>
                </div>

                <div className={styles.location}>
                  <div className={styles.item}>
                    <h6>Location</h6>
                    <p>
                      {freelancerData.city}, {freelancerData.country}
                    </p>
                  </div>

                  <div className={styles.item}>
                    <h6>Experience</h6>
                    <p>{freelancerData?.yearsOfExperience}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.bottom}>
            <div className={styles[`item`]}>
              <h6>Member since</h6>
              <p>
                {new Date(freelancerData.createdAt).toLocaleDateString(
                  "en-US",
                  { month: "long", day: "numeric", year: "numeric" }
                )}
              </p>{" "}
            </div>

            <div className={styles[`item`]}>
              <h6>Bio</h6>
              <p>{freelancerData?.shortBio}</p>
            </div>

            <div className={styles[`item`]}>
              <h6>Area of Expertise</h6>
              <ul>
                {expertise.map((expertise, index) => (
                  <li key={index}>{expertise}</li>
                ))}
              </ul>
            </div>

            <div className={styles.item}>
              <h6>Products of Interest</h6>
              <p>{freelancerData?.interestedProducts}</p>
            </div>

            <div className={styles.item}>
              <h6>What interests you about freelancing</h6>
              <p>{freelancerData?.freelancerInterest}</p>
            </div>

            <div className={styles.item}>
              <h6>Key to success when working remotely</h6>
              <p>{freelancerData?.remoteWorkSuccessKey}</p>
            </div>
          </div>
        </div>
      </div>

      {loading && <Loading message="Fetching freelancer data..." />}
    </>
  );
};

export default FreelancerDetails;
