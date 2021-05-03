import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import CalendarDate from '../components/calendar-date'
import Calendar from '../components/calendar'
import { signIn, signOut, useSession } from 'next-auth/client'

export default function Home() {

  const [session, loading] = useSession();

  if (loading) return <div>loading...</div>;

  
  var rend = '<div>This is somethings</div>'
  return (
    <div>
      <div className="table w-full">
        <div className="table-row-group">
          <Calendar/>
        </div>
      </div>
      
      
      {!session && (
        <>
          <button onClick={() => signIn('google')}>Sign in</button>
        </>
      )}

      {session && (
        <>
          <img src={session.user.image} className="avatar" />
          <h1>{session.user.name}</h1>
          {JSON.stringify(session)}
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}
      
      
    </div>
  )
}
