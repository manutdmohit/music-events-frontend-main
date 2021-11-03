import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import Pagination from '@/components/Pagination';
import { API_URL } from '@/config/index';

const PER_PAGE = 2;

// export async function getServerSideProps() {
//   const res = await fetch(`${API_URL}/api/events`);
//   const events = await res.json();

//   return {
//     props: { events },
//   };
// }

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  // Fetch total/count

  const totalRes = await fetch(`${API_URL}/events/count`);
  const total = await totalRes.json();

  // Fetch events
  const eventRes = await fetch(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  const events = await eventRes.json();

  return {
    props: { events, page: +page, total },
  };
}

export default function EventsPage({ events, page, total }) {
  const lastPage = Math.ceil(total / PER_PAGE);

  return (
    <Layout>
      <h1>Events</h1>

      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Pagination page={page} lastPage={lastPage} />
    </Layout>
  );
}
