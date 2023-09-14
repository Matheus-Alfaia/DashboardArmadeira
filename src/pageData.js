
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase/compat/app';
import "firebase/database";
import "firebase/compat/auth";
import React, {useEffect, useState} from "react";
import { Chart } from "react-google-charts";
import { LineChart, XAxis, YAxis, Line, ResponsiveContainer, Brush } from 'recharts';



import 'firebase/compat/database';
const firebaseConfig = {
  apiKey: "AIzaSyCYuu8VaPAERdK3HDHcDclCCrioFPWsa94",
  authDomain: "dashboardarmadeira.firebaseapp.com",
  projectId: "dashboardarmadeira",
  storageBucket: "dashboardarmadeira.appspot.com",
  messagingSenderId: "130093514128",
  appId: "1:130093514128:web:bfeda559f22df1f5188715"
};

firebase.initializeApp(firebaseConfig);

const Data = (chartWrapper) => {


    const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);
  const [data6, setData6] = useState([]);
  const [data7, setData7] = useState([]);
  const [data8, setData8] = useState([]);
  const [data9, setData9] = useState([]);
  const [data10, setData10] = useState([]);
  const [data11, setData11] = useState([]);
   const [data12, setData12] = useState([]);

 const [selectedRange, setSelectedRange] = useState([null, null]);

  useEffect(()=>{
    const database = firebase.database();
    const auth = firebase.auth();

    var ref = database.ref();

    const query = ref.orderByChild('tx').limitToLast(130);
    const query2 = ref.orderByChild('rx').limitToLast(130);
    const query3 = ref.orderByChild('chipOperator').limitToLast(1);
    const query4 = ref.orderByChild('batteryPower').limitToLast(20);
    const query5 = ref.orderByChild('wifiSignalLevel').limitToLast(20);
    const query6 = ref.orderByChild('wifiStandard').limitToLast(20);
    const query7 = ref.orderByChild('rsrp').limitToLast(15);
    const query8 = ref.orderByChild('rsrq').limitToLast(15);
    const query9 = ref.orderByChild('rssi').limitToLast(15);
    const query10 = ref.orderByChild('batteryCurrent').limitToLast(130);

    query.on('value', (snapshot) => {
      const data1 = snapshot.val();
      const dataArray1 = Object.entries(data1).map(([key, value]) => [value.time, value.tx]);
      //console.log(dataArray1);
      setData1(dataArray1);
    });
    query2.on('value', (snapshot) => {
      const data2 = snapshot.val();
      const dataArray2 = Object.entries(data2).map(([key, value]) => [value.time, value.rx]);
      //console.log(dataArray2);
      setData2(dataArray2.reverse());
    });
    query3.on('value', (snapshot) => {
          const data3 = snapshot.val();
          const dataArray3 = Object.entries(data3).map(([key, value]) => [value.time, value.chipOperator]);
          console.log(dataArray3);
          setData3(dataArray3.reverse());

        });
    query4.on('value', (snapshot) => {
      const data4 = snapshot.val();
      const dataArray4 = Object.entries(data4).map(([key, value]) => [value.time, value.batteryPower]);
      //console.log(dataArray4);
      setData4(dataArray4.reverse());
    });
    query5.on('value', (snapshot) => {
      const data5 = snapshot.val();
      const dataArray5 = Object.entries(data5).map(([key, value]) => [value.time, value.wifiSignalLevel]);
      //console.log(dataArray5);
      setData5(dataArray5.reverse());
    });
    query6.on('value', (snapshot) => {
      const data6 = snapshot.val();
      const dataArray6 = Object.entries(data6).map(([key, value]) => [value.time, value.wifiStandard]);
      //console.log(dataArray6);
      setData6(dataArray6.reverse());
    });
    query7.on('value', (snapshot) => {
          const data7 = snapshot.val();
          const dataArray7 = Object.entries(data7).map(([key, value]) => [value.time, value.rsrp]);
          //console.log(dataArray7);
          setData7(dataArray7.reverse());
        });
    query8.on('value', (snapshot) => {
          const data8 = snapshot.val();
          const dataArray8 = Object.entries(data8).map(([key, value]) => [value.time, value.rsrq]);
          setData8(dataArray8.reverse());
        });
    query9.on('value', (snapshot) => {
          const data9 = snapshot.val();
          const dataArray9 = Object.entries(data9).map(([key, value]) => [value.time, value.rssi]);
          //console.log(dataArray6);
          setData9(dataArray9.reverse());
        });
    query10.on('value', (snapshot) => {
          const data10 = snapshot.val();
          const dataArray10 = Object.entries(data10).map(([key, value]) => [value.time, value.batteryCurrent]);
          //console.log(dataArray6);
          setData10(dataArray10.reverse());
        });

  }, []);

  const handleBrushChange = (data) => {
      if (data && data.length > 0) {
        const { startIndex, endIndex } = data[0];
        const startDate = data1[startIndex].time;
        const endDate = data1[endIndex].time;
        setSelectedRange([startDate, endDate]);
      } else {
        setSelectedRange([null, null]);
      }
    };

    const filteredData1 = selectedRange[0] && selectedRange[1]
      ? data1.filter((entry) => entry.time >= selectedRange[0] && entry.time <= selectedRange[1])
      : data1;

    const filteredData2 = selectedRange[0] && selectedRange[1]
      ? data2.filter((entry) => entry.time >= selectedRange[0] && entry.time <= selectedRange[1])
      : data2;

    function timeToSeconds(time) {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    }
  return (

                <div className="App" style={{ display: 'flex', height:'100%', justifyContent: 'center'}}>
                 <div class="flex-shrink-0 p-3" style={{width: '250px', background:'#fff0d6'}}>
                        <a href="/" class="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom">
                          <ul class="list-unstyled ps-0">
                                <li class="mb-1">
                                  <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                                    Home
                                  </button>
                                  <div class="collapse show" id="home-collapse">
                                    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">

                                      <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Updates</a></li>

                                    </ul>
                                  </div>
                                </li>
                                <li class="mb-1">
                                  <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                                    Dashboard
                                  </button>
                                  <div class="collapse" id="dashboard-collapse">
                                    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                      <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Overview</a></li>
                                      <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Weekly</a></li>
                                      <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Monthly</a></li>
                                      <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Annually</a></li>
                                    </ul>
                                  </div>
                                </li>
                                <li class="mb-1">
                                  <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                                    About
                                  </button>
                                  <div class="collapse" id="orders-collapse">
                                    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                      <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">New</a></li>
                                      <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Processed</a></li>
                                      <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Shipped</a></li>
                                      <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Returned</a></li>
                                    </ul>
                                  </div>
                                </li>
                                <li class="border-top my-3"></li>
                                <li class="mb-1">
                                  <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
                                    Account
                                  </button>
                                  <div class="collapse" id="account-collapse">
                                    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                      <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Settings</a></li>
                                      <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Sign out</a></li>
                                    </ul>
                                  </div>
                                </li>
                              </ul>
                        </a>

                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
                        <div className="chart-container">
                                                 <Chart
                                                           chartType="LineChart"
                                                           data={[
                                                             ['Time', 'UpLink', 'DownLink', 'Battery Current'],
                                                             ...data1.map(([time, tx], index) => [
                                                               timeToSeconds(time), tx/1000,(data2[index][1]/10), (data10[index][1]/10),
                                                             ]),
                                                           ]}
                                                           options={{
                                                             title: 'UpLink vs Battery Current',
                                                             hAxis: {
                                                               title: 'Time(s)',
                                                             },
                                                             vAxes: {
                                                                 0:{
                                                                     title: 'Throughput(Kbps)',
                                                                     minValue: 0,
                                                                 },
                                                                 1:{
                                                                     title: 'Current(mA)',
                                                                 },
                                                               },
                                                               series: {
                                                                     0: { targetAxisIndex: 0 }, // Série 0 (BatteryCurrent) usa o eixo esquerdo (0)
                                                                     1: { targetAxisIndex: 1 }, // Série 1 (Battery Temperature) usa o eixo esquerdo (0)
                                                                   },
                                                             explorer: {
                                                                   axis: 'horizontal',
                                                                   keepInBounds: true,
                                                                   maxZoomIn: 4.0,
                                                             },
                                                           }}
                                                           chartPackages={["corechart", "controls"]}
                                                           width="100%"
                                                           height="310px"

                                                           controls={[
                                                                   {
                                                                     controlType: "ChartRangeFilter",
                                                                     options: {
                                                                       filterColumnIndex: 0,
                                                                       ui: {
                                                                         chartType: "Chart",
                                                                         chartOptions: {
                                                                           chartArea: { width: "90%", height: "60%" },
                                                                           hAxis: { baselineColor: "none" },
                                                                         },

                                                                       },
                                                                     },
                                                                     controlPosition: "bottom",
                                                                     controlWrapperParams: {
                                                                       state: {
                                                                         range: {
                                                                            start: filteredData1[0]?.time || null,
                                                                            end: filteredData1[filteredData1.length - 1]?.time || null,
                                                                         },
                                                                       },
                                                                     },
                                                                      controlProps: {
                                                                           className: "label-search", // Adicione a classe CSS personalizada aqui
                                                                         },
                                                                   },
                                                                 ]}
                                                         />
                                                        <br></br>
                                                 </div>


                      </div>


                </div>





  );
};
export default Data;

