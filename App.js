import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/paginas/WelcomeScreen';
import ListarManutencao from './src/paginas/ListarManutencao';
import IncluirManutencao from './src/paginas/IncluirManutencao';
import AlterarManutencao from './src/paginas/AlterarManutencao';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ListarManutencao"
          component={ListarManutencao}
          options={{ title: "Manutenções", headerTintColor: "#007bff" }}
        />
        <Stack.Screen
          name="IncluirManutencao"
          component={IncluirManutencao}
          options={{ title: "Nova Manutenção", headerTintColor: "#007bff" }}
        />
        <Stack.Screen
          name="AlterarManutencao"
          component={AlterarManutencao}
          options={{ title: "Editar Manutenção", headerTintColor: "#007bff" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
