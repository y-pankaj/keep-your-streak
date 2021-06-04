import { getSession } from "next-auth/client";
import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  try {
    const session = await getSession({ req });
    const email = session.user.email;
    const body = req.body;
    const listId = body.listId;
    const query = { email: email, "lists.id": listId };
    const task = {
      task: body.task,
      createdAt: body.createdAt,
      done: body.done,
    };
    const update = { $push: { "lists.$.tasks": task } };
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
    const createdAt = body.createdAt;
    const listId = body.listId;
    await req.db
      .collection("CalendarRecord")
      .updateOne(
        { email: email },
        { $pull: { "lists.$[list].tasks": { createdAt: createdAt } } },
        { arrayFilters: [{ "list.id": listId }] }
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
    const listId = body.listId;
    const done = body.done;
    await req.db.collection("CalendarRecord").updateOne(
      { email: email },
      { $set: { "lists.$[list].tasks.$[task].done": done } },
      {
        arrayFilters: [{ "list.id": listId }, { "task.createdAt": createdAt }],
      }
    );

    res.status(200).json({ success: true, data: "success" });
  } catch (error) {
    res.status(400).json({ success: false, data: error });
  }
});

export default handler;
