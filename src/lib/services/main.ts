import { ApiService } from "./api.service";
import { FakeApiService } from "./fake.api.service";

const apiServiceProvider = {
  getApiService() {
    if (process.env.NEXT_PUBLIC_USE_FAKE_API === "true") {
      return new FakeApiService();
    }
    return new ApiService();
  },
};

export default apiServiceProvider;
