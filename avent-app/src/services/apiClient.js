import axios from "axios";

class ApiClient {
  async getUser() {
    return await this.request({
      endpoint: "/auth/me",
      method: "GET",
    });
  }
}

export default new ApiClient(process.env.REACT_APP_REMOTE_HOST_URL || "http://localhost:3001");
