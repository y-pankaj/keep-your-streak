import { getSession } from "next-auth/client";
import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  try {
    const session = await getSession({ req });
    const email = session.user.email;
    const start = Number(req.query.start);
    const end = Number(req.query.end);
    const startDate = new Date(start).toISOString();
    const endDate = new Date(end).toISOString();

    const studySessions = await req.db.collection("CalendarRecord").findOne(
      { email: email },
      {
        projection: {
          timer: {
            $elemMatch: {
              date: {
                $gte: startDate,
                $lt: endDate,
              },
            },
          },
        },
        _id: 0,
      }
    );

    res.status(200).json({ success: true, data: studySessions });
  } catch (error) {
    res.status(400).json({ success: false, data: error });
  }
});

handler.post(async (req, res) => {
  try {
    const session = await getSession({ req });
    const email = session.user.email;
    const query = { email: email };
    const body = JSON.parse(req.body);
    const update = { $push: { timer: body } };
    await req.db.collection("CalendarRecord").updateOne(query, update);

    res.status(201).json({ success: true, data: "success" });
  } catch (error) {
    res.status(400).json({ success: false, data: error });
  }
});

export default handler;
