import React, { useState } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import Table from "../Table";
import { getLeadsThunk } from "../../store/slice/leadsSlice";
import styled from "./Dashboard.module.sass";

function Dashboard({ getLeads }) {
  const [sidebarStatus, setSidebarStatus] = useState("all");

  return (
    <section classNames={styled.dashboard}>
      <header>
        <div className={styled.refreshContainer}>
          <button
            className={classNames(styled.refreshButton)}
            onClick={() => getLeads(sidebarStatus)}
          >
            Refresh
          </button>
        </div>
      </header>

      <section className={classNames(styled.dashboardContainer)}>
        <aside className={classNames(styled.navigationWrapper)}>
          <button
            className={classNames(styled.black, {
              [styled.active]: sidebarStatus === "all",
            })}
            onClick={() => setSidebarStatus("all")}
          >
            All
          </button>
          <button
            className={classNames(styled.blue, {
              [styled.active]: sidebarStatus === "unchecked",
            })}
            onClick={() => setSidebarStatus("unchecked")}
          >
            Unchecked
          </button>
          <button
            className={classNames(styled.green, {
              [styled.active]: sidebarStatus === "checked",
            })}
            onClick={() => setSidebarStatus("checked")}
          >
            Checked
          </button>
          <button
            className={classNames(styled.red, {
              [styled.active]: sidebarStatus === "spam",
            })}
            onClick={() => setSidebarStatus("spam")}
          >
            Spam
          </button>
        </aside>
          <Table sidebarStatus={sidebarStatus}></Table>
      </section>
    </section>
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
