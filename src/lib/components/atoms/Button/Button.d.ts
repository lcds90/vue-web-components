// MyButton.d.ts
import { DefineComponent } from 'vue';

// Defina as propriedades (props) que seu componente espera
interface Props {
  label: string;
}

// Defina os eventos que seu componente pode emitir
interface Emits {
  (event: 'clicked', payload: { data: string }): void;
}

// Defina os slots que seu componente oferece
interface Slots {
  default: void;
  icon: { name: string };
}

// Utilize DefineComponent para criar o tipo do seu componente
export type MyButtonComponent = DefineComponent<Props, Emits, Slots>;

// Pode exportar o tipo se você planeja usar 'ref' ou outras operações que exijam tipagem
export type MyButtonInstance = InstanceType<MyButtonComponent>;
