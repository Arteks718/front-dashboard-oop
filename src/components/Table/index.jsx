import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getLeadsThunk,
  updateLeadStatusThunk,
} from "../../store/slice/leadsSlice";
import { getSalesManagersThunk } from "../../store/slice/salesManagersSlice";
import styled from "./Table.module.sass";

function Table({
  leads,
  error,
  isFetching,
  salesManagers,
  getLeads,
  getSalesManagers,
  updateLeadStatus,
  sidebarStatus,
  onGetLeads
}) {
  useEffect(() => {
    getLeads(sidebarStatus);
    getSalesManagers();
  }, [sidebarStatus]);

  return (
    <>
      {error && <div>Error! Network error!</div>}
      {isFetching && <div>Loading...</div>}
      {leads.length ? (
        <table className={styled.test}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              {sidebarStatus === "all" && <th>Status</th>}
              <th>Detail information</th>
              <th>Select sales manager</th>
              <th>SPAM</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr key={index}>
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                {sidebarStatus === "all" && <td>{lead.status}</td>}
                <td>
                  <button>Open modal</button>
                </td>
                <td>
                  <select>
                    <option value="">Select manager</option>
                    {salesManagers.map((salesManager, index) => (
                      <option key={index}>{salesManager.name}</option>
                    ))}
                  </select>
                  <button>UPDATE</button>
                </td>
                <td>
                  <button
                    onClick={() => updateLeadStatus({ lead, status: "spam" })}
                  >
                    SPAM
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : <div>List is empty</div>}
    </>
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
  getSalesManagers: () => dispatch(getSalesManagersThunk()),
  updateLeadStatus: (lead, status) =>
    dispatch(updateLeadStatusThunk(lead, status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
