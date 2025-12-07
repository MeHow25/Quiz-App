import { ApiService } from "./api.service";
import { FakeApiService } from "./fake.api.service";

export function getApiService() {
  if (process.env.NEXT_PUBLIC_USE_FAKE_API === "true") {
    console.log("Using FakeApiService");
    return new FakeApiService();
  }
  return new ApiService();
}
