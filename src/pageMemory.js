
import './App.css';

import firebase from 'firebase/compat/app';
import "firebase/database";
import "firebase/compat/auth";
import React, {useEffect, useState} from "react";
import { Chart } from "react-google-charts";
import 'bootstrap/dist/css/bootstrap.min.css';


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
const Memory = () => {

    const [selectedVariable, setSelectedVariable] = useState('variable1');
    const handleVariableChange = (event) => {
        setSelectedVariable(event.target.value);
      };

    const [data, setData] = useState([]);

  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [chartData, setData4] = useState([]);


  useEffect(()=>{
    const database = firebase.database();
    const auth = firebase.auth();

    var ref = database.ref();

    const query = ref.orderByChild('speed').limitToLast(40);
    const query2 = ref.orderByChild('totalRAM').limitToLast(20);
    const query3 = ref.orderByChild('usedRAM').limitToLast(20);
    const query4 = ref.orderByChild('internalFreeMemory').limitToLast(1);

    query.on('value', (snapshot) => {
      const data = snapshot.val();
      const dataArray = Object.entries(data).map(([key, value]) => [value.time, value.speed]);
      //console.log(dataArray);
        setData(dataArray);
    });
    query2.on('value', (snapshot) => {
      const data2 = snapshot.val();
      const dataArray2 = Object.entries(data2).map(([key, value]) => [value.time, value.totalRAM]);
      //console.log(dataArray2);
      setData2(dataArray2.reverse());
    });
    query3.on('value', (snapshot) => {
      const data3 = snapshot.val();
      const dataArray3 = Object.entries(data3).map(([key, value]) => [value.time, value.usedRAM]);
     // console.log(dataArray3);
      setData3(dataArray3.reverse());
    });
    query4.on("value", (snapshot) => {
      const data4 = snapshot.val();
      const dataArray4 = Object.entries(data4).map(([key, value]) => ['MAX Memory Free', value.internalFreeMemory]);
      const chartArray4 = [['InternalFreeMemory', 'Value'], ...dataArray4];
      console.log(chartArray4);
      setData4(chartArray4);
    });

  }, []);
let selectedData;
  if (selectedVariable === 'variable1') {
    selectedData = data;
  } else if (selectedVariable === 'variable2') {
    selectedData = data2;
  } else if (selectedVariable === 'variable3') {
    selectedData = data3;
  }
  return (
    <div>
      <div class="flex-shrink-0 p-3" style={{width: '280px'}}>
        <a href="/" class="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none border-bottom">
          <ul class="list-unstyled ps-0">
                <li class="mb-1">
                  <button class="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed" data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                    Home
                  </button>
                  <div class="collapse show" id="home-collapse">
                    <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                      <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Overview</a></li>
                      <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Updates</a></li>
                      <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none rounded">Reports</a></li>
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
                      <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">New...</a></li>
                      <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Profile</a></li>
                      <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Settings</a></li>
                      <li><a href="#" class="link-dark d-inline-flex text-decoration-none rounded">Sign out</a></li>
                    </ul>
                  </div>
                </li>
              </ul>
        </a>

      </div>

      <div className="App" style={{ display: 'flex', justifyContent: 'center' }}>

          <Chart
            chartType="Gauge"
            data={chartData
            }
            width="50%"
            height="140px"
            options={{
              redFrom:0,
              redTo:699,
              greenFrom: 850,
              greenTo: 1000,
              yellowFrom: 700,
              yellowTo: 849,
              minorTicks: 5,
              max: 1000,
            }}
          />
        </div>
    </div>
  );
};
export default Memory;

