import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';
import { parseCookies } from '@/helpers/index';
import Layout from '@/components/Layout';
import DashBoardEvent from '@/components/DashBoardEvent';
import { API_URL } from '@/config/index';
import { NEXT_URL } from '@/config/index';
import styles from '@/styles/Dashboard.module.css';
import AuthContext from '@/context/AuthContext';
import { useRouter } from 'next/router';

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const events = await res.json();

  return {
    props: {
      events,
      token,
    },
  };
}

export default function DashboardPage({ events, token }) {
  const { user } = useContext(AuthContext);

  const router = useRouter();

  const deleteEvent = async (id) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <ToastContainer />
        {user && <h3>Events For {user.username}</h3>}
        {events.map((evt) => (
          <DashBoardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
}
