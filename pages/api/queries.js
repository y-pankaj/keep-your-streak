import { getSession } from 'next-auth/client'
import nextConnect from 'next-connect';
import middleware from '../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
  const session = await getSession({ req });
  const email = session.user.email;
  const query = { email: email };
  const update = { $push: { dates: "This is a date" } }
  let result = await req.db.collection('CalendarRecord')
                          .update( query, update )
  
  if(!result.nModified){
    let toInsert = { email: email, dates: ["random"]}
    let result = await req.db.collection('CalendarRecord')
                                  .insert( toInsert )
  }
  res.json({ "message": "ok"});
});

export default handler;