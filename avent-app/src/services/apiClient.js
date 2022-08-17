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

  async request({ endpoint, method = `GET`, data = {}, image = null }) {
    const url = `${this.remoteHostUrl}/${endpoint}`;
    var formData = new FormData();

    if (endpoint == "auth/me") {
      console.log("First Pass is reached");
    }

    for (var key in data) {
      formData.append(key, data[key]);
    }

    console.log("This is the data -> ", data);

    if (image) {
      formData.append("image", image);
    }

    let headers = {
      "Content-Type": "multipart/form-data",
    };

    console.log(" FORM DATA IMAGE ", formData.get("image"));

    console.log(url);

    if (!this.token) {
      this.token = localStorage.getItem(this.tokenName);
    }

    if (this.token) {
      console.log("HERE IS THE TOKEN -> ", this.token);
      headers["Authorization"] = `Bearer ${this.token}`;
      console.log("HERE IS THE TOKEN WITHIN THE HEADER -> ", headers["Authorization"])
    }

    console.log(
      "Here is the form data ->",
      formData.get("email"),
      formData.get("password")
    );

    if (!image || data == {}) {
      formData = data;
      console.log(formData);

      headers["Content-Type"] = "application/json"
    }

    if (endpoint == "auth/me") {
      console.log("Second Pass is reached, here is the token: ", headers["Authorization"]);
    }

    try {
      const res = await axios({ url, method, data: formData, headers });
      console.log(res);
      return { data: res.data, error: null };
    } catch (error) {
      console.error({ errorResponse: error.response });
      const message = error?.response?.data?.error?.message;
      return { data: null, error: message || String(error) };
    }
  }

  async fetchUserFromToken() {
    console.log("fetchUserFromToken is reached");
    return await this.request({ endpoint: `auth/me`, method: `GET` });
  }

  async getUser(point) {
    return await this.request({
      endpoint: `user/${point}`,
      method: `GET`,
    });
  }

  async updateUserInfo(userId, data, image) {
    return await this.request({
      endpoint: `user/updateInfo/${userId}`,
      method: `POST`,
      data: data,
      image: image,
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

  async deleteReservation(reservationId) {
    return await this.request({
      endpoint: `reservations/delete/${reservationId}`,
      method: `DELETE`,
    });
  }

  async getReservationsByEventId(eventId) {
    return await this.request({
      endpoint: `reservations/getReservationsByEventId/${eventId}`,
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

  async getUpcomingUserEventListings(userId) {
    return await this.request({
      endpoint: `event/getUpcomingListings/${userId}`,
      method: `GET`,
    });
  }

  async getPastUserEventListings(userId) {
    return await this.request({
      endpoint: `event/getPastListings/${userId}`,
      method: `GET`,
    });
  }

  async deleteEventListing(eventId) {
    return await this.request({
      endpoint: `event/deleteEventListing/${eventId}`,
      method: `DELETE`,
    });
  }

  async createEvent(data, point) {
    return await this.request({
      endpoint: point,
      method: `POST`,
      data: data,
    });
  }

  async postComment(data) {
    return await this.request({
      endpoint: "comment/create",
      method: `POST`,
      data: data,
    });
  }
  async getComments(commentSectionId) {
    return await this.request({
      endpoint: `comment/section/${commentSectionId}`,
      method: `GET`,
    });
  }
  async getUserFromComment(comment_id) {
    return await this.request({
      endpoint: `comment/user/${comment_id}`,
      method: `GET`,
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

  async signupUser(credentials, image) {
    return await this.request({
      endpoint: `auth/register`,
      method: `POST`,
      data: credentials,
      image: image
    });
  }
}

export default new ApiClient();
