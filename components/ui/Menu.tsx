import * as React from 'react'
import { View } from 'react-native'
import { Menu as PaperMenu } from 'react-native-paper'

type MenuItens = {
  onPressFn: () => void
  title: string
  icon?: string
}

type Props = {
  anchor: React.ReactNode
  isVisible: boolean
  toggleVisibility: React.Dispatch<React.SetStateAction<boolean>>
  menuItens: MenuItens[]
}

const Menu = ({ anchor, isVisible, toggleVisibility, menuItens }: Props) => {
  return (
    <View
      style={{
        paddingTop: 50,
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <PaperMenu
        visible={isVisible}
        onDismiss={() => toggleVisibility(false)}
        anchorPosition="bottom"
        anchor={anchor}
      >
        {menuItens.map((item) => (
          <PaperMenu.Item
            key={item.title}
            onPress={item.onPressFn}
            title={item.title}
            leadingIcon={item.icon}
          />
        ))}
      </PaperMenu>
    </View>
  )
}

export default Menu
