import axios from "axios";
import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).send("URL parameter is required");
  }

  try {
    const response = await axios({
      url,
      responseType: "arraybuffer",
      validateStatus: null,
    });

    const contentType = response.headers["content-type"];
    if (!contentType?.startsWith("image/")) {
      return res.status(400).send("URL must point to an image");
    }

    res.set("Content-Type", contentType);
    res.set("Cache-Control", "public, max-age=86400"); // Cache for 24 hours
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Error fetching image");
  }
});

export default router;
