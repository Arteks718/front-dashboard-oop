import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getLeadsThunk,
  updateLeadStatusThunk,
} from "../../store/slice/leadsSlice";
import { getSalesManagersThunk } from "../../store/slice/salesManagersSlice";
import AboutUser from "../AboutUser";
import styled from "./Table.module.sass";
import classNames from "classnames";
import loading from "./loading.gif";

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
  const [isAboutUserOpen, setIsAboutUserOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    getLeads(sidebarStatus);
    getSalesManagers();
  }, [sidebarStatus]);

  const updateSalesManagerId = (leadId, newSalesManagerId) => {
    setSelectedSalesManagerIds((prevIds) => ({
      ...prevIds,
      [leadId]: newSalesManagerId,
    }));
  };

  const handleOpenAboutUser = (lead) => {
    setSelectedLead(lead);
    setIsAboutUserOpen(true);
  };

  const handleCloseAboutUser = () => {
    setIsAboutUserOpen(false);
  };

  return (
    <>
      {error && <div>Error! Network error!</div>}
      {isFetching && (
        <div className={classNames(styled.isLoading)}>
          <img src={loading} alt="Loading..." />
        </div>
      )}
      {!isFetching && !error && (
        <table className={styled.dashboardTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              {sidebarStatus !== "unchecked" && <th>Status</th>}
              <th>Detail information</th>
              {sidebarStatus !== "spam" && <th>Select sales manager</th>}
              {sidebarStatus !== "spam" && <th>SPAM</th>}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr key={index}>
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{lead.email}</td>
                {sidebarStatus !== "unchecked" && <td>{lead.status}</td>}
                <td>
                  <button onClick={() => handleOpenAboutUser(lead)}>
                    Open modal
                  </button>
                </td>
                {sidebarStatus !== "spam" && (
                  <td>
                    <select
                      value={lead.salesManagerId || "0"}
                      onChange={(e) =>
                        updateLeadStatus({
                          lead,
                          updateData: {
                            salesManagerId: e.target.value,
                            status: "checked",
                          },
                        })
                      }
                    >
                      <option value={0}>Select sales manager</option>
                      {salesManagers.map((salesManager, index) => (
                        <option key={index} value={salesManager.id}>
                          {salesManager.name}
                        </option>
                      ))}
                    </select>
                  </td>
                )}

                {sidebarStatus !== "spam" && (
                  <td style={{ padding: 0 }}>
                    <button
                      onClick={() =>
                        updateLeadStatus({
                          lead,
                          updateData: { status: "spam" },
                        })
                      }
                      className={classNames(styled.spam)}
                    >
                      SPAM
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isAboutUserOpen && selectedLead && (
        <AboutUser
          isOpen={isAboutUserOpen}
          ipAddress={selectedLead.ipAddress}
          country={selectedLead.country}
          userId={selectedLead.userId}
          onClose={handleCloseAboutUser}
        />
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
