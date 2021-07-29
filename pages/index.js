import Link from 'next/Link';

function Page({ data }) {
  return <div>Api Messages: {data}</div>
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3001/api`)
  const data = await res.json()

  // Pass data to the page via props
  return { props: { data } }
}


export default Page