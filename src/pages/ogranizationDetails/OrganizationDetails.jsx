import React from "react";
import styles from "./organizationDetails.module.scss";

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
      <div className={styles.container}></div>
    </div>
  );
};

export default OrganizationDetails;
