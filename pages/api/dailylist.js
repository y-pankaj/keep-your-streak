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
    // const startDate = new Date(start).toISOString();
    // const endDate = new Date(end).toISOString();
    var result = { dailyList: [] };
    await req.db
      .collection("CalendarRecord")
      .aggregate([
        {
          $match: { email: email },
        },
        {
          $project: {
            dailyList: {
              $filter: {
                input: "$dailyList",
                as: "item",
                cond: {
                  $and: [
                    {
                      $gte: ["$$item.createdAt", start],
                    },
                    {
                      $lt: ["$$item.createdAt", end],
                    },
                  ],
                },
              },
            },
            _id: 0,
          },
        },
      ])
      .forEach(function (doc) {
        // will return only one doc at max;
        result = doc;
      });
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, data: error });
  }
});

handler.post(async (req, res) => {
  try {
    const session = await getSession({ req });
    const email = session.user.email;
    const query = { email: email };
    const body = req.body;
    const update = { $push: { dailyList: body } };
    await req.db.collection("CalendarRecord").updateOne(query, update);
    res.status(201).json({ success: true, data: "success" });
  } catch (error) {
    res.status(400).json({ success: false, data: error });
  }
});

handler.delete(async (req, res) => {
  try {
    const session = await getSession({ req });
    const email = session.user.email;
    const body = req.body;
    const createdAt = body.createdAt;
    await req.db
      .collection("CalendarRecord")
      .updateOne(
        { email: email },
        { $pull: { dailyList: { createdAt: createdAt } } }
      );

    res.status(200).json({ success: true, data: "success" });
  } catch (error) {
    res.status(400).json({ success: false, data: error });
  }
});

handler.put(async (req, res) => {
  try {
    const session = await getSession({ req });
    const email = session.user.email;
    const body = req.body;
    const createdAt = body.createdAt;
    const done = body.done;
    await req.db
      .collection("CalendarRecord")
      .updateOne(
        { email: email, "dailyList.createdAt": createdAt },
        { $set: { "dailyList.$.done": done } }
      );

    res.status(200).json({ success: true, data: "success" });
  } catch (error) {
    res.status(400).json({ success: false, data: error });
  }
});

export default handler;
