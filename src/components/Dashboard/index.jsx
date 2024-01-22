import React, { useEffect, useState } from "react";
import Table from "../Table";
import "./style.css";

function Dashboard() {
  const [sidebarStatus, setSidebarStatus] = useState("all")
  return (
    <aside className="frame">
      <div className="div">
        <div className="div-2">
          <div className="group">
            <div className="overlap-group">
              <button className="text-wrapper" onClick={() => setSidebarStatus("spam")}>Spam</button>
            </div>
          </div>
          <div className="overlap-wrapper">
            <div className="overlap">
              <button className="text-wrapper-2" onClick={() => setSidebarStatus("checked")}>Checked</button>
            </div>
          </div>
          <div className="overlap-group-wrapper">
            <div className="div-wrapper">
              <button className="text-wrapper-3" onClick={() => setSidebarStatus("uncheked")}>Uncheked</button>
            </div>
          </div>
          <div className="group-2">
            <div className="overlap-2">
              {<button className="text-wrapper-4" onClick={() => setSidebarStatus("all")}>All</button>}
            </div>
          </div>
        </div>
        <div className="div-wrapper-2">
          <button className="text-wrapper-5">Refresh</button>
        </div>
        <Table sidebarStatus={sidebarStatus}></Table>
      </div>
    </aside>
  );
}

export default Dashboard