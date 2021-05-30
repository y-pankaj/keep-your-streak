import { getSession } from "next-auth/client";
import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();

handler.use(middleware);

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
