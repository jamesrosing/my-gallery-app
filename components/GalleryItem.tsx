import { FC } from 'react'

interface GalleryItemProps {
  item: any
}

const GalleryItem: FC<GalleryItemProps> = ({ item }) => {
  return (
    <div className="relative">
      {item.media.map((media: any, index: number) => (
        <div key={index}>
          {media._type === 'image' ? (
            <img src={media.url} alt={item.title} className="object-cover w-full h-64" loading="lazy" />
          ) : (
            <video controls className="w-full h-64">
              <source src={media.url} type={media.mimeType} />
            </video>
          )}
        </div>
      ))}
    </div>
  )
}

export default GalleryItem
