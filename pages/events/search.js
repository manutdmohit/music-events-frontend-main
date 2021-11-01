import qs from 'qs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });

  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();

  return {
    props: { events },
  };
}

export default function SearchPage({ events }) {
  const router = useRouter();

  return (
    <Layout title="Search Results">
      <Link href="/events">Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>

      {events.length === 0 && (
        <h3>The event you are searching could not be found.</h3>
      )}

      {events.map((evt) => (
        <>
          <EventItem key={evt.id} evt={evt} />
        </>
      ))}
    </Layout>
  );
}
