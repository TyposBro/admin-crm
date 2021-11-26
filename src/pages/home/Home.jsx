import Axios from "../../utils/axios";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState, useContext } from "react";
import { AuthContext } from "../../context/auth/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  const [stats, setStats] = useState([]);
  useEffect(() => {
    const getStats = async () => {
      try {
        const { data } = await Axios.get("/users/stats", {
          headers: {
            token: user.token,
          },
        });

        const sortedList = data.sort((a, b) => a._id - b._id);

        sortedList.map((item) =>
          setStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ])
        );
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [MONTHS]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={stats} title="User Analytics" grid dataKey="New User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
