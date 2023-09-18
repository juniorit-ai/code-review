import { request } from "@strapi/helper-plugin";

const invitationRequest = {
  getUnusedInvite: async () => {
    return await request("/invitation/unused", {
      method: "GET",
    });
  },
};

export default invitationRequest;
