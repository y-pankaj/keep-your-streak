import { getSession } from "next-auth/client";
import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const session = await getSession({ req });
  const email = session.user.email;
  try {
    const todoList = await req.db
      .collection("CalendarRecord")
      .findOne({ email: email }, { projection: { todoList: 1, _id: 0 } });

    res.status(200).json({ success: true, data: todoList });
  } catch (error) {
    res.status(400).json({ success: false, data: error });
  }
});

handler.post(async (req, res) => {
  const session = await getSession({ req });
  const email = session.user.email;
  const query = { email: email };
  const todo = req.body;
  try {
    const update = { $push: { todoList: todo } };
    const { result } = await req.db
      .collection("CalendarRecord")
      .updateOne(query, update);

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, data: error });
  }
});

handler.delete(async (req, res) => {
  const session = await getSession({ req });
  const email = session.user.email;
  const body = req.body;
  const createdAt = JSON.parse(body).createdAt;
  try {
    const todoList = await req.db
      .collection("CalendarRecord")
      .update(
        { email: email },
        { $pull: { todoList: { createdAt: createdAt } } }
      );

    res.status(200).json({ success: true, data: todoList });
  } catch (error) {
    res.status(400).json({ success: false, data: error });
  }
});

export default handler;
