import { ApiService } from "./api.service";
import { FakeApiService } from "./fake.api.service";
import { IApiService } from "@/lib/services/types";

const apiServiceProvider = {
  service: null as IApiService | null,
  getApiService() {
    if (this.service) {
      return this.service;
    }
    if (process.env.NEXT_PUBLIC_USE_FAKE_API === "true") {
      this.service = new FakeApiService();
      return this.service;
    }
    this.service = new ApiService();
    return this.service;
  },
};

export default apiServiceProvider;
