import { FC } from 'react'
import GalleryItem from './GalleryItem'

interface GalleryProps {
  items: any[]
}

const Gallery: FC<GalleryProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item) => (
        <GalleryItem key={item._id} item={item} />
      ))}
    </div>
  )
}

export default Gallery
