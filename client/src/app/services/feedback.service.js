import httpService from "./http.service";

const feedbackEndpoint = "feedback/";

const feedbackService = {
    createFeedback: async (payload) => {
        const { data } = await httpService.post(feedbackEndpoint, payload);
        return data;
    },
    getFeedbacks: async (pageId) => {
        const { data } = await httpService.get(feedbackEndpoint, {
            params: {
                orderBy: "pageId",
                equalTo: `${pageId}`
            }
        });
        return data;
    },
    removeFeedback: async (feedbackId) => {
        const { data } = await httpService.delete(
            feedbackEndpoint + feedbackId
        );
        return data;
    }
};

export default feedbackService;
