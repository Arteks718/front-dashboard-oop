import axios from "axios"
// require('dotenv').config()
const httpClient = axios.create({ baseURL: "http://localhost:5000/api" })

export const getHttpAllLeads = (leadsFilter) => httpClient.get(`/leads?leadsFilter=${leadsFilter}`)
export const getHttpSalesManagers = () => httpClient.get(`/salesManagers`)
export const updateHttpLead = (lead, status) => httpClient.put(`/leads/${lead.id}`, {lead, status})
