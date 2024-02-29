import React, { useState, useEffect } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import LongSignal from '../partials/dashboard/LongSignal';
import ShortSignal from '../partials/dashboard/ShortSignal';
import HotSignal from '../partials/dashboard/HotSignal';
import io from'socket.io-client';
var socket = io.connect(`${window.location.hostname}:4000`);

function Dashboard() {
  const [hot_data, setData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const startWebsocket = () => {
    socket.on('realTimeData',(data) =>{
      if(data.status == "ok"){
        if(data.realTimeData){
          setData(data.realTimeData);
        }else{
          setData([]);
        }
      }else{
        console.log('status : Error');
      }
    })
    socket.onclose = () => {
      socket = null;
      setTimeout(startWebsocket, 1000);
    };
    socket.onerror = (error) => {
      socket = null;
      setTimeout(startWebsocket, 1000);
    };
  }
  startWebsocket();
  return (
    <div className="relative flex overflow-hidden h-full">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className=" relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="grid grid-col-1 gap-[30px] ">
          <HotSignal hot={hot_data}/>
          <LongSignal />
          <ShortSignal />
        </div>
        
      </div>
    </div>
  );
}

export default Dashboard;