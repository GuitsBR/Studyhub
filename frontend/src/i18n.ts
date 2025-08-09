import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      appName: 'StudyHub',
      subjects: {
        physics: 'Physics',
        math: 'Mathematics',
        chemistry: 'Chemistry',
        portuguese: 'Portuguese'
      },
      sections: {
        textbook: 'Textbook',
        flashcards: 'Flashcards',
        quizzes: 'Quizzes',
        stats: 'Statistics',
        settings: 'Settings'
      },
      login: {
        title: 'Login',
        username: 'Username',
        password: 'Password',
        signIn: 'Sign in',
        register: 'Register',
        error: 'Invalid credentials'
      },
      logout: 'Logout'
      ,
      searchPlaceholder: 'Search…'
    }
  },
  'pt-BR': {
    translation: {
      appName: 'StudyHub',
      subjects: {
        physics: 'Física',
        math: 'Matemática',
        chemistry: 'Química',
        portuguese: 'Português'
      },
      sections: {
        textbook: 'Livro',
        flashcards: 'Flashcards',
        quizzes: 'Quizzes',
        stats: 'Estatísticas',
        settings: 'Configurações'
      },
      login: {
        title: 'Entrar',
        username: 'Usuário',
        password: 'Senha',
        signIn: 'Entrar',
        register: 'Registrar',
        error: 'Credenciais inválidas'
      },
      logout: 'Sair'
      ,
      searchPlaceholder: 'Buscar…'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt-BR',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;