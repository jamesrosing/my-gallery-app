import { GetServerSideProps } from 'next'
import client from '../../../../sanity/lib/client'
import { casesByProcedureQuery } from '../../../../sanity/lib/queries'
import GalleryItem from '../../../../components/GalleryItem'

const Case = ({ caseItem }: any) => {
  return (
    <div>
      <h1 className="text-4xl mb-8">{caseItem.title}</h1>
      <GalleryItem item={caseItem} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const caseItem = await client.fetch(casesByProcedureQuery, { procedureId: params?.procedure }).then((cases: any[]) =>
    cases.find((c) => c._id === params?.case)
  )
  return { props: { caseItem } }
}

export default Case
