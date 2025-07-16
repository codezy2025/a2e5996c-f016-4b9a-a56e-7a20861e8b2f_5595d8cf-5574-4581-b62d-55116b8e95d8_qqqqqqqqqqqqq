import './App.css';

const theme = {
  background: '#FFF7ED',
  text: '#9A3412',
  primary: '#EA580C',
  secondary: '#FED7AA'
};

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: theme.background,
      color: theme.text,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>

      <h1>Welcome to AI analytics</h1>
      <p>Experience the simplicity of a modern web platform with smart features tailored for you.</p>

      <div style={{
        display: 'flex',
        gap: '1.5rem',
        marginTop: '2rem',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '1rem',
          borderRadius: '10px',
          width: '250px',
          textAlign: 'center',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
        }}>
          <h3>Feature One</h3>
          <p>Smart AI recommendations for your workflow.</p>
        </div>

        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '1rem',
          borderRadius: '10px',
          width: '250px',
          textAlign: 'center',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
        }}>
          <h3>Feature Two</h3>
          <p>Real-time analytics and user engagement insights.</p>
        </div>

        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '1rem',
          borderRadius: '10px',
          width: '250px',
          textAlign: 'center',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
        }}>
          <h3>Feature Three</h3>
          <p>Customizable user preferences and theming.</p>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button style={{
          backgroundColor: theme.primary,
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          marginRight: '10px'
        }}>Get Started</button>

        <button style={{
          backgroundColor: theme.secondary,
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px'
        }}>Learn More</button>
      </div>

    </div>
  );
}

export default App;
