import React from 'react'
import ContentLoader, { Rect } from 'react-content-loader/native'

export function SkeletonPost() {
  return (
    <ContentLoader
      speed={2}
      width={380}
      height={800}
      backgroundColor="#cccccc"
      foregroundColor="#ebebeb"
    >
      {Array.from({ length: 2 }, (_, i) => (
        <React.Fragment key={`rect-header-${i}`}>
          <Rect x="5" y={i * 450 + 15} rx="3" ry="3" width="300" height="22" />
          {Array.from({ length: 20 }, (_, ii) => {
            const randomWidth =
              300 + Math.floor(Math.random() * ((350 - 300) / 5 + 1)) * 5
            return (
              <Rect
                key={`rect-${i}-${ii}`}
                x="5"
                y={i * 450 + (ii * 20 + 50)}
                rx="3"
                ry="3"
                width={randomWidth}
                height="14"
              />
            )
          })}
        </React.Fragment>
      ))}
    </ContentLoader>
  )
}
