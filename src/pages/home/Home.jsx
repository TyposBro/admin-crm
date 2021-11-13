import Axios from "../../utils/axios";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";

export default function Home() {
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
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODViZmQ5Njg3NTA3OWUxYTg4YjBiNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNjgwNjg1NSwiZXhwIjoxNjM2ODkzMjU1fQ.kWeY9IyQW_WrbkmzkBG11BWX25UG0qId-lhkA-l2EX0",
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
