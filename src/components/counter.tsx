import { useEffect, useState } from 'react';

interface GazaData {
  gaza: {
    reports: number;
    last_update: string;
    massacres: number;
    killed: {
      total: number;
      children: number;
      women: number;
      civil_defence: number;
      press: number;
      medical: number;
    };
    injured: {
      total: number;
    };
  };
  west_bank: {
    reports: number;
    last_update: string;
    settler_attacks: number;
    killed: {
      total: number;
      children: number;
    };
    injured: {
      total: number;
      children: number;
    };
  };
  known_killed_in_gaza: {
    records: number;
    male: {
      adult: number;
      senior: number;
      child: number;
    };
    female: {
      adult: number;
      senior: number;
      child: number;
    };
  };
  known_press_killed_in_gaza: {
    records: number;
  };
}

function Counter() {
  const [data, setData] = useState<GazaData | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await fetch('https://data.techforpalestine.org/api/v3/summary.json', {
          cache: 'no-store',
          signal: controller.signal,
        });
        const json = (await res.json()) as GazaData;
        setData(json);
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.name !== 'AbortError') console.error(err);
        } else {
          console.error(err);
        }
      }
    };

    fetchData(); // initial load

    const REFRESH_MS = 60 * 60 * 1000; // 1 hour
    const id = setInterval(fetchData, REFRESH_MS);

    return () => {
      clearInterval(id);
      controller.abort();
    };
  }, []);

  if (!data) {
    return <p className="text-center text-lg opacity-80">Loading...</p>;
  }

  return (
    <>
      {/* Large centered total */}
      <div className="text-center">
        <h2 className="text-6xl sm:text-7xl md:text-8xl font-semibold tracking-tight">
          {data.gaza.killed.total.toLocaleString()}
        </h2>
        <h1 className="mt-2 text-xl sm:text-2xl md:text-3xl opacity-90">
          people have been killed by israel since October 7, 2023
        </h1>
      </div>

      {/* Left-aligned details with left padding */}
      <div className="mt-12 pl-6 md:pl-10">
        <ul className="space-y-1 text-lg sm:text-xl md:text-2xl">
          <li>
            <h3>{data.gaza.killed.children.toLocaleString()} Children</h3>
          </li>
          <li>
            <h3>{data.gaza.killed.women.toLocaleString()} Women</h3>
          </li>
          <li>
            <h3>{data.gaza.killed.press.toLocaleString()} Journalists</h3>
          </li>
          <li>
            <h3>{data.gaza.killed.medical.toLocaleString()} Medical Personnel</h3>
          </li>
        </ul>
        <h2 className="mt-3 text-xl sm:text-2xl md:text-3xl">have died in Gaza</h2>
      </div>
    </>
  );
}

export default Counter;
