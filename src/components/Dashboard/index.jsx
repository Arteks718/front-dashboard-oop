import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Table from "../Table";
import {
  getLeadsThunk
} from "../../store/slice/leadsSlice";
import "./style.css";

function Dashboard({ getLeads }) {
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
          <button className="text-wrapper-5" onClick={() => getLeads(sidebarStatus)}>Refresh</button>
        </div>
        <Table sidebarStatus={sidebarStatus}></Table>
      </div>
    </aside>
  );
}

const mapStateToProps = ({ leadsData, salesManagersData }) => ({
  leads: leadsData.leads,
  error: leadsData.error,
  isFetching: leadsData.isFetching,
  salesManagers: salesManagersData.salesManagers,
});

const mapDispatchToProps = (dispatch) => ({
  getLeads: (sidebarStatus) => dispatch(getLeadsThunk(sidebarStatus)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);