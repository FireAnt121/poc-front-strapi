import { request } from "@strapi/helper-plugin";
import pluginId from "../pluginId";

const fetchContentTypes = async () => {
  try {
    const data = await request(`/${pluginId}/custom-content-types`, { method: "GET" });
    return data;
  } catch (error) {
    return null;
  }
};

const fetchDocuments = async(version) => {
    try {
        const data = await request(`/${pluginId}/get-document-entries?v=${version}`, { method: "GET" });
        return data;
    } catch(error) {
        return error;
    }
};

const updateDocuments = async(data) => {
  try {
    const body = data;
    const opts = { method: 'POST', body: body };
    const requestUrl = `/${pluginId}/update-document`;

    const response = await request(requestUrl, opts);

    if (response) {
      // yield put(submitSucceeded());
      return response;
    } else {
      // yield put(submitError('An error occurred'));
      return "error";
    }
  } catch (error) {
    // yield put(submitError(error.message));
    return error;
  }
  // try {
  //   const data = await request(`/${pluginId}/update-document?id=${id}&order=${order}`, { method: "POST" });
  //   return data;
  // } catch(error) {
  //   return error;
  // }
}
export { fetchContentTypes, fetchDocuments, updateDocuments };
