import CrudeStickDisplay from './components/CrudeStickDisplay';
import Mapper from './components/Mapper';
import History from './components/History';
import TargetMove from './components/TargetMove';
import Input from './components/Input';

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
