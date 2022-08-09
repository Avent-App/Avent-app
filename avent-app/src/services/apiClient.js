import axios from "axios";
let remoteHostUrl = `http://localhost:3001`;

class ApiClient {
  constructor() {
    this.remoteHostUrl = remoteHostUrl;
    this.token = null;
    this.tokenName = "avent_token";
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem(this.tokenName, token);
  }
  deleteToken() {
    localStorage.removeItem(this.tokenName);
  }

  getToken() {
    return localStorage.getItem(this.tokenName);
  }

  tokenValidation(token) {
    if (this.token == token) {
      return true;
    } else {
      return false;
    }
  }

  async request({ endpoint, method = `GET`, data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
    };

    console.log(url);

    if (!this.token) {
      this.token = localStorage.getItem(this.tokenName);
    }

    if (this.token) {
      console.log(this.token);
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    try {
      const res = await axios({ url, method, data, headers });
      return { data: res.data, error: null };
    } catch (error) {
      console.error({ errorResponse: error.response });
      const message = error?.response?.data?.error?.message;
      return { data: null, error: message || String(error) };
    }
  }

  async fetchUserFromToken() {
    return await this.request({ endpoint: `auth/me`, method: `GET` });
  }

  async getUser(point) {
    return await this.request({
      endpoint: `user/${point}`,
      method: `GET`,
    });
  }

  async getUpcomingReservations(point) {
    return await this.request({
      endpoint: `reservations/upcoming/${point}`,
      method: `GET`,
    });
  }

  async getPastReservations(point) {
    return await this.request({
      endpoint: `reservations/pastEvents/${point}`,
      method: `GET`,
    });
  }

  async createRSVP(data) {
    return await this.request({
      endpoint: "reservations/create",
      method: `POST`,
      data: data,
    });
  }

  async checkReserved(eventId, userId) {
    return await this.request({
      endpoint: `reservations/checkReserved/${userId}/${eventId}`,
      method: `GET`,
    });
  }

  async getEvent(point) {
    return await this.request({
      endpoint: `event/${point}`,
      method: `GET`,
    });
  }

  async getEvents() {
    return await this.request({
      endpoint: `event/`,
      method: `GET`,
    });
  }

  async createEvent(data, point) {
    return await this.request({
      endpoint: point + `/`,
      method: `POST`,
      data: data,
    });
  }

  async loginUser(credentials) {
    console.log(credentials);
    return await this.request({
      endpoint: `auth/login`,
      method: `POST`,
      data: credentials,
    });
  }

  async signupUser(credentials) {
    return await this.request({
      endpoint: `auth/register`,
      method: `POST`,
      data: credentials,
    });
  }
}

export default new ApiClient();
