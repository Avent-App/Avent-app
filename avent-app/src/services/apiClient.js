import axios from "axios";

class ApiClient {
  async getUser() {
    return await this.request({
      endpoint: "/auth/me",
      method: "GET",
    });
  }
}

export default new ApiClient("http://localhost:3001");
