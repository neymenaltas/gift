import axios from "axios";
import { cache } from "./CacheHandler";

export const client = axios.create({
  baseURL: "https://api-dev.smartgiftit.com/apps",
  withCredentials: true,
});
client.defaults.headers.common["Content-Type"] = "application/json";
client.defaults.headers["x-smartgift-app-id"] =
  "zOdeE81mInZIiPLrdHRd0IVZ1a2vv42p6tvh8SX3";
client.defaults.headers["x-smartgift-app-secret"] =
  "ldPn67Cf7e0NboidnQ30KTtrfD1nqPpoSqs69EfH";

function responseHandler(response) {
  if (response.config.method === "GET" || "get") {
    if (response.config.url) {
      console.log("storing in cache");
      cache.store(response.config.url, JSON.stringify(response.data));
    }
  }
  return response;
}

function errorHandler(error) {
  if (error.headers.cached === true) {
    console.log("got cached data in response, serving it directly");
    return Promise.resolve(error);
  }
  return Promise.reject(error);
}

function requestHandler(request) {
  if (request.method === "GET" || "get") {
    const checkIsValidResponse = cache.isValid(request.url || "");
    if (checkIsValidResponse.isValid) {
      console.log("serving cached data");
      request.headers.cached = true;
      request.data = JSON.parse(checkIsValidResponse.value || "{}");
      return Promise.reject(request);
    }
  }
  return request;
}

client.interceptors.request.use((request) => requestHandler(request));
client.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);
