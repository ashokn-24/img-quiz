const PROTOCOL = window.location.hostname === "localhost" ? "http" : "https";
export const ENDPOINT = `${PROTOCOL}://${window.location.host}/questions`;
