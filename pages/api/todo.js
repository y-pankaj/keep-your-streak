import { getSession } from "next-auth/client";
import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const { method } = req;
  const session = await getSession({ req });
  const email = session.user.email;

  switch (method) {
    case "GET":
      try {
        const todoList = await req.db
          .collection("CalendarRecord")
          .findOne({ email: email })
          .profile({ todoList: 1 });

        res.status(200).json({ success: true, data: todoList });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
    case "POST":
      try {
        const update = { $push: { dates: "This is a date" } };
        let { result } = await req.db
          .collection("CalendarRecord")
          .update(query, update);

        if (!result.nModified) {
          let toInsert = { email: email, dates: ["random"] };
          result = await req.db.collection("CalendarRecord").insert(toInsert);
        }
        res.status(201).json({ success: true, data: result });
      } catch (error) {
        res.status(400).json({ success: false, data: error });
      }
      break;
    default:
      res.status(400).json({ success: false, data: error });
  }
});

export default handler;

/* 
TODO
Error handling
*/
