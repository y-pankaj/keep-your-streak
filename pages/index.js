import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import CalendarDate from '../components/calendar-date'

export default function Home() {
  return (
    <div>
      <CalendarDate date="3"></CalendarDate>
    </div>
  )
}
