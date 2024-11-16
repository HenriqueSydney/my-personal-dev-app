import ContentLoader, { Circle } from 'react-content-loader/native'
import { useWindowDimensions } from 'react-native'

export function Skeleton() {
  const { width } = useWindowDimensions()

  return (
    <ContentLoader backgroundColor="#333" foregroundColor="#999">
      <Circle cx={width / 2} cy="110" r="100" />
    </ContentLoader>
  )
}
