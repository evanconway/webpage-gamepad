import CrudeStickDisplay from './components/CrudeStickDisplay';
import Mapper from './components/Mapper';
import Input from './components/Input';
import History from './components/History';
import Moves from './components/Moves';
import TargetMove from './components/TargetMove';

const App = () => (
	<div>
		<Input/>
		<Mapper/>
		<CrudeStickDisplay/>
		<History/>
		<TargetMove/>
	</div>
);

export default App;
