import { getSession } from "next-auth/client";
import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  try {
    const session = await getSession({ req });
    const email = session.user.email;
    const lists = await req.db
      .collection("CalendarRecord")
      .findOne({ email: email }, { projection: { lists: 1, _id: 0 } });

    if (lists === null) {
      const result = await req.db
        .collection("CalendarRecord")
        .insertOne({
          email: session.user.email,
          lists: [],
          timer: [],
          dailyList: [],
        });

      res.status(200).json({ success: true, data: result.ops[0] });
    } else {
      res.status(200).json({ success: true, data: lists });
    }
  } catch (error) {
    res.status(400).json({ success: false, data: JSON.stringify(error) });
  }
});

handler.post(async (req, res) => {
  try {
    const session = await getSession({ req });
    const email = session.user.email;
    const query = { email: email };
    const body = req.body;
    const update = { $push: { lists: body } };
    await req.db.collection("CalendarRecord").updateOne(query, update);

    res.status(201).json({ success: true, data: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, data: error });
  }
});

handler.delete(async (req, res) => {
  try {
    const session = await getSession({ req });
    const email = session.user.email;
    const body = req.body;
    const listId = body.listId;
    await req.db
      .collection("CalendarRecord")
      .updateOne({ email: email }, { $pull: { lists: { id: listId } } });
    res.status(201).json({ success: true, data: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, data: error });
  }
});

export default handler;
