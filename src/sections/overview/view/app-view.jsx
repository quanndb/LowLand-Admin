import { useSelector } from "react-redux";
import { faker } from "@faker-js/faker";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";

import Iconify from "src/components/iconify";

import AppTasks from "../app-tasks";
import AppNewsUpdate from "../app-news-update";
import AppOrderTimeline from "../app-order-timeline";
import AppCurrentVisits from "../app-current-visits";
import AppWebsiteVisits from "../app-website-visits";
import AppWidgetSummary from "../app-widget-summary";
import AppTrafficBySite from "../app-traffic-by-site";
import AppCurrentSubject from "../app-current-subject";
import AppConversionRates from "../app-conversion-rates";
import { user } from "src/redux/selectors/UserSelector";
import chartAPI from "src/services/API/chartAPI";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { DatePicker } from "@mui/lab";
import { Box } from "@mui/material";
import { string } from "prop-types";
import ChartLowSelling from "../ChartLowSelling";
import ChartTotalMoney from "../ChartTotalMoney";

// ----------------------------------------------------------------------

export default function AppView() {
  const userData = useSelector(user);

  const [data, setData] = useState([]);
  useEffect(() => {
    chartAPI
      .getToltalMoneyDayinMonth(6,2024)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        toast.error(err);
      });
  },[]);


  const [dataChart2, setDataForChart2] = useState([]);
  useEffect(() => {
    chartAPI
      .getTopBestSaleProduct(5)
      .then((res) => {
        setDataForChart2(res);
      })
      .catch((err) => {
        toast.error(err);
      });
  },[]);
  console.log(dataChart2);

  const [dataChart3, setDataForChart3] = useState([]);
  useEffect(() => {
    chartAPI
      .getTopLowSaleProduct(5)
      .then((res) => {
        setDataForChart3(res);
      })
      .catch((err) => {
        toast.error(err);
      });
  },[]);
  console.log(dataChart3);
  
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Welcome, {userData.fullName}
      </Typography>

      <Grid container spacing={3}>
        {/* <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Weekly Sales"
            total={714000}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="New Users"
            total={1352831}
            color="info"
            icon={
              <img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />
            }
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Item Orders"
            total={1723315}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Bug Reports"
            total={234}
            color="error"
            icon={
              <img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />
            }
          />
        </Grid> */}
        
        <Grid xs={12} md={12} lg={12}>
          <ChartTotalMoney
            title="Monthly Revenue"
            subheader="Daily Revenue for the Month"
            chart={{
              labels: data.map(item=> item.dayInMonth.toString()),
              series: [
                {
                  name: "Revenue",
                  type: "column",
                  fill: "solid",
                  data: data.map(item=> item.totalMoney),
                }
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6}>
          <AppWebsiteVisits
            title="Top Best-Selling Product"
            //subheader="Daily Revenue for the Month"
            chart={{
              labels: dataChart2.map(item=> item.productName),
              series: [
                {
                  name: "Total",
                  type: "column",
                  fill: "solid",
                  data: dataChart2.map(item=> item.quantity),
                }
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6}>
          <ChartLowSelling
            title="Top Low-Selling Product"
            //subheader="Daily Revenue for the Month"
            chart={{
              labels: dataChart3.map(item=> item.productName),
              series: [
                {
                  name: "Revenue",
                  type: "column",
                  fill: "solid",
                  data: dataChart3.map(item=> item.quantity),
                }
              ],
            }}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: "Italy", value: 400 },
                { label: "Japan", value: 430 },
                { label: "China", value: 448 },
                { label: "Canada", value: 470 },
                { label: "France", value: 540 },
                { label: "Germany", value: 580 },
                { label: "South Korea", value: 690 },
                { label: "Netherlands", value: 1100 },
                { label: "United States", value: 1200 },
                { label: "United Kingdom", value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: [
                "English",
                "History",
                "Physics",
                "Geography",
                "Chinese",
                "Math",
              ],
              series: [
                { name: "Series 1", data: [80, 50, 30, 40, 100, 20] },
                { name: "Series 2", data: [20, 30, 40, 80, 20, 80] },
                { name: "Series 3", data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                "1983, orders, $4220",
                "12 Invoices have been paid",
                "Order #37745 from September",
                "New order placed #XF-2356",
                "New order placed #XF-2346",
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: "FaceBook",
                value: 323234,
                icon: (
                  <Iconify
                    icon="eva:facebook-fill"
                    color="#1877F2"
                    width={32}
                  />
                ),
              },
              {
                name: "Google",
                value: 341212,
                icon: (
                  <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />
                ),
              },
              {
                name: "Linkedin",
                value: 411213,
                icon: (
                  <Iconify
                    icon="eva:linkedin-fill"
                    color="#006097"
                    width={32}
                  />
                ),
              },
              {
                name: "Twitter",
                value: 443232,
                icon: (
                  <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />
                ),
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: "1", name: "Create FireStone Logo" },
              { id: "2", name: "Add SCSS and JS files if required" },
              { id: "3", name: "Stakeholder Meeting" },
              { id: "4", name: "Scoping & Estimations" },
              { id: "5", name: "Sprint Showcase" },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}
