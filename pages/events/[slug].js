import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import Link from 'next/link';
import router, { useRouter } from 'next/router';
import Image from 'next/image';
import Layout from '@/components/Layout';
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css';
import { toast, ToastContainer } from 'react-toastify';

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/events`);

  const events = await res.json();

  const paths = events.map((evt) => ({ params: { slug: evt.slug } }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const evt = await res.json();

  return {
    props: { evt: evt[0] },
    revalidate: 1,
  };
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const evt = await res.json();

//   return {
//     props: { evt: evt[0] },
//   };
// }

export default function SlugPage({ evt }) {
  const deleteEvent = async () => {
    if (confirm('Are You Sure?')) {
      const res = await fetch(`${API_URL}/events/${evt.id}`, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push('/events');
      }
    }
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>

        <span>
          {evt.date.slice(0, 10)} at {evt.time}
        </span>

        <h1>{evt.name}</h1>
        <ToastContainer />

        {evt.image && (
          <div className={styles.image}>
            <Image
              src={evt.image.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.performers}</p>
        <h3>Description:</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.vennue}</h3>
        <p>{evt.address}</p>

        <Link href="/events">
          <a className={styles.back}>{'<'}Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}
