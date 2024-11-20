// import { fireEvent, render, screen } from '@testing-library/react-native'
// import React from 'react'
// import { PaperProvider } from 'react-native-paper'

// import { Modal } from './Modal' // Caminho correto para o seu componente
// import { Text } from './Text'

// describe('Modal Component', () => {
//   it('should render modal when button is clicked', () => {
//     const buttonLabel = 'Open Modal'
//     const modalTitle = 'Modal Title'
//     const modalContent = <Text>Modal Content</Text>

//     // Renderizando o componente
//     render(
//       <PaperProvider>
//         <Modal
//           buttonLabel={buttonLabel}
//           modalTitle={modalTitle}
//           modalContent={modalContent}
//         />
//       </PaperProvider>,
//     )

//     // Verificando se o botão foi renderizado
//     const button = screen.getByText(buttonLabel)
//     expect(button).toBeTruthy()

//     // Verificando que o modal ainda não está visível (não renderizado inicialmente)
//     const modalTitleElement = screen.queryByText(modalTitle)
//     expect(modalTitleElement).toBeNull() // Modal não deve estar visível ainda

//     // Clicando no botão para abrir o modal
//     fireEvent.press(button)

//     // Verificando se o título do modal e conteúdo estão visíveis
//     const modalTitleVisible = screen.getByText(modalTitle)
//     expect(modalTitleVisible).toBeTruthy()

//     const modalContentVisible = screen.getByText('Modal Content')
//     expect(modalContentVisible).toBeTruthy()
//   })

//   it('should hide modal when dismissed', () => {
//     const buttonLabel = 'Open Modal'
//     const modalTitle = 'Modal Title'
//     const modalContent = <Text>Modal Content</Text>

//     // Renderizando o componente
//     render(
//       <PaperProvider>
//         <Modal
//           buttonLabel={buttonLabel}
//           modalTitle={modalTitle}
//           modalContent={modalContent}
//         />
//       </PaperProvider>,
//     )

//     // Clicando no botão para abrir o modal
//     const button = screen.getByText(buttonLabel)
//     fireEvent.press(button)

//     // Verificando se o modal está visível
//     const modalTitleVisible = screen.getByText(modalTitle)
//     expect(modalTitleVisible).toBeTruthy()

//     // Simulando o fechamento do modal
//     const dismissButton = screen.getByRole('button') // Pode ser ajustado de acordo com o comportamento do modal
//     fireEvent.press(dismissButton)

//     // Verificando se o modal foi fechado e o título não está mais visível
//     const modalTitleClosed = screen.queryByText(modalTitle)
//     expect(modalTitleClosed).toBeNull() // O modal não deve estar visível após ser fechado
//   })
// })
