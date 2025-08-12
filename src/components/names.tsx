import { useEffect, useState } from 'react';

const NAMES_URL =
  'https://data.techforpalestine.org/api/v2/killed-in-gaza/child-name-counts-en.json';

type NameCount = [name: string, count: number];

interface NamesData {
  boys: NameCount[];
  girls: NameCount[];
}

function ChildrenNames() {
  const [data, setData] = useState<NamesData | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchNames = async () => {
      try {
        const res = await fetch(NAMES_URL, { cache: 'no-store', signal: controller.signal });
        const json = (await res.json()) as NamesData;
        setData(json);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== 'AbortError') console.error(err);
      }
    };

    fetchNames(); // initial load

    const REFRESH_MS = 60 * 60 * 1000; // 1 hour
    const id = setInterval(fetchNames, REFRESH_MS);

    return () => {
      clearInterval(id);
      controller.abort();
    };
  }, []);

  if (!data) {
    return <p className="text-lg opacity-80">Loading...</p>;
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl">Children killed by name...</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Boys */}
        <div>
          <h3 className="text-xl sm:text-2xl md:text-3xl mb-2">Boys</h3>
          <ul className="space-y-1 text-lg sm:text-xl md:text-2xl">
            {data.boys.map(([name, count]) => (
              <li key={`boy-${name}`} className="opacity-95">
                "{name}" {count.toLocaleString()} killed
              </li>
            ))}
          </ul>
        </div>

        {/* Girls */}
        <div>
          <h3 className="text-xl sm:text-2xl md:text-3xl mb-2">Girls</h3>
          <ul className="space-y-1 text-lg sm:text-xl md:text-2xl">
            {data.girls.map(([name, count]) => (
              <li key={`girl-${name}`} className="opacity-95">
                "{name}" {count.toLocaleString()} killed
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ChildrenNames;
