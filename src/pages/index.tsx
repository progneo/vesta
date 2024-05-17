import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Clients() {
  const router = useRouter();

  useEffect(() => {
    router.push('/calendar');
  }, []);

  return null;
}