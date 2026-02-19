async function check() {
  const urls = [
    "http://127.0.0.1:3000/api/ping",
    "http://127.0.0.1:3000/Hanz-Portofolio/api/ping",
  ];

  for (const url of urls) {
    try {
      console.log(`Checking ${url}...`);
      const res = await fetch(url);
      const text = await res.text();
      console.log(`Response from ${url} (Status ${res.status}):`, text);
    } catch (e) {
      console.log(`Failed ${url}: ${e.message}`);
    }
  }
}

check();
