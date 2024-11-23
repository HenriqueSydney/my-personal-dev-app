# 📱 Portfólio Dev Pessoal com React Native e Expo

Bem-vindo ao repositório do **Portfólio Dev Pessoal**, um aplicativo desenvolvido com **React Native** e **Expo** para dispositivos móveis. Este projeto visa centralizar informações do desenvolvedor, como portfólio, currículo, blog e funcionalidades personalizadas de gerenciamento de perfil.

---

## 🎯 Escopo do Projeto

O objetivo principal do aplicativo é ser uma vitrine profissional, oferecendo:  
- Exposição de informações relevantes do desenvolvedor (perfil e currículo).  
- Um blog para compartilhar conhecimento e experiências de desenvolvimento.  
- Funcionalidades personalizadas para o gerenciamento de usuários.

---

## 🚀 Features Implementadas

### 🌟 Páginas
- **Página Inicial**
  - Exibe as principais informações do portfólio, como nome, título e links para redes sociais.
  
- **Blog**
  - Listagem de posts integrados com a API **Prismic IO**.
  
- **Currículo**
  - Página dedicada para exibir o currículo completo.

- **Profile**
  - Gerenciamento completo do perfil do usuário:
    - Edição de informações.
    - Alteração de senha.
    - Exclusão de perfil.
    - Logout.

### 📲 Funcionalidades Mobile
- **Gestão de Usuários**
  - Dados armazenados localmente usando **SQLite** (implementação conceitual para fins de backlog futuro).
  
- **Acesso à Câmera**
  - Permite ao usuário tirar uma foto para compor o perfil.
  
- **Acesso às Fotos**
  - O usuário pode selecionar imagens da galeria para incluir no perfil.
  
- **Notificações**
  - Sistema de notificações integrado para engajamento do usuário.

- **Suporte a Dark e Light mode**

- **Internacionalização (pt-BR e en-US)**
  - Internacionalização das mensagens, labels e titles;
  - **Backlog:** Mensagens de validação de entrada de texto.

### 🌐 Integrações de API
- **GitHub API**
  - Para acessar informações de repositórios e projetos.
  
- **Prismic IO**
  - CMS para gerenciar e exibir os posts do blog.

---

## 📝 Backlogs

### 📌 Funcionalidades Futuras
1. **Aplicação Web**
   - Desenvolvimento de uma aplicação web com **Next.js** e **Node.js** para sincronização com a versão mobile.

2. **Gestão de Usuários pelo Backend**
   - A gestão de usuários será migrada para um sistema backend dedicado.

3. **Autenticação via Providers**
   - Integração com serviços de autenticação como:
     - Google
     - Azure
     - GitHub
     - GitLab

4. **Links para Redes Sociais**
   - Adicionar links clicáveis para plataformas como LinkedIn, Twitter, WhatsUp e GitHub.

5. **Migração dos dados do currículo para o Prismic**
   - Migração das informações dispostas no currículo para o gerenciamento via CMS Prismic IO.

5. **Criação de rota para certificados e certificações**
   - Criação de rotas/screens para exibição de certificados e certificações.

6. **Testes**
   - Ampliação de testes unitários e criação de testes e2e.

7. **Pipeline CI/CD**
   - Criação de uma Pipeline CI/CD para execução de testes, verificações de segurança, build para distribuição em loja Android e publicação do APP.

---

## 🛠️ Tecnologias Utilizadas

- **React Native**  
- **Expo**  
- **SQLite**  
- **Prismic IO SDK**  

---

## 🧩 Instalação e Execução

1. **Clone este repositório:**
   ```bash
   git clone https://github.com/HenriqueSydney/my-personal-dev-app.git
   ```

2. **Navegue até o diretório do projeto:**
   ```bash
   cd portfolio-dev-pessoal
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Inicie o servidor Expo:**

   ```bash
   npx expo start
   ```

**Caso queira Buildar a aplicação, no formato APK, execute:**

   ```bash
   eas build -p android --profile preview --local
   ```
**Mais informações sobre build leia a documentação do Expo:** https://docs.expo.dev/build/introduction/