import httpService from "./http.service";

const propertyEndpoint = "property/";

const propertyService = {
    fetchAll: async () => {
        const { data } = await httpService.get(propertyEndpoint);
        return data;
    }
};

export default propertyService;
