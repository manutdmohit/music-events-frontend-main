import { useContext, useEffect, useState } from 'react';
import { parseCookies } from '@/helpers/index';
import Layout from '@/components/Layout';
import DashBoardEvent from '@/components/DashBoardEvent';
import { API_URL } from '@/config/index';
import { NEXT_URL } from '@/config/index';
import styles from '@/styles/Dashboard.module.css';
import AuthContext from '@/context/AuthContext';

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();
  console.log(events);

  return {
    props: {
      events,
    },
  };
}

export default function DashboardPage({ events }) {
  const { user } = useContext(AuthContext);

  const deleteEvent = (id) => {
    console.log(id);
  };

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        {user && <h3>Events For {user.username}</h3>}
        {events.map((evt) => (
          <DashBoardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
}
