export const dateHelper = {
  /**
   * Formate une date au style raffiné français (Ex: Samedi 12 Septembre)
   */
  formatLongDate(dateString) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const date = new Date(dateString);

    // Capitalise la première lettre (ex: "samedi" -> "Samedi")
    const formatted = date.toLocaleDateString("fr-FR", options);
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  },
};
