import { Avatar } from 'react-native-paper'
import { AvatarImageSource } from 'react-native-paper/lib/typescript/components/Avatar/AvatarImage'

type Props = {
  image: AvatarImageSource
  size?: number
}

export function UserPhoto({ image, size = 180 }: Props) {
  return <Avatar.Image source={image} size={size} />
}
