import React, { useEffect, useState } from "react";
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
}) {
  const [selectedSalesManagerIds, setSelectedSalesManagerIds] = useState({});
  useEffect(() => {
    getLeads(sidebarStatus);
    getSalesManagers();
  }, [sidebarStatus]);
  
  // useEffect(() => {
  //   updateSelectedSalesManagerIds();
  // }, [leads])


  const updateSalesManagerId = (leadId, newSalesManagerId) => {
    setSelectedSalesManagerIds((prevIds) => ({
      ...prevIds,
      [leadId]: newSalesManagerId,
    }));
  };
  // function updateSelectedSalesManagerIds() {
  //   setSelectedSalesManagerIds(
  //     leads.map((lead) =>
  //       !lead.salesManagerId
  //         ? { [lead.id]: lead.salesManagerId }
  //         : { [lead.id]: "0" }
  //     )
  //   );
  // }
  // console.log(selectedSalesManagerIds);

  const handleSelectChange = (leadId, e) => {
    updateSalesManagerId(leadId, e.target.value);
  };

  const handleUpdateClick = (lead) => {
    const updatedSalesManagerId = selectedSalesManagerIds[lead.id];
    updateLeadStatus({
      lead,
      updateData: { salesManagerId: updatedSalesManagerId },
    });
  };

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
                  <select
                    value={lead.salesManagerId || '0'}
                    onChange={(e) => updateLeadStatus({ lead, updateData: { salesManagerId: e.target.value } })}
                  >
                    <option value={0}>Select sales manager</option>
                    {salesManagers.map((salesManager, index) => (
                      <option key={index} value={salesManager.id}>
                        {salesManager.name}
                      </option>
                    ))}
                  </select>
                  {/* <button onClick={() => handleUpdateClick(lead)}>
                    UPDATE
                  </button> */}
                </td>
                <td>
                  <button
                    onClick={() =>
                      updateLeadStatus({ lead, updateData: { status: "spam" } })
                    }
                  >
                    SPAM
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>List is empty</div>
      )}
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
