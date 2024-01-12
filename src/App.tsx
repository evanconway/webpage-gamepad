import CrudeStickDisplay from './components/CrudeStickDisplay';
import Mapper from './components/Mapper';
import Input from './components/Input';
import History from './components/History';
import Moves from './components/Moves';

const App = () => (
	<div>
		<Input/>
		<Mapper/>
		<CrudeStickDisplay/>
		<History/>
		<Moves/>
	</div>
);

export default App;
