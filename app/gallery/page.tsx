import { GetServerSideProps } from 'next'
import client from '../../sanity/lib/client'
import { allProceduresQuery } from '../../sanity/lib/queries'
import Link from 'next/link'

const Home = ({ procedures }: any) => {
  return (
    <div>
      <h1 className="text-4xl mb-8">Procedures</h1>
      <div className="grid grid-cols-3 gap-4">
        {procedures.map((procedure: any) => (
          <Link key={procedure._id} href={`/gallery/${procedure._id}`}>
            <a className="block p-4 border rounded-lg">{procedure.title}</a>
          </Link>
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const procedures = await client.fetch(allProceduresQuery)
  return { props: { procedures } }
}

export default Home
