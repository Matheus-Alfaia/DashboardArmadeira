
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
    const query6 = ref.orderByChild('latency').limitToLast(130);
    const query10 = ref.orderByChild('batteryCurrent').limitToLast(130);

const convertToTime = (dateTime) => {
  const date = new Date(dateTime);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
};

// ...

query.on('value', (snapshot) => {
  const data1 = snapshot.val();
  const dataArray1 = Object.entries(data1).map(([key, value]) => [
    convertToTime(value.currentDateTime),
    value.tx
  ]);
  setData1(dataArray1);
});

query2.on('value', (snapshot) => {
  const data2 = snapshot.val();
  const dataArray2 = Object.entries(data2).map(([key, value]) => [
    convertToTime(value.currentDateTime),
    value.rx
  ]);
  setData2(dataArray2.reverse());
});

query6.on('value', (snapshot) => {
  const data6 = snapshot.val();
  const dataArray6 = Object.entries(data6).map(([key, value]) => [
    convertToTime(value.currentDateTime),
    value.latency
  ]);
  setData6(dataArray6.reverse());
});

query10.on('value', (snapshot) => {
  const data10 = snapshot.val();
  const dataArray10 = Object.entries(data10).map(([key, value]) => [
    convertToTime(value.currentDateTime),
    value.batteryCurrent
  ]);
  setData10(dataArray10.reverse());
});


  }, []);

  const handleBrushChange = (data) => {
      if (data && data.length > 0) {
        const { startIndex, endIndex } = data[0];
        const startDate = data1[startIndex].currentDateTime;
        const endDate = data1[endIndex].currentDateTime;
        setSelectedRange([startDate, endDate]);
      } else {
        setSelectedRange([null, null]);
      }
    };

    const filteredData1 = selectedRange[0] && selectedRange[1]
      ? data1.filter((entry) => entry.currentDateTime >= selectedRange[0] && entry.currentDateTime <= selectedRange[1])
      : data1;

    const filteredData2 = selectedRange[0] && selectedRange[1]
      ? data2.filter((entry) => entry.currentDateTime >= selectedRange[0] && entry.currentDateTime <= selectedRange[1])
      : data2;

    function timeToSeconds(time) {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      return hours * 3600 + minutes * 60 + seconds;
    }

    const [filter, setFilter] = useState("");

      const filteredData = [
        ['Time', 'UpLink', 'DownLink', 'Latency'],
        ...data1
          .filter(([time, tx]) =>
            time.toString().includes(filter) ||
            tx.toString().includes(filter)
          )
          .map(([time, tx], index) => [
            time,
            tx / 1000,
            (data2[index] && data2[index][1] ? data2[index][1] / 1000 : 0),
            (data6[index] && data6[index][1] ? data6[index][1] : 0),
          ]),
      ];


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
                      <div style={{ display: 'flex', flexDirection: 'column', width: '75%' }}>
                        <div className="chart-container">
                                                 <div>

                                                       <Chart
                                                         chartType="LineChart"
                                                         data={filteredData}
                                                         options={{
                                                           title: 'UpLink vs Battery Current',
                                                           hAxis: {
                                                             title: 'Time(s)',
                                                           },
                                                           vAxes: {
                                                             0: {
                                                               title: 'Throughput(Kbps)',
                                                               minValue: 0,
                                                             },
                                                             1: {
                                                               title: 'Latency',
                                                             },
                                                           },
                                                           series: {
                                                             0: { targetAxisIndex: 0 },
                                                             1: { targetAxisIndex: 1 },
                                                           },
                                                           explorer: {
                                                             axis: 'horizontal',
                                                             keepInBounds: true,
                                                             maxZoomIn: 4.0,
                                                           },
                                                         }}
                                                         chartPackages={["corechart"]}
                                                         width="100%"
                                                         height="310px"
                                                       />
                                                       <label htmlFor="filterInput">Filter by time:</label>
                                                       <input
                                                        type="text"
                                                        placeholder="Search"
                                                        value={filter}
                                                        onChange={(e) => setFilter(e.target.value)}
                                                      />
                                                     </div>
                                                        <br></br>
                                                 </div>


                      </div>


                </div>





  );
};
export default Data;

