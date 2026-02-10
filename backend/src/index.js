import express from "express";
import dotenv from "dotenv";
import connectToDB from "./config/db.js";
import authRouter from "./routers/authRouter.js";
import eventRouter from "./routers/eventsRouter.js";
import volunteeringRouter from "./routers/VolunteeringRouter.js";
import participationsRouter from "./routers/participationsRouter.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/events", eventRouter);
app.use("/volunteering", volunteeringRouter);
app.use("/participations", participationsRouter);

app.get("/", (req, res) => {
  res.status(200).json({ data: "hello world!" });
});

const port = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectToDB();
    app.listen(port, () => console.log(`server listening on port ${port}`));
  } catch (error) {
    console.error("Error starting the server: ", error.message);
    process.exit(1);
  }
}

startServer();

//ENDPOINTS

/*
---AUTH---

POST /auth/login
POST /auth/signup

---Admin---

GET /events (all the events created by admin)
POST /events
PATCH /events/:eventId
DELETE /events/:eventId

POST /auth/signup (create volunteer)
POST /volunteering (assign volunteer)

GET /events/:eventId/participants
GET /events/:eventId/analytics
GET /events/:eventId/volunteers

GET /volunteering (all volunteers created by admin)

---Volunteer---

GET /volunteering/me (assigned events)
POST /participations/:id/checkin

---Participant---

GET /events (all events)
GET /events/:eventId
POST /participations
GET /participations/me (QR codes)
*/
