
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { Home } from './pages/Home';
import { Vizzy } from './pages/Vizzy';
import { Progress } from './pages/Progress';
import { Classes } from './pages/Classes';
import { Classroom } from './pages/Classroom';
import { Creative } from './pages/Creative';
import { Admin } from './pages/Admin';
import { GroupSession } from './pages/GroupSession';
import { Journal } from './pages/Journal';
import { Evaluation } from './pages/Evaluation';
import { BusinessDashboard } from './pages/BusinessDashboard';
import { Curriculum } from './pages/Curriculum';
import { Collections } from './pages/Collections';
import { ToolLibrary } from './pages/ToolLibrary';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Home />} />
          <Route path="vizzy" element={<Vizzy />} />
          <Route path="learn" element={<div style={{padding: '2rem'}}>Learn Component Here</div>} />
          <Route path="classes" element={<Classes />} />
          <Route path="classroom" element={<Classroom />} />
          <Route path="progress" element={<Progress />} />
          <Route path="creative" element={<Creative />} />
          <Route path="collections" element={<Collections />} />
          <Route path="group" element={<GroupSession />} />
          <Route path="journal" element={<Journal />} />
          <Route path="curriculum" element={<Curriculum />} />
          <Route path="evaluation" element={<Evaluation />} />
          <Route path="business" element={<BusinessDashboard />} />
          <Route path="tools" element={<ToolLibrary />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
