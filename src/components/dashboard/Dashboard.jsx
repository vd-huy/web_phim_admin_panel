import { Card, CardContent, Icon, Typography } from "@mui/material";
import MovieIcon from "@mui/icons-material/Movie";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LineChart from "../chart/LineChart";
import { useEffect, useState } from "react";
import { fetchCountUserRegisterToDay,fetchTotalUser } from "../../apis";

const Dashboard = () => {

  const [countUserNew, setCountUserNew] = useState(0);
  const [countUserTotal, setCountUserTotal] = useState(0);
  const countMovieUpdate = 22;
  const countMovieTotal = 26625;

  const jwt = sessionStorage.getItem("jwt") || localStorage.getItem("jwt");

  const now = new Date().toLocaleDateString('en-CA');

  useEffect(()=>{

    const fetchAllApi = async ()=>{
      try{
        const [countUserNewResponse, totalUserResponse] = await Promise.all([
          fetchCountUserRegisterToDay(jwt,now),
          fetchTotalUser(jwt)
        ]);

        console.log(countUserNewResponse, totalUserResponse);

        if (countUserNewResponse.data.length === 0) {
          setCountUserNew(0)
        }else{
          setCountUserNew(countUserNewResponse.data.userCount)
        }

        setCountUserTotal(totalUserResponse.data.count);

      }catch (error){
        console.log(error);
      }

    }

    fetchAllApi()

  },[jwt])
 

  return (
    <div className="h-[1000px] mt-6 ml-4 ">
      <h1 className="text-xl font-semibold">Dashboard</h1>

      <div className="mt-8 flex justify-between ">
        <Card className="w-[24%] rounded-2xl">
          <CardContent>
            <Typography
              sx={{ fontSize: 18, textAlign: "center" }}
              color="text.secondary"
              gutterBottom
            >
              Cập nhật hôm nay
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{
                textAlign: "center",
                fontSize: 18,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MovieIcon sx={{ fontSize: 25, color: "rgb(22, 119, 255)" }} />
              <Typography
                sx={{
                  margin: "0 5px",
                  fontSize: 18,
                  color: "rgb(22, 119, 255)",
                }}
                component="span"
              >
                {countMovieUpdate}
              </Typography>
              (người dùng)
            </Typography>
          </CardContent>
        </Card>
        <Card className="w-[24%] rounded-2xl">
          <CardContent>
            <Typography
              sx={{ fontSize: 18, textAlign: "center" }}
              color="text.secondary"
              gutterBottom
            >
              Tổng số lượng phim
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{
                textAlign: "center",
                fontSize: 18,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MovieIcon sx={{ fontSize: 25, color: "rgb(22, 119, 255)" }} />
              <Typography
                sx={{
                  margin: "0 5px",
                  fontSize: 18,
                  color: "rgb(22, 119, 255)",
                }}
                component="span"
              >
                {countMovieTotal}
              </Typography>
              (người dùng)
            </Typography>
          </CardContent>
        </Card>
        <Card className="w-[24%] rounded-2xl">
          <CardContent>
            <Typography
              sx={{ fontSize: 18, textAlign: "center" }}
              color="text.secondary"
              gutterBottom
            >
              Người dùng mới hôm nay
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{
                textAlign: "center",
                fontSize: 18,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AccountBoxIcon
                sx={{ fontSize: 25, color: "rgb(22, 119, 255)" }}
              />
              <Typography
                sx={{
                  margin: "0 5px",
                  fontSize: 18,
                  color: "rgb(22, 119, 255)",
                }}
                component="span"
              >
                {countUserNew}
              </Typography>
              (người dùng)
            </Typography>
          </CardContent>
        </Card>
        <Card className="w-[24%] rounded-2xl">
          <CardContent>
            <Typography
              sx={{
                fontSize: 18,
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              color="text.secondary"
              gutterBottom
            >
              Tổng số người dùng
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{
                textAlign: "center",
                fontSize: 18,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AccountBoxIcon
                sx={{ fontSize: 25, color: "rgb(22, 119, 255)" }}
              />
              <Typography
                sx={{
                  margin: "0 5px",
                  fontSize: 18,
                  color: "rgb(22, 119, 255)",
                }}
                component="span"
              >
                {countUserTotal}
              </Typography>
              (người dùng)
            </Typography>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
      <h1 className="text-xl font-semibold">Số người dùng đăng kí</h1>
        <LineChart />
      </div>
    </div>
  );
};

export default Dashboard;
