import axios from "axios";
import jwtDecode from "jwt-decode";

let username = ""
let localToken = localStorage.getItem('token')
if(localToken) {
  let decoded = jwtDecode(localToken);
  username = decoded.username;
}

const apiBaseDomain = "https://api.ohmybudgy.com/"

const apiClient = axios.create({
  baseURL: apiBaseDomain + "api/",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "Bearer " + localToken,
    "Budgy-user": username
  }
});

const apiClientInit = axios.create({
  baseURL: apiBaseDomain + "api2/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

export default {
  getIncomes(period) {
    return apiClient.get("income/" + period);
  },
  getTransactions(period) {
    return apiClient.get("transaction/" + period);
  },
  getTransactions2(period, type) {
    return apiClient.get("transaction/v2/" + period + '/' + type);
  },
  getTransaction(id) {
    return apiClient.get("transaction/id/" + id);
  },
  getAccounts() {
    return apiClient.get("account/");
  },
  getExpenses(period) {
    return apiClient.get("expense/" + period);
  },
  getSavings(period) {
    return apiClient.get("saving/" + period);
  },
  getFreeMoney(period) {
    return apiClient.get("freemoney/" + period);
  },
  getCategory() {
    return apiClient.get("category/list/");
  },
  saveTransaction(data) {
    return apiClient.post("transaction/save/", data);
  },
  createPeriod(data) {
    return apiClient.post("period/save/", data);
  },
  savePlan(data) {
    return apiClient.post("plan/save/" + data.type + "/ ", data);
  },
  getPeriod(id){
    return apiClient.get("period/" + id);
  },
  getPeriodStub(){
    return apiClient.get("stub/period");
  },
  login(user){
    return apiClientInit.post("login_check", user)
  }
};
