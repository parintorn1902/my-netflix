const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

export default async function handler(req, res) {
  try {
    const type = req.query.type;
    const params = { ...req.query };

    delete params.type;

    const queryString = getQueryString(params);

    const fetchUrl = `${TMDB_BASE_URL}/genre/${type}/list?api_key=${TMDB_API_KEY}${queryString}`;

    const response = await fetch(fetchUrl);
    const data = await response.json();

    res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(200).json({ success: false, message: "Internal server error" });
  }
}

function getQueryString(urlQueryObj = {}) {
  return Object.entries(urlQueryObj).reduce(
    (result, [key, value]) => result + `&${key}=${value}`,
    ""
  );
}
