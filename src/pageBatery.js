
import './App.css';

import firebase from 'firebase/compat/app';
import "firebase/database";
import "firebase/compat/auth";
import React, {useEffect, useState} from "react";
import { Chart } from "react-google-charts";


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
const Batery = () => {
    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    const [data3, setData3] = useState([]);
    const [chartData, setData4] = useState([]);
    const [data5, setData5] = useState([]);
    const [data6, setData6] = useState([]);
    const [queryOnAdded, setQueryOnAdded] = useState(false); // Estado para controlar se a query.on foi adicionada
    const [selectedRange, setSelectedRange] = useState([null, null]);

  useEffect(()=>{
    const database = firebase.database();
    const auth = firebase.auth();

    var ref = database.ref();

    const query = ref.orderByChild('batteryCurrent').limitToLast(120);
    const query2 = ref.orderByChild('batteryTemperature').limitToLast(120);
    const query3 = ref.orderByChild('batteyPower').limitToLast(100);
    const query4 = ref.orderByChild('batteryVoltage').limitToLast(120);
    const query5 = ref.orderByChild('uplinkFrequency').limitToLast(100);
    const query6 = ref.orderByChild('downlinkFrequency').limitToLast(100)


    function convertToHour(dateTime) {
      const date = new Date(dateTime);
      const hours = date.getHours().toString().padStart(2, '0'); // Garante que sempre tenha 2 dígitos
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    }

    query.on('value', (snapshot) => {
      const data = snapshot.val();
      const dataArray = Object.entries(data).map(([key, value]) => [convertToHour(value.currentDateTime), value.batteryCurrent]);
      console.log(dataArray);
        setData(dataArray);
    });
    query2.on('value', (snapshot) => {
      const data2 = snapshot.val();
      const dataArray2 = Object.entries(data2).map(([key, value]) => [convertToHour(value.currentDateTime), value.batteryTemperature]);
      //console.log(dataArray2);
      setData2(dataArray2.reverse());
    });
    query3.on('value', (snapshot) => {
      const data3 = snapshot.val();
      const dataArray3 = Object.entries(data3).map(([key, value]) => [convertToHour(value.currentDateTime), value.internalFreeMemory]);
     // console.log(dataArray3);
      setData3(dataArray3.reverse());
    });
    query4.on("value", (snapshot) => {
      const data4 = snapshot.val();
      const dataArray4 = Object.entries(data4).map(([key, value]) => ['Max Used RX', value.maxSupportedRxLinkSpeed]);
      const chartArray4 = [['MaxSupportedRXLinkSpeed', 'Value'], ...dataArray4];
      //console.log(chartArray4);
      setData4(chartArray4);
    });

    if (!queryOnAdded) {
          setQueryOnAdded(true);
    }
  }, [queryOnAdded]);

const handleBrushChange = (data) => {
      if (data && data.length > 0) {
        const { startIndex, endIndex } = data[0];
        const startDate = data[startIndex].currentDateTimetime;
        const endDate = data[endIndex].currentDateTimetime;
        setSelectedRange([startDate, endDate]);
      } else {
        setSelectedRange([null, null]);
      }
    };

    const filteredData1 = selectedRange[0] && selectedRange[1]
      ? data.filter((entry) => entry.time >= selectedRange[0] && entry.currentDateTime <= selectedRange[1])
      : data;

    const filteredData2 = selectedRange[0] && selectedRange[1]
      ? data2.filter((entry) => entry.time >= selectedRange[0] && entry.currentDateTime <= selectedRange[1])
      : data2;

    function timeToSeconds(time) {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    }

    const [filter, setFilter] = useState("");
    const filteredData = data.filter(([currentDateTime]) =>
        currentDateTime.includes(filter)
      );

  return (


  <div className="App" style={{ display: 'flex', justifyContent: 'left' }}>
  <div className="flex-shrink-0 p-3" style={{width: '240px',background:'#fff0d6'}}>
                          <a href="/" className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom">
                            <ul class="list-unstyled ps-0">
                                  <li class="mb-1">
                                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                                      Home
                                    </button>
                                    <div className="collapse show" id="home-collapse">
                                      <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                        <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Updates</a></li>

                                      </ul>
                                    </div>
                                  </li>
                                  <li className="mb-1">
                                    <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                                      Dashboard
                                    </button>
                                    <div class="collapse" id="dashboard-collapse">
                                      <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                        <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Overview</a></li>
                                        <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Weekly</a></li>
                                        <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Monthly</a></li>
                                        <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">Annually</a></li>
                                      </ul>
                                    </div>
                                  </li>
                                  <li class="mb-1">
                                    <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                                      Orders
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
    <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
        <div className="chart-container">
          <Chart
            chartType="AreaChart"
            data={[
              ['Time', 'BatteryCurrent', 'Battery Temperature'],
              ...data.map(([currentDateTime, batteryCurrent], index) =>[
               currentDateTime, batteryCurrent, data2[index][1],
              ]),
            ]}
            options={{
              title: 'Battery Current and Battery Temperature',
              hAxis: {
                title: 'Time',
              },
              vAxes: {
                0:{
                    title: 'Current(mA)',
                    minValue: 0,
                },
                1:{
                    title: 'Temperature (Cº)',
                },
              },
              series: {
                    0: { targetAxisIndex: 0 }, // Série 0 (BatteryCurrent) usa o eixo esquerdo (0)
                    1: { targetAxisIndex: 1 }, // Série 1 (Battery Temperature) usa o eixo esquerdo (0)
                  },
            }}
            width="100%"
            height="350px"
            style={{ marginTop: '20px'}}
            chartPackages={["corechart", "controls"]}
            width="100%"
            height="340px"
            style={{ marginTop: '5px' }}
           controls={[
             {
               controlType: "StringFilterControl",
               options: {
                 filterColumnIndex: 0, // Índice da coluna que contém as strings de tempo
                 ui: {
                   chartType: "AreaChart",
                   chartOptions: {
                     chartArea: { width: "98%", height: "50%" },
                     hAxis: { baselineColor: "none" },
                   },
                 },
               },
               controlPosition: "bottom",
               controlProps: {
                 className: "label-search", // Adicione a classe CSS personalizada aqui
               },
             },
           ]}
          />
          <br></br>
        </div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
        <div className="chart-container">
        <input
                type="text"
                placeholder="Filter by Time"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
                              <Chart

                                chartType="AreaChart"
                                data={[
                                  ['Time', 'BatteryCurrent', 'Battery Temperature'],
                                  ...data.map(([currentDateTime, batteryCurrent], index) =>[
                                    currentDateTime,batteryCurrent/10, data2[index][1],
                                  ]),
                                ]}
                                options={{
                                  title: 'Battery Current and Battery Temperature',
                                  hAxis: {
                                    title: 'Time',
                                  },
                                  vAxes: {
                                    0:{
                                        title: 'Current(mA)',
                                        viewWindow: {
                                                min: -150, // Valor mínimo negativo
                                                max: 50, // Valor máximo positivo
                                        },
                                    },
                                    1:{
                                        title: 'Temperature (Cº)',
                                    },
                                  },
                                  series: {
                                        0: { targetAxisIndex: 0 }, // Série 0 (BatteryCurrent) usa o eixo esquerdo (0)
                                        1: { targetAxisIndex: 1 }, // Série 1 (Battery Temperature) usa o eixo esquerdo (0)
                                      },
                                }}
                                width="100%"
                                height="350px"
                                style={{ marginTop: '20px'}}
                                chartPackages={["corechart", "controls"]}
                                width="100%"
                                height="340px"
                                style={{ marginTop: '5px' }}
                                controls={[
                                           {
                                             controlType: "StringFilterControl",
                                             options: {
                                               filterColumnIndex: 0,
                                               ui: {
                                                 chartType: "LineChart",
                                                 chartOptions: {
                                                   chartArea: { width: "90%", height: "50%" },
                                                   hAxis: { baselineColor: "none" },
                                                 },
                                                         label: "Time Search Filter ",
                                               },
                                             },
                                             controlPosition: "bottom",

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
export default Batery;

