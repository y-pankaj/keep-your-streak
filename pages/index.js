import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import CalendarDate from '../components/calendar-date'
import { signIn, signOut } from 'next-auth/client'

export default function Home() {
  return (
    <div>
      <CalendarDate date="3"></CalendarDate>
      <button onClick={() => signIn('google')}>Sign in</button>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  )
}
