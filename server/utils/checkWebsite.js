import axios from "axios";

export async function checkWebsite(url) {
  const start = Date.now();

  try {
    const response = await axios.get(url, { timeout: 5000 });
    const duration = Date.now() - start;

    return { status: "UP", duration };
  } catch (err) {
    const duration = Date.now() - start;
    return { status: "DOWN", duration };
  }
}
