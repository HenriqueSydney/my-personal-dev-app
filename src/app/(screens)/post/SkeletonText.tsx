import React from 'react'
import ContentLoader, { Rect } from 'react-content-loader/native'

type Props = {
  variant: 'primary' | 'secondary' | 'header'
}

export function SkeletonText({ variant }: Props) {
  return (
    <ContentLoader
      speed={2}
      width={variant === 'primary' ? 150 : 70}
      height={20}
      backgroundColor="#cccccc"
      foregroundColor="#ebebeb"
    >
      <Rect x="0" y="5" rx="3" ry="3" width={70} height="14" />
      {variant && <Rect x="80" y="5" rx="3" ry="3" width={70} height="14" />}
    </ContentLoader>
  )
}
