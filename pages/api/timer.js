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
    var result = { time: [] };
    await req.db
      .collection("CalendarRecord")
      .aggregate([
        {
          $match: { email: email },
        },
        {
          $project: {
            timer: {
              $filter: {
                input: "$timer",
                as: "item",
                cond: {
                  $and: [
                    {
                      $gte: ["$$item.date", startDate],
                    },
                    {
                      $lt: ["$$item.date", endDate],
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
    const body = JSON.parse(req.body);
    const update = { $push: { timer: body } };
    await req.db.collection("CalendarRecord").updateOne(query, update);

    res.status(201).json({ success: true, data: "success" });
  } catch (error) {
    res.status(400).json({ success: false, data: error });
  }
});

export default handler;
