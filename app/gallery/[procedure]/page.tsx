import { GetServerSideProps } from 'next'
import client from '../../../sanity/lib/client'
import { casesByProcedureQuery, allProceduresQuery } from '../../../sanity/lib/queries'
import Gallery from '../../../components/Gallery'

const Procedure = ({ cases }: any) => {
  return (
    <div>
      <h1 className="text-4xl mb-8">Cases</h1>
      <Gallery items={cases} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const cases = await client.fetch(casesByProcedureQuery, { procedureId: params?.procedure })
  return { props: { cases } }
}

export default Procedure
