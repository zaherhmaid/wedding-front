const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const invitationService = {
  async getInvitation(token) {
    const response = await fetch(`${API_URL}/invitations/${token}`, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Invitation not found");
    }

    return response.json();
  },

  async updateRSVP(token, status) {
    const response = await fetch(`${API_URL}/invitation/${token}/rsvp`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify({
        status,
      }),
    });

    return response.json();
  },
};
